import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Heading from '../../components/Heading/Heading';
import Input from '../../components/Input/Input';
import styles from './Registration.module.css';
import { FormEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { registration, userActions } from '../../store/user.slice';

export type RegistrationForm = {
	email: {
		value: string;
	};
	password: {
		value: string;
	},
	name: {
		value: string
	}
}

function Registration() {
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const {jwt, registrationErrorMessage} = useSelector((s: RootState) => s.user);

	useEffect(() => {
		if (jwt) {
			navigate('/');
		}
	}, [jwt, navigate]);


	const handleSubmit = async (evt: FormEvent) => {
		evt.preventDefault();
		dispatch(userActions.clearRegistrationError());
		const target = evt.target as typeof evt.target & RegistrationForm;
		const {email, password, name} = target;
		dispatch(registration({ email: email.value, password: password.value, name: name.value }));
	};

	return (
		<div className={styles.wrapper}>
			<Heading>Регистрация</Heading>
			{registrationErrorMessage && <div className={styles.error}>{registrationErrorMessage}</div>}
			<form className={styles.form} onSubmit={handleSubmit}>
				<div className={styles.fieldset}>
					<label className={styles.label} htmlFor="email">Ваш email</label>
					<Input className={styles.input} name='email' id='email' placeholder='Email' />
				</div>
				<div className={styles.fieldset}>
					<label className={styles.label} htmlFor="password">Ваш пароль</label>
					<Input className={styles.input} name='password' id='password' type='password' placeholder='Пароль' />
				</div>
				<div className={styles.fieldset}>
					<label className={styles.label} htmlFor="password">Ваше имя</label>
					<Input className={styles.input} name='name' id='name' placeholder='Имя' />
				</div>
				<Button className={styles.submit} appearance='big'>Зарегистрироваться</Button>
			</form>
			<div className={styles.noAccount}>Есть аккаунт?</div>
			<Link className={styles.registration} to='/auth/login'>Войти</Link>
		</div>
	);
}

export default Registration;