import { Container } from '../../container/container';
import { Layout } from '../../layout/layout';

import styles from './styles.module.css';

export const Page404 = () => {
	return (
		<Layout>
			<Container className={styles.container}>
				<section className={styles['error-page']}>
					<h1 className={styles.title}> 404 </h1>
					<p className={styles.description}>page not found</p>
				</section>
			</Container>
		</Layout>
	);
};
