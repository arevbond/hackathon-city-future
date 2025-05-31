import { FeedLens } from './feed-lens/feed-lens';
import styles from './styles.module.css'

export const Feed = () => {
	return (
		<div className={styles.feed}>
			<FeedLens />
		</div>
	);
};
