import React from 'react'
import { useFilter } from '../../../shared/hooks/FilterProvider'
import Pagination from './Pagination';
import ProductCard from '../../../widgets/card/ProductCard';
import NoProductsFound from '../Filter/NoProductsFound';
import Loading from './Loading';
import Sort from './Sort'
import ItemsPerPageView from './ItemsPerPageView';
import SearchBar from './SearchBar';
import { products } from '../../../shared/data/products';

export default function MianBlock({ setFilterOpenState, filterOpenState }) {
	const {
		loading,
		sortedProducts,
		currentPage,
		pageLoading,
		productsPerPage,
		searchTerm,
	} = useFilter()
	return (
		<section className="main-block">
			<div className="product-block-top">
				<SearchBar />
				<Sort />
				<ItemsPerPageView />
				<button onClick={() => {
					setFilterOpenState(!filterOpenState)
				}} className='filter-button button'>Filter</button>
			</div>
			<div className='product-block'>
				{!loading ? <>
					<div className="pagination-container">
						<Pagination />
					</div>
					{!pageLoading ?
						<div className='product-page-block'>
							<div className="product-list">
								{sortedProducts.length === 0 ?
									<NoProductsFound />
									: sortedProducts
										.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage)
										.map((product) => (
											<ProductCard key={product.id} product={product} searchTerm={searchTerm} />
										))
								}
							</div>
							<Pagination />
						</div>
						:
						<Loading loading={pageLoading} />
					} </> :
					<Loading loading={loading} />
				}
			</div>
		</section>
	)
}
