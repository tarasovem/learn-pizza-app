import styles from './Button.module.css';
import { ButtonProps } from './Button.props';
import cn from 'classnames';

function Button({ children, className, appearance = 'small', ...props }: ButtonProps) {
	return (
		<button
			className={cn(styles.button, styles.buttonAccent, className, {
				[styles.buttonBig]: appearance === 'big',
				[styles.buttonSmall]: appearance === 'small'
			})}
			{...props}
		>
			{children}
		</button>
	);
}

export default Button;
