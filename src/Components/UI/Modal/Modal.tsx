'use client';

import styles from './Modal.module.sass';
import Overlay from '../Overlay/Overlay';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import {
	postOrder,
	toggleModal,
	clearPostError,
	clearIsPosted,
} from '@/store/dishes/dishesSlice';
import { ChangeEvent, useState } from 'react';
import { useAppSelector } from '@/hooks/useAppSelector';
import { TCartPost } from '@/types/TCartPost';
import { TOrder } from '@/types/TOrder';
import Preloader from '../Preloader/Preloader';

type TProps = {
	totalPrice: number;
};

const Modal = ({ totalPrice }: TProps) => {
	const [name, setName] = useState<string>('');
	const [address, setAddress] = useState<string>('');
	const [phone, setPhone] = useState<string>('');
	const dispatch = useAppDispatch();
	const { cart, isPosting, postError, isPosted } = useAppSelector(
		(state) => state.dishes,
	);

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
				totalPrice: item.count * item.dish.price,
			};
			return acc;
		}, {});

		const orderDetails: TOrder = {
			user: {
				name,
				address,
				phone,
			},
			cart: cartObj,
			totalPrice,
		};

		dispatch(postOrder(orderDetails));
		setName('');
		setAddress('');
		setPhone('');
	};

	const handleClose = () => {
		dispatch(toggleModal());
		dispatch(clearPostError());
		dispatch(clearIsPosted());
	};

	return (
		<Overlay onClick={() => dispatch(toggleModal())}>
			<div className={styles.modal}>
				<div className={styles.header}>
					<h2 className={styles.title}>Enter your details</h2>
					{isPosting && (
						<div className={styles.preloader}>
							<Preloader />
						</div>
					)}
					{isPosted && <span className={styles.postDone}></span>}
					<button onClick={handleClose} className={styles.closeBtn}></button>
				</div>
				{postError ? (
					<div className={styles.error}>
						<div className={styles.errorMain}>
							<h3 className={styles.errorTitle}>Error</h3>
							<p className={styles.errorMessage}>{postError}</p>
						</div>
						<button
							onClick={() => dispatch(clearPostError())}
							className={styles.errorBtn}
						>
							Try again
						</button>
					</div>
				) : (
					<form onSubmit={handleSubmit} className={styles.form}>
						<div className={styles.labelsWrapper}>
							<label className={styles.label}>
								<h3 className={styles.inputTitle}>Name</h3>
								<input
									onChange={(e) => setName(e.target.value)}
									value={name}
									className={styles.input}
									type='text'
									required
								/>
							</label>
							<label className={styles.label}>
								<h3 className={styles.inputTitle}>Address</h3>
								<input
									onChange={(e) => setAddress(e.target.value)}
									value={address}
									className={styles.input}
									type='text'
									required
								/>
							</label>
							<label className={styles.label}>
								<h3 className={styles.inputTitle}>Phone</h3>
								<input
									onChange={(e) => setPhone(e.target.value)}
									value={phone}
									className={styles.input}
									type='text'
									required
								/>
							</label>
						</div>
						<button
							disabled={isPosting}
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
