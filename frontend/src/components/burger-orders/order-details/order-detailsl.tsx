import { Container } from '../../container/container';
import { Layout } from '../../layout/layout';
import { OrderDetailsModal } from '../order-details-modal/order-details-modal';
import styles from './styles.module.css';

export const OrderDetails = () => {
	return (
		<Layout>
			<Container className={styles.container}>
				<OrderDetailsModal />
			</Container>
		</Layout>
	);
};
