import { Link, Outlet } from 'react-router-dom';

function Layout() {
	return (
		<>
			<div>
				<Link to="/">Меню</Link>
				<Link to="/cart">Корзина</Link>
			</div>
			<div>
				<Outlet />
			</div>
		</>
	);
}

export default Layout;
