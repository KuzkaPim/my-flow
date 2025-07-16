import styles from './Footer.module.sass';
import Container from '../UI/Container/Container';
import Logo from '../UI/Logo/Logo';

const Footer = () => {
	return (
		<footer className={styles.footer}>
			<Container className={styles.container}>
				<Logo />
			</Container>
		</footer>
	);
};

export default Footer;
