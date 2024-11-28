import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Heading from '../../components/Heading/Heading';
import Input from '../../components/Input/Input';
import styles from './Login.module.css';
import { FormEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { login, userActions } from '../../store/user.slice';

export type LoginForm = {
	email: {
		value: string;
	};
	password: {
		value: string;
	}
}

function Login() {
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const {jwt, loginErrorMessage} = useSelector((s: RootState) => s.user);

	useEffect(() => {
		if (jwt) {
			navigate('/');
		}
	}, [jwt, navigate]);

	const sendLogin = async (email: string, password: string) => {
		dispatch(login({ email, password }));
	};

	const handleSubmit = async (evt: FormEvent) => {
		evt.preventDefault();
		dispatch(userActions.clearLoginError());
		const target = evt.target as typeof evt.target & LoginForm;
		const {email, password} = target;
		await sendLogin(email.value, password. value);
	};

	return (
		<div className={styles.wrapper}>
			<Heading>Вход</Heading>
			{loginErrorMessage && <div className={styles.error}>{loginErrorMessage}</div>}
			<form className={styles.form} onSubmit={handleSubmit}>
				<div className={styles.fieldset}>
					<label className={styles.label} htmlFor="email">Ваш email</label>
					<Input className={styles.input} name='email' id='email' placeholder='Email' />
				</div>
				<div className={styles.fieldset}>
					<label className={styles.label} htmlFor="password">Ваш пароль</label>
					<Input className={styles.input} name='password' id='password' type='password' placeholder='Пароль' />
				</div>
				<Button className={styles.submit} appearance='big'>Вход</Button>
			</form>
			<div className={styles.noAccount}>Нет аккаунта?</div>
			<Link className={styles.registration} to='/auth/registraion'>Зарегистрироваться</Link>
		</div>
	);
}

export default Login;