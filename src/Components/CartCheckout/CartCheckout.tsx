import { useAppSelector } from '@/hooks/useAppSelector';
import styles from './CartCheckout.module.sass';
import Modal from '../UI/Modal/Modal';
import { toggleModal } from '@/store/dishes/dishesSlice';
import { useAppDispatch } from '@/hooks/useAppDispatch';

const CartCheckout = () => {
	const { cart, isShowModal } = useAppSelector((state) => state.dishes);
	const totalCartPrice = cart.reduce((sum, item) => {
		return sum + item.dish.price * item.count;
	}, 0);
	const totalPrice = totalCartPrice + 1000;
	const dispatch = useAppDispatch();

	return (
		<div className={styles.cartCheckout}>
			<span className={styles.price}>= {totalCartPrice} ₸</span>
			<div className={styles.priceInfo}>
				<span className={styles.priceInfoItem}>
					<span className={styles.priceInfoTitle}>Delivery:</span>1000 ₸
				</span>
				<span className={styles.priceInfoItem}>
					<span className={styles.priceInfoTitle}>Total Price:</span>
					{totalPrice} ₸
				</span>
			</div>
			<button
				onClick={() => dispatch(toggleModal())}
				className={styles.orderBtn}
			>
				Place order
			</button>
			{isShowModal && <Modal totalPrice={totalPrice} />}
		</div>
	);
};

export default CartCheckout;
