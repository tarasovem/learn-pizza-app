import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Heading from '../../components/Heading/Heading';
import Input from '../../components/Input/Input';
import styles from './Login.module.css';
import { FormEvent, useState } from 'react';
import { PREFIX } from '../../helpers/API';
import axios, { AxiosError } from 'axios';
import { LoginResponse } from '../../interfaces/auth.interface';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { userActions } from '../../store/user.slice';

export type LoginForm = {
	email: {
		value: string;
	};
	password: {
		value: string;
	}
}

function Login() {
	const [error, setError] = useState<string | null>();
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();

	const sendLogin = async (email: string, password: string) => {
		console.log('before', {email,password});
		try {
			const {data} = await axios.post<LoginResponse>(`${PREFIX}/auth/login`, {
				email,
				password
			});
			dispatch(userActions.addJwt(data.access_token));
			navigate('/');
		} catch(evt) {
			if (evt instanceof AxiosError) {
				setError(evt.response?.data.message);
			}
		}
	};

	const handleSubmit = async (evt: FormEvent) => {
		evt.preventDefault();
		setError(null);
		const target = evt.target as typeof evt.target & LoginForm;
		const {email, password} = target;
		await sendLogin(email.value, password. value);
	};

	return (
		<div className={styles.wrapper}>
			<Heading>Вход</Heading>
			{error && <div className={styles.error}>{error}</div>}
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