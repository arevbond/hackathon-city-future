import { Container } from '../../container/container';
import { Layout } from '../../layout/layout';
import { Greeting } from '../../base-screen/greetings/greeting';
import {Cards} from "../../base-screen/cards/cards";
import {Reviews} from "../../base-screen/reviews/reviews";

export const Home = () => {
	return (
		<Container>
			<Layout>
				<Greeting />

				<Cards />
				<Reviews/>
			</Layout>
		</Container>
	);
};
