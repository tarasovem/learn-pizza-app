import { Suspense } from 'react';
import { useDispatch } from 'react-redux';
import { Await, Link, useLoaderData } from 'react-router-dom';
import Heading from '../../components/Heading/Heading';
import type { Product } from '../../interfaces/product.interface';
import { cartActions } from '../../store/cart.slice';
import { AppDispatch } from '../../store/store';
import styles from './Product.module.css';

function Product() {
	const data = useLoaderData() as { data: Product };
	const dispatch = useDispatch<AppDispatch>();

	return <>
		<Suspense fallback={'Загружаю...'}>
			<Await resolve={data.data}>
				{({ data }: { data: Product }) => (
					<>
						<div className={styles.header}>
							<Link className={styles.back} to='/' />
							<Heading>{data.name}</Heading>
							<button 
								className={styles.addToBasket} 
								type='button' 
								onClick={() => dispatch(cartActions.increase(data.id))}
							>
								В корзину
							</button>
						</div>
						<div className={styles.content}>
							<div className={styles.image}>
								<img src={data.image} alt={data.name} width={323} height={248} />
							</div>
							<div>
								<div className={styles.price}>
									<div className={styles.priceLabel}>Цена</div>
									<div className={styles.priceValue}>
										{data.price}
										<span className={styles.currency}> ₽</span>
									</div>
								</div>
								<div className={styles.rating}>
									<div className={styles.ratingLabel}>Рейтинг</div>
									<div className={styles.ratingValue}>{data.rating}</div>
								</div>
								<div className={styles.ingredients}>
									<div className={styles.ingredientsLabel}>Состав:</div>
									<ul className={styles.ingredientsList}>
										{data.ingredients.map((ingredient) => (
											<li className={styles.ingredientItem} key={ingredient}>{ingredient}</li>
										))}
									</ul>
								</div>
							</div>
						</div>
					</>
				)}
			</Await>
		</Suspense>
	</>;
}

export default Product;