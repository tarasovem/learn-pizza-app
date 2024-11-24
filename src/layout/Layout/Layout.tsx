import { NavLink, Outlet } from 'react-router-dom';
import styles from './Layout.module.css';
import Button from '../../components/Button/Button';
import cn from 'classnames';

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
					<NavLink to="/" className={({isActive}) => cn(styles.link, {
						[styles.active]: isActive
					})}>
						<img className={styles.linkIcon} src="/menu-icon.svg" alt="Иконка меню" />
						Меню
					</NavLink>
					<NavLink to="/cart" className={({isActive}) =>cn(styles.link, {
						[styles.active]: isActive
					})}>
						<img className={styles.linkIcon} src="/cart-icon.svg" alt="Иконка корзины" />
						Корзина
					</NavLink>
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
