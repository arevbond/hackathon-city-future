import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './components/app';
import './styles.css';
import { Provider } from 'react-redux';
import store from '@services/store';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BrowserRouter } from 'react-router-dom';

// Как лучше тут типизировать?

// const domNode = document.getElementById('root');
// if (domNode) {
// 	const root = createRoot(domNode);
// 	root.render(
// 		<StrictMode>
// 			<BrowserRouter>
// 				<DndProvider backend={HTML5Backend}>
// 					<Provider store={store}>
// 						<App />
// 					</Provider>
// 				</DndProvider>
// 			</BrowserRouter>
// 		</StrictMode>
// 	);
// }

const domNode = document.getElementById('root') as HTMLElement;

const root = createRoot(domNode);
root.render(
	<StrictMode>
		<BrowserRouter>
			<DndProvider backend={HTML5Backend}>
				<Provider store={store}>
					<App />
				</Provider>
			</DndProvider>
		</BrowserRouter>
	</StrictMode>
);
