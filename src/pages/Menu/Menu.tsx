import styles from './Menu.module.css';
import Heading from '../../components/Heading/Heading';
import Search from '../../components/Search/Search';
import { PREFIX } from '../../helpers/API';
import { Product } from '../../interfaces/product.interface';
import { useEffect, useState, ChangeEvent } from 'react';
import axios, { AxiosError } from 'axios';
import { MenuList } from './MenuList/MenuList';

function Menu() {
	const [products, setProducts] = useState<Product[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | undefined>();
	const [filter, setFilter] = useState<string>();
	
	useEffect(() => {
		getMenu(filter);
	}, [filter]);
	
	const getMenu = async (name?: string) => {
		try {
			setIsLoading(true);
			const {data} = await axios.get<Product[]>(`${PREFIX}/products`, {
				params: {
					name
				}
			});
			setProducts(data);
			setIsLoading(false);
		} catch (e) {
			console.error(e);
			if (e instanceof AxiosError) {
				setError(e.message);
			}
			setIsLoading(false);
			return;
		}
	};
	
	const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
		setFilter(evt.target.value);
	};

	return (
		<>
			<div className={styles.header}>
				<Heading>Меню</Heading>
				<Search placeholder='Введите блюдо или состав' onChange={handleChange} />
			</div>
			<div className={styles.content}>
				{!isLoading && products.length > 0 && <MenuList products={products} />}
				{isLoading && <>Загружаем продукты</>}
				{!isLoading && products.length === 0 && <>Ничего не найдено</>}
				{error && <>{error}</>}
			</div>
		</>
	);
}

export default Menu;
