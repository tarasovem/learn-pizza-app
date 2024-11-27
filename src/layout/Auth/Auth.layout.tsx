import { Outlet } from 'react-router-dom';
import styles from './Auth.module.css';

function AuthLayout() {
	return (
		<div className={styles.layout}>
			<div className={styles.logo}>
				<img className={styles.image} src="/login-logo.svg" alt="Логотип компании" />
			</div>
			<div className={styles.content}>
				<Outlet />
			</div>
		</div>
	);
}

export default AuthLayout;
