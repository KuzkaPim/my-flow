'use client';

import { useAppSelector } from '@/hooks/useAppSelector';
import styles from './Cart.module.sass';
import CartItem from '../CartItem/CartItem';
import CartCheckout from '../CartCheckout/CartCheckout';

const Cart = () => {
	const { cart } = useAppSelector((state) => state.dishes);

	return (
		<div className={styles.cart}>
			<h2 className={styles.title}>Cart</h2>
			{cart.length ? (
				<ul className={styles.cartList}>
					{cart.map((item) => (
						<CartItem key={item.dish.name} cartDish={item} />
					))}
				</ul>
			) : (
				<p className={styles.emptyCart}>The cart is still empty</p>
			)}
			{cart.length > 0 && <CartCheckout />}
		</div>
	);
};

export default Cart;
