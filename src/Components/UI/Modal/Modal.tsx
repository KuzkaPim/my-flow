'use client';

import styles from './Modal.module.sass';
import Overlay from '../Overlay/Overlay';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { toggleModalCart, clearError } from '@/store/cart/cartSlice';
import { ChangeEvent, useState } from 'react';
import { useAppSelector } from '@/hooks/useAppSelector';
import { TCartPost } from '@/types/TCartPost';
import { TOrder } from '@/types/TOrder';
import Preloader from '../Preloader/Preloader';
import { postOrder } from '@/store/cart/cartSlice';

const Modal = () => {
	const [name, setName] = useState<string>('');
	const [address, setAddress] = useState<string>('');
	const [phone, setPhone] = useState<string>('');
	const dispatch = useAppDispatch();
	const { isLoading, error, cart } = useAppSelector((state) => state.cart);

	const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!name.trim() || !address.trim() || !phone.trim()) {
			alert('Please fill in all fields');
			return;
		}

		const cartObj = cart.reduce<TCartPost>((acc, item) => {
			acc[item.dish.name] = {
				count: item.count,
				price: item.dish.price,
			};
			return acc;
		}, {});

		const orderDetails: TOrder = {
			user: {
				name,
				address,
				phone,
			},
			order: cartObj,
		};

		dispatch(postOrder(orderDetails));
	};

	const handleClose = () => {
		dispatch(toggleModalCart());
	};

	return (
		<Overlay onClick={() => dispatch(toggleModalCart())}>
			<div className={styles.modal}>
				<header className={styles.header}>
					<h2 className={styles.title}>
						{error ? 'Error' : 'Enter your details'}
					</h2>
					{isLoading && (
						<div className={styles.preloader}>
							<Preloader />
						</div>
					)}
					<button onClick={handleClose} className={styles.closeBtn}></button>
				</header>
				{error && (
					<div className={styles.error}>
						<p className={styles.errorMessage}>{error}</p>
						<button
							onClick={() => dispatch(clearError())}
							className={styles.submitBtn}
						>
							Try again
						</button>
					</div>
				)}
				{!error && (
					<form onSubmit={handleSubmit} className={styles.form}>
						<div className={styles.labelsWrapper}>
							<label className={styles.label}>
								<span className={styles.inputTitle}>Name</span>
								<input
									onChange={(e) => setName(e.target.value)}
									value={name}
									className={styles.input}
									placeholder='John Doe'
									type='text'
									required
								/>
							</label>
							<label className={styles.label}>
								<span className={styles.inputTitle}>Address</span>
								<input
									onChange={(e) => setAddress(e.target.value)}
									value={address}
									className={styles.input}
									placeholder='329 Main St'
									type='text'
									required
								/>
							</label>
							<label className={styles.label}>
								<span className={styles.inputTitle}>Phone</span>
								<input
									onChange={(e) => setPhone(e.target.value)}
									value={phone}
									className={styles.input}
									placeholder='+7-(707)-710-77-23'
									type='text'
									required
								/>
							</label>
						</div>
						<button
							disabled={isLoading}
							className={styles.submitBtn}
							type='submit'
						>
							Send order
						</button>
					</form>
				)}
			</div>
		</Overlay>
	);
};

export default Modal;
