import styles from './Logo.module.sass';

type TProps = {
	label?: string;
};

const Logo = ({ label }: TProps) => {
	return (
		<a href='#' className={styles.logo}>
			<span className={styles.initials}>KP</span>
			{label && <span className={styles.label}>{label}</span>}
		</a>
	);
};

export default Logo;
