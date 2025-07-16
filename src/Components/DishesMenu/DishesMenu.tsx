'use client';

import { useAppDispatch } from '@/hooks/useAppDispatch';
import styles from './DishesMenu.module.sass';
import { useEffect } from 'react';
import { getDishes } from '@/store/dishes/dishesSlice';
import { useAppSelector } from '@/hooks/useAppSelector';
import DishesCard from '../DishesCard/DishesCard';
import Preloader from '../UI/Preloader/Preloader';

const DishesMenu = () => {
	const dispatch = useAppDispatch();
	const { dishes, isLoading, error } = useAppSelector((state) => state.dishes);

	useEffect(() => {
		dispatch(getDishes());
	}, [dispatch]);

	return (
		<div className={styles.dishesMenu}>
			<h2 className={styles.title}>
				Menu
				{isLoading && (
					<div className={styles.preloader}>
						<Preloader />
					</div>
				)}
			</h2>
			{error && (
				<div className={styles.error}>
					<h3 className={styles.errorTitle}>Error</h3>
					<p className={styles.errorMessage}>{error}</p>
				</div>
			)}
			<ul className={styles.menuList}>
				{dishes.map((dish) => (
					<DishesCard key={dish.name} dish={dish} />
				))}
			</ul>
		</div>
	);
};

export default DishesMenu;
