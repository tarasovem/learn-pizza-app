import styles from './Cart.module.css';
import { useSelector } from 'react-redux';
import Heading from '../../components/Heading/Heading';
import { RootState } from '../../store/store';
import CartItem from '../../components/CartItem/CartItem';
import { useEffect, useState } from 'react';
import { Product } from '../../interfaces/product.interface';
import axios from 'axios';
import { PREFIX } from '../../helpers/API';
import Button from '../../components/Button/Button';

const DELIVERY_FEE = 169;

function Cart() {
	const [cartProducts, setCartProducts] = useState<Product[]>();
	const items = useSelector((s: RootState) => s.cart.items);
	const total = items.reduce((acc, i) => {
		const product = cartProducts?.find(p => p.id === i.id);
		if (!product) {
			return 0;
		}
		return acc + product.price * i.count;
	}, 0);

	const getItem = async (id: number) => {
		const {data} = await axios.get<Product>(`${PREFIX}/products/${id}`);
		return data;
	};

	useEffect(() => {
		Promise.all(items.map(i => getItem(i.id)))
			.then(res => setCartProducts(res));
	}, [items]);

	const renderEmptyCart = () => {
		return <div className={styles.empty}>Ваша корзина пуста</div>;
	};

	const renderCart = () => {
		return (
			<>
				<div className={styles.list}>
					{items.map(i => {
						const product = cartProducts?.find(p => p.id === i.id);
						if (!product) {
							return null;
						}
						return <CartItem key={i.id} count={i.count} {...product} />;
					})}
				</div>
				<div className={styles.promocode}>
					<input className={styles.promocodeInput} type='text' placeholder='Промокод' />
					<button className={styles.promocodeButton} type='button'>Применить</button>
				</div>
				<div className={styles.total}>
					<div className={styles.totalRow}>
						<div className={styles.totalTitle}>Сумма</div>
						<div className={styles.totalPrice}>
							{total}
							<span className={styles.totalPriceCurrency}> ₽</span>
						</div>
					</div>
					<div className={styles.totalRow}>
						<div className={styles.totalTitle}>Доставка</div>
						<div className={styles.totalPrice}>
							{DELIVERY_FEE}
							<span className={styles.totalPriceCurrency}> ₽</span>
						</div>
					</div>
					<div className={styles.totalRow}>
						<div className={styles.totalTitle}>
							Итого
							<span className={styles.totalCount}> ({items.length})</span>
						</div>
						<div className={styles.totalPrice}>
							{total + DELIVERY_FEE}
							<span className={styles.totalPriceCurrency}> ₽</span>
						</div>
					</div>
				</div>
				<Button className={styles.orderButton} appearance='big'>Оформить</Button>
			</>
		);
	};

	return (
		<>
			<Heading>Корзина</Heading>
			{items.length ? renderCart() : renderEmptyCart()}
		</>
	);
}

export default Cart;
