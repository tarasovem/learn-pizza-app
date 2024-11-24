import styles from './Menu.module.css';
import Heading from '../../components/Heading/Heading';
import Search from '../../components/Search/Search';
import ProductCard from '../../components/ProductCard/ProductCard';

function Menu() {
	return (
		<>
			<div className={styles.header}>
				<Heading>Меню</Heading>
				<Search placeholder='Введите блюдо или состав' />
			</div>
			<div className={styles.list}>
				<ProductCard
					id={1}
					title='Наслаждение'
					description='Салями, руккола, помидоры, оливки'
					rating={4.5}
					price={300}
					image='./product-demo.png'
				/>
			</div>
		</>
	);
}

export default Menu;
