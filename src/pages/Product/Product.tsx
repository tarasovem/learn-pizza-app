import { useState, useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import type { Product } from '../../interfaces/product.interface';

function Product() {
	const [isLoading, setIsLoading] = useState(true);
	const data = useLoaderData() as Product;

	useEffect(() => {
		// Имитируем задержку
		const timer = setTimeout(() => {
			setIsLoading(false);
		}, 2000);

		return () => clearTimeout(timer);
	}, []);

	if (isLoading) {
		return <div>Загрузка...</div>;
	}

	return (
		<div>Product - {data.name}</div>
	);
}

export default Product;