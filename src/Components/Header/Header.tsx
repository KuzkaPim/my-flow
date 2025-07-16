import styles from './Header.module.sass';
import Logo from '../UI/Logo/Logo';
import Container from '../UI/Container/Container';

const Header = () => {
	return (
		<header className={styles.header}>
			<Container className={styles.container}>
				<h1 className={styles.logo}>
					<Logo label='My Flow' />
				</h1>
			</Container>
		</header>
	);
};

export default Header;
