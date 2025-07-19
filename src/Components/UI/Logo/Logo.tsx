import Link from 'next/link';
import styles from './Logo.module.sass';

type TProps = {
	label?: string;
};

const Logo = ({ label }: TProps) => {
	return (
		<Link href='#' className={styles.logo}>
			<span className={styles.initials}>KP</span>
			{label && <span className={styles.label}>{label}</span>}
		</Link>
	);
};

export default Logo;
