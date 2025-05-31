import { Container } from '../../container/container';
import { Layout } from '../../layout/layout';
import { Greeting } from '../../base-screen/greetings/greeting';
import {Cards} from "../../base-screen/cards/cards";

export const Home = () => {
	return (
		<Container>
			<Layout>
				<Greeting />

				<Cards />
			</Layout>
		</Container>
	);
};
