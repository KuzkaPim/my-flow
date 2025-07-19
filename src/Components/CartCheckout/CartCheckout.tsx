import { useAppSelector } from '@/hooks/useAppSelector';
import styles from './CartCheckout.module.sass';
import Modal from '../UI/Modal/Modal';
import { toggleModalCart } from '@/store/cart/cartSlice';
import { useAppDispatch } from '@/hooks/useAppDispatch';

const CartCheckout = () => {
	const { cart, isShowModalCart } = useAppSelector((state) => state.cart);
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
				onClick={() => dispatch(toggleModalCart())}
				className={styles.orderBtn}
			>
				Place order
			</button>
			{isShowModalCart && <Modal />}
		</div>
	);
};

export default CartCheckout;
