import { TCartDish } from '@/types/TCartDish';
import styles from './CartItem.module.sass';
import Image from 'next/image';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { addToCart } from '@/store/dishes/dishesSlice';

type TProps = {
	cartDish: TCartDish;
};

const CartItem = ({ cartDish }: TProps) => {
	const { dish, count } = cartDish;
	const dispatch = useAppDispatch();

	return (
		<li className={styles.cartItem}>
			<h3 className={styles.title}>{dish.name}</h3>
			<div className={styles.mainInfo}>
				<Image
					width={60}
					height={60}
					className={styles.img}
					src={dish.img}
					alt={`${dish.name} img`}
				/>
				<div className={styles.priceInfo}>
					<span>{dish.price} ₸</span>
					<div className={styles.editPriceWrapper}>
						<div className={styles.controls}>
							<button
								onClick={() => dispatch(addToCart({ dish, count: -1 }))}
								className={styles.controlBtn}
							>
								-
							</button>
							<span className={styles.count}>{count}</span>
							<button
								onClick={() => dispatch(addToCart({ dish }))}
								className={styles.controlBtn}
							>
								+
							</button>
						</div>
						<span className={styles.price}>= {dish.price * count} ₸</span>
					</div>
				</div>
			</div>
		</li>
	);
};

export default CartItem;
