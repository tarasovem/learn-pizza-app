import styles from './Cart.module.css';
import { useSelector } from 'react-redux';
import Heading from '../../components/Heading/Heading';
import { RootState } from '../../store/store';
import CartItem from '../../components/CartItem/CartItem';
import { useEffect, useState } from 'react';
import { Product } from '../../interfaces/product.interface';
import axios from 'axios';
import { PREFIX } from '../../helpers/API';

function Cart() {
	const [cartProducts, setCartProducts] = useState<Product[]>();
	const items = useSelector((s: RootState) => s.cart.items);

	const getItem = async (id: number) => {
		const {data} = await axios.get<Product>(`${PREFIX}/products/${id}`);
		return data;
	};

	useEffect(() => {
		Promise.all(items.map(i => getItem(i.id)))
			.then(res => setCartProducts(res));
	}, [items]);

	return (
		<>
			<Heading>Корзина</Heading>
			<div className={styles.content}>
				{items.map(i => {
					const product = cartProducts?.find(p => p.id === i.id);
					if (!product) {
						return null;
					}
					return <CartItem key={i.id} count={i.count} {...product} />;
				})}
			</div>
		</>
	);
}

export default Cart;
