import { Link, Outlet } from 'react-router-dom';
import styles from './Layout.module.css';
import Button from '../../components/Button/Button';

function Layout() {
	return (
		<div className={styles.layout}>
			<div className={styles.sidebar}>
				<div className={styles.user}>
					<img className={styles.avatar} src="/avatar.jpg" alt="Аватар пользователя" />
					<div className={styles.name}>Вася Пупкин</div>
					<a className={styles.email} href="mailto:pupkin@vasya.ru">pupkin@vasya.ru</a>
				</div>
				<div className={styles.menu}>
					<Link to="/" className={styles.link}>
						<img className={styles.linkIcon} src="/menu-icon.svg" alt="Иконка меню" />
						Меню
					</Link>
					<Link to="/cart" className={styles.link}>
						<img className={styles.linkIcon} src="/cart-icon.svg" alt="Иконка корзины" />
						Корзина
					</Link>
				</div>
				<Button className={styles.exit} appearance='exit'>
					<img src="/exit-icon.svg" alt="Иконка выхода" />
					Выйти
				</Button>
			</div>
			<div>
				<Outlet />
			</div>
		</div>
	);
}

export default Layout;
