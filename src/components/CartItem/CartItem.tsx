import { cartActions } from '../../store/cart.slice';
import styles from './CartItem.module.css';
import { CartItemProps } from './CartItem.props';
import { useDispatch } from 'react-redux';

function CartItem(props: CartItemProps) {
	const dispatch = useDispatch();

	const decreaseCount = () => {
		dispatch(cartActions.decrease(props.id));
	};

	const increaseCount = () => {
		dispatch(cartActions.increase(props.id));
	};

	const removeItem = () => {
		dispatch(cartActions.remove(props.id));
	};

	return (
		<div className={styles.item}>
			<img className={styles.image} src={props.image} alt={props.name} width='82' height='82' />
			<div className={styles.body}>
				<div className={styles.name}>{props.name}</div>
				<div className={styles.price}>
					{props.price} <span className={styles.currency}>&#8381;</span>
				</div>
			</div>
			<div className={styles.actions}>
				<button className={styles.decrease} type='button' onClick={decreaseCount}>
					<svg width="11" height="2" viewBox="0 0 11 2" fill="none" xmlns="http://www.w3.org/2000/svg">
						<line x1="0.899529" y1="0.843689" x2="9.38082" y2="0.843689" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
					</svg>
				</button>
				<div className={styles.count}>{props.count < 10 ? `0${props.count}` : props.count}</div>
				<button className={styles.increase} type='button' onClick={increaseCount}>
					<svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" fill="none">
						<path stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" d="M6.157.9v8.481M1.62 4.844h8.481"/>
					</svg>
				</button>
				<button className={styles.remove} type='button' onClick={removeItem}>
					<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="none">
						<path stroke="currentColor" strokeLinecap="round" d="m4.192 4.193 8.385 8.385M4.193 12.578l8.385-8.385"/>
					</svg>
				</button>
			</div>
		</div>
	);
}

export default CartItem;
