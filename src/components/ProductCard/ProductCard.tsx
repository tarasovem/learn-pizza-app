import { Link } from 'react-router-dom';
import styles from './ProductCard.module.css';
import { ProductCardProps } from './ProductCard.props';

function ProductCard(props: ProductCardProps) {
	return (
		<Link className={styles.link} to={`/product/${props.id}`}>
			<div className={styles.card}>
				<div className={styles.head}>
					<img className={styles.image} src={props.image} alt={props.title} />
					<div className={styles.price}>
						{props.price}
						<span className={styles.currency}>&#8381;</span>
					</div>
					<button className={styles.addToCart} type='button'>Добавить в корзину</button>
					<div className={styles.rating}>
						{props.rating}
					</div>
				</div>
				<div className={styles.body}>
					<div className={styles.title}>{props.title}</div>
					<div className={styles.description}>{props.description}</div>
				</div>
			</div>
		</Link>
	);
}

export default ProductCard;