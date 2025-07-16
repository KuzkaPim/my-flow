'use client';

import store, { TAppStore } from '@/store/store';
import { ReactNode, useRef } from 'react';
import { Provider } from 'react-redux';

type TProps = {
	children: ReactNode;
};

const StoreProvider = ({ children }: TProps) => {
	const storeRef = useRef<TAppStore | null>(null);

	if (!storeRef.current) {
		storeRef.current = store;
	}

	return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;
