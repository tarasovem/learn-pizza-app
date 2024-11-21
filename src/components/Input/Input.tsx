import styles from './Input.module.css';
import cn from 'classnames';
import { forwardRef } from 'react';
import { InputProps } from './Input.props';

const Input = forwardRef<HTMLInputElement, InputProps>(({ isValid = true, className, ...props }, ref) => {
	return (
		<input
			{...props}
			ref={ref}
			placeholder="Email"
			className={cn(styles.input, className, {
				[styles.invalid]: isValid
			})}
		/>
	);
});

export default Input;