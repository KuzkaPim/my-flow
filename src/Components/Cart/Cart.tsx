'use client';

import { useAppSelector } from '@/hooks/useAppSelector';
import Image from 'next/image';
import styles from './Cart.module.sass';
import CartItem from '../CartItem/CartItem';
import CartCheckout from '../CartCheckout/CartCheckout';
import Modal from '../UI/Modal/Modal';
import basketImg from './basket.svg';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { toggleModalCart, clearCart } from '@/store/cart/cartSlice';

const Cart = () => {
	const { cart, isShowModalCart } = useAppSelector((state) => state.cart);
	const dispatch = useAppDispatch();

	const totalPrice = cart.reduce((sum, item) => {
		return sum + item.dish.price * item.count;
	}, 0);

	return (
		<div className={styles.cart}>
			<h2 className={styles.title}>Cart</h2>
			{cart.length === 0 && <p className={styles.empty}>Empty</p>}
			{cart.length > 0 && (
				<>
					<ul className={styles.cartList}>
						{cart.map((item) => (
							<CartItem key={item.dish.name} cartDish={item} />
						))}
					</ul>
					<span className={styles.price}>= {totalPrice} ₸</span>
					<CartCheckout totalPrice={totalPrice} />
					<div className={styles.controls}>
						<button
							onClick={() => dispatch(clearCart())}
							className={styles.basketBtn}
						>
							<Image
								className={styles.basketImg}
								src={basketImg}
								width={26}
								height={26}
								alt='Basket'
							/>
						</button>
						<button
							onClick={() => dispatch(toggleModalCart())}
							className={styles.orderBtn}
						>
							Place order
						</button>
					</div>
					{isShowModalCart && <Modal />}
				</>
			)}
		</div>
	);
};

export default Cart;
