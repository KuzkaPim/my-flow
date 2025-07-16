import { TDish } from '@/types/TDish';
import styles from './DishesCard.module.sass';
import Image from 'next/image';
import cartImg from './cart.svg';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { addToCart } from '@/store/dishes/dishesSlice';

type TProps = {
	dish: TDish;
};

const DishesCard = ({ dish }: TProps) => {
	const dispatch = useAppDispatch();

	return (
		<li className={styles.dishesCard}>
			<Image
				width={100}
				height={100}
				className={styles.img}
				src={dish.img}
				alt={`${dish.name} img`}
			/>
			<div className={styles.mainInfo}>
				<h3 className={styles.title}>{dish.name}</h3>
				<p className={styles.descr}>{dish.description}</p>
				<span className={styles.price}>{dish.price} ₸</span>
			</div>
			<button
				onClick={() => dispatch(addToCart({ dish }))}
				className={styles.cartBtn}
			>
				<Image
					width={50}
					height={50}
					className={styles.cartImg}
					src={cartImg}
					alt='Cart img'
				/>
			</button>
		</li>
	);
};

export default DishesCard;
