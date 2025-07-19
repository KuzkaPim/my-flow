import styles from './CartCheckout.module.sass';

type TProps = {
	totalPrice: number;
};

const CartCheckout = ({ totalPrice }: TProps) => {
	totalPrice += 1000;

	return (
		<div className={styles.cartCheckout}>
			<div className={styles.priceInfo}>
				<span className={styles.priceInfoItem}>
					<span className={styles.priceInfoTitle}>Delivery:</span>1000 ₸
				</span>
				<span className={styles.priceInfoItem}>
					<span className={styles.priceInfoTitle}>Total Price:</span>
					{totalPrice} ₸
				</span>
			</div>
		</div>
	);
};

export default CartCheckout;
