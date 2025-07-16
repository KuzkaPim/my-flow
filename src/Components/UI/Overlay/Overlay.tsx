import { MouseEvent, ReactNode, useEffect } from 'react';
import styles from './Overlay.module.sass';

type TProps = {
	children: ReactNode;
	onClick?: () => void;
};

const Overlay = ({ children, onClick }: TProps) => {
	useEffect(() => {
		document.body.style.overflow = 'hidden';

		return () => {
			document.body.style.overflow = '';
		};
	}, []);

	const handleClose = (e: MouseEvent<HTMLDivElement>) => {
		if (e.target === e.currentTarget) {
			onClick?.();
		}
	};

	return (
		<div onClick={handleClose} className={styles.overlay}>
			{children}
		</div>
	);
};

export default Overlay;
