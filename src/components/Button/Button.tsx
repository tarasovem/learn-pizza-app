import cn from 'classnames';
import styles from './Button.module.css';
import { ButtonProps } from './Button.props';

function Button({ children, className, appearance = 'small', ...props }: ButtonProps) {
	return (
		<button
			className={cn(styles.button, styles.buttonAccent, className, {
				[styles.buttonBig]: appearance === 'big',
				[styles.buttonSmall]: appearance === 'small',
				[styles.buttonExit]: appearance === 'exit'
			})}
			{...props}
		>
			{children}
		</button>
	);
}

export default Button;
