import styles from './Search.module.css';
import { forwardRef } from 'react';
import { SearchProps } from './Search,props';
import cn from 'classnames';

const Search = forwardRef<HTMLInputElement, SearchProps>(({ isValid = true, className, ...props }, ref) => {
	return (
		<input
			{...props}
			ref={ref}
			className={cn(styles.search, className, {
				[styles.invalid]: isValid
			})}
		/>
	);
});

export default Search;