import styles from './MenuList.module.css';
import ProductCard from '../../../components/ProductCard/ProductCard';
import { MenuListProps } from './MenuList.props';

export function MenuList({products}: MenuListProps) {
	return (
		<div className={styles.list}>
			{products.map(product => (
				<ProductCard
					key={product.id}
					id={product.id}
					name={product.name}
					description={product.ingredients.join(', ')}
					rating={product.rating}
					price={product.price}
					image={product.image}
				/>
			))}
		</div>
	);
}