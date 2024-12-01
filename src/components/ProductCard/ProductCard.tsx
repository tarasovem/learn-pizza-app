import { Link } from 'react-router-dom';
import styles from './ProductCard.module.css';
import { ProductCardProps } from './ProductCard.props';
import { MouseEvent } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { cartActions } from '../../store/cart.slice';

function ProductCard(props: ProductCardProps) {
	const dispatch = useDispatch<AppDispatch>();

	const addToCart = (evt: MouseEvent) => {
		evt.preventDefault();
		dispatch(cartActions.add(props.id));
	};

	return (
		<Link className={styles.link} to={`/product/${props.id}`}>
			<div className={styles.card}>
				<div className={styles.head}>
					<img className={styles.image} src={props.image} alt={props.name} />
					<div className={styles.price}>
						{props.price}
						<span className={styles.currency}>&#8381;</span>
					</div>
					<button className={styles.addToCart} type='button' onClick={addToCart} >Добавить в корзину</button>
					<div className={styles.rating}>
						{props.rating}
					</div>
				</div>
				<div className={styles.body}>
					<div className={styles.title}>{props.name}</div>
					<div className={styles.description}>{props.description}</div>
				</div>
			</div>
		</Link>
	);
}

export default ProductCard;