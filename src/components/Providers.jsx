import React from 'react';
import { CartProvider } from '../shared/hooks/CartProvider';
import { FavoritesProvider } from '../shared/hooks/FavoritesProvider';
import { FilterProvider } from '../shared/hooks/FilterProvider';
import { GlobalContextProvider } from '../shared/hooks/GlobalProvider';

/*************  ✨ Windsurf Command ⭐  *************/
/*******  d7be1682-c0a0-4eab-b335-389931cb2c20  *******/
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
