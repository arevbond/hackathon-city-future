import {
	BurgerIcon,
	ListIcon,
	Logo,
	ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Container } from '../container/container';
import styles from './styles.module.css';
import { NavElement } from './nav-element/nav-element';
import { NavLink } from 'react-router-dom';
import { pathPages } from '@utils/page-paths';

export const AppHeader = () => {
	return (
		<header className={`${styles.header} mb-10`}>
			<Container>
				<nav className={styles.nav}>
					{/* целесообразно тут выносить это в отдельный компонент? потом ведь это будут ссылки изначально было так */}
					{/* <button onClick={_setPageConstructor} className={styles['nav-link']}>
						<BurgerIcon type='primary' />
						<p className='text text_type_main-default '>Burger constructor</p>
					</button> */}
					<section className={styles['burger-ui']}>
						<NavLink to={pathPages.home} className={styles['nav-link']}>
							{({ isActive }) => (
								<NavElement
									name='Burger constructor'
									className={
										isActive
											? 'text text_type_main-default'
											: 'text text_type_main-default text_color_inactive'
									}>
									<BurgerIcon type={isActive ? 'primary' : 'secondary'} />
								</NavElement>
							)}
						</NavLink>
						<NavLink to={pathPages.checkList} className={styles['nav-link']}>
							{({ isActive }) => (
								<NavElement
									name='CheckList'
									className={
										isActive
											? 'text text_type_main-default'
											: 'text text_type_main-default text_color_inactive'
									}>
									<ListIcon type={isActive ? 'primary' : 'secondary'} />
								</NavElement>
							)}
						</NavLink>
					</section>
					<Logo />

					<NavLink
						to={pathPages.personalAccount}
						className={styles['nav-link']}>
						{({ isActive }) => (
							<NavElement
								name='Личный кабинет'
								className={
									isActive
										? 'text text_type_main-default'
										: 'text text_type_main-default text_color_inactive'
								}>
								<ProfileIcon type={isActive ? 'primary' : 'secondary'} />
							</NavElement>
						)}
					</NavLink>
				</nav>
			</Container>
		</header>
	);
};
