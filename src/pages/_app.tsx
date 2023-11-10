import Layout from '@/components/Layout';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { NextUIProvider } from '@nextui-org/react';
import store from '@store/store';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<Provider store={store}>
			<NextUIProvider>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</NextUIProvider>
		</Provider>
	);
}
