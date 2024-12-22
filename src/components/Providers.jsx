import React from 'react';
import { CartProvider } from '../shared/hooks/CartProvider';
import { FavoritesProvider } from '../shared/hooks/FavoritesProvider';
import { FilterProvider } from '../shared/hooks/FilterProvider';
import { GlobalContextProvider } from '../shared/hooks/GlobalProvider';

export function AppProviders({ children }) {
	return (
		<GlobalContextProvider>
			<CartProvider>
				<FavoritesProvider>
					<FilterProvider>
						{children}
					</FilterProvider>
				</FavoritesProvider>
			</CartProvider>
		</GlobalContextProvider>
	);
}
