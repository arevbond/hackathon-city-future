import { Container } from '../container/container';
import styles from './styles.module.css';
import { NavElement } from './nav-element/nav-element';
import { NavLink } from 'react-router-dom';
import { pathPages } from '@utils/page-paths';
import { PingDev } from './assets/PingDev';

export const AppHeader = () => {
	return (
		<header className={`${styles.header} mb-10`}>
			<Container>
				<nav className={styles.nav}>
					<div>
						<PingDev />
					</div>
					<section className={styles.links}>
						<NavLink to={pathPages.home} className={styles['nav-link']}>
							{({ isActive }) => (
								<NavElement
									name='товар'
									className={
										isActive ? styles.active : styles.link
									}></NavElement>
							)}
						</NavLink>
						<NavLink to={pathPages.login} className={styles['nav-link']}>
							{({ isActive }) => (
								<NavElement
									name='войти'
									className={
										isActive ? styles.active : styles.link
									}></NavElement>
							)}
						</NavLink>
					</section>
				</nav>
			</Container>
		</header>
	);
};
