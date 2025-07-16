import DishesMenu from '@/Components/DishesMenu/DishesMenu';
import styles from './Home.module.sass';
import Container from '@/Components/Container/Container';
import Cart from '@/Components/Cart/Cart';

const Home = () => {
	return (
		<div className={styles.home}>
			<Container className={styles.container}>
				<DishesMenu />
				<Cart />
			</Container>
		</div>
	);
};

export default Home;
