import { Container } from '../../container/container';
import { Layout } from '../../layout/layout';
import { Greeting } from '../../base-screen/greetings/greeting';

export const Home = () => {
	return (
		<Container>
			<Layout>
				<Greeting />
			</Layout>
		</Container>
	);
};
