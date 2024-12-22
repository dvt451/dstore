import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../widgets/header/Header';
import Footer from '../../widgets/footer/Footer';
import ProductCard from '../../widgets/card/ProductCard';
import CheckboxFilter from './Filter/CheckboxFilter';
import PriceFilter from './Filter/PriceFilter';
import PriceReactSlider from './Filter/PriceReactSlider';
import { useFilter } from '../../shared/hooks/FilterProvider';
import MianBlock from './MainBlock/MianBlock';
import RadioFilter from './Filter/RadioFilter';
import { CiFilter } from "react-icons/ci";

const ShopPage = () => {
	const {
		categoryFilter,
		filters,
		filterConfig,
		allFilterConfig,
		handleFilterChange,
		resetFilters,
		setLoading,
		queryParams,
		setCurrentPage,
		setFilters,
		sortValues,
		defaulSort,
		setSortOption,
		ProductsPerPageOptions,
		setProductsPerPage,
		setPriceRange,
		maxProductPrice,
		priceRange,
		sortOption,
		currentPage,
		itemPerPageActive,
		searchTerm,
		productsPerPage,
		defaultProductsPerPage,
		setItemPerPageActive,
		setCategoryFilter,
	} = useFilter()
	const location = useLocation()
	const navigate = useNavigate()
	const [filterOpenState, setFilterOpenState] = useState(false)
	{/* ************** Get data from URL ************** */ }
	const isInitialSync = useRef(true);
	useEffect(() => {
		if (isInitialSync.current) {
			setLoading(true);

			// Get all relevant filters from URL
			const urlFilters = {
				brands: queryParams.getAll('brands'),
				storage: queryParams.getAll('storage'),
				ram: queryParams.getAll('ram'),
				processors: queryParams.getAll('processors'),
				screenSizes: queryParams.getAll('screenSizes').map(Number),
				ratings: queryParams.getAll('ratings').map(Number),
				availability: queryParams.get('availability') || 'All',
			};

			const urlPage = parseInt(queryParams.get('page'), 10) || 1; // Get the page number from URL or default to 1
			setCurrentPage(urlPage);

			setFilters(urlFilters);

			const sortParam = queryParams.get('sort');
			const initialSortIndex = sortParam ? sortValues.indexOf(sortParam) : defaulSort;
			setSortOption(initialSortIndex);

			// Handle productsPerPage and itemPerPageActive
			const urlProductsPerPageIndex = parseInt(queryParams.get('itemsPerPage'), 10);
			const urlProductsPerPage = ProductsPerPageOptions[urlProductsPerPageIndex];

			if (urlProductsPerPage) {
				setProductsPerPage(urlProductsPerPage);
				setItemPerPageActive(urlProductsPerPageIndex);
			} else {
				setProductsPerPage(ProductsPerPageOptions[defaultProductsPerPage]);
				setItemPerPageActive(defaultProductsPerPage);
			}

			// Price range
			setPriceRange({
				min: queryParams.get('minPrice') || '',
				max: queryParams.get('maxPrice') || maxProductPrice,
			});

			isInitialSync.current = false;

			setTimeout(() => {
				setLoading(false);
			}, 500);
		}
	}, [location.search]);

	{/* ************** Set data to URL ************** */ }
	useEffect(() => {
		if (isInitialSync.current) return;

		const searchParams = new URLSearchParams();

		// Set filters to URL
		if (categoryFilter) {
			searchParams.set('category', categoryFilter);
		} else {
			searchParams.delete('category');
		}

		Object.keys(filters).forEach((key) => {
			if (Array.isArray(filters[key]) && filters[key].length > 0) {
				filters[key].forEach((value) => searchParams.append(key, value));
			} else if (key === 'availability' && filters.availability !== 'All') {
				searchParams.set('availability', filters.availability);
			}
		});

		if (priceRange.min) {
			searchParams.set('minPrice', priceRange.min);
		} else {
			searchParams.delete('minPrice');
		}

		if (priceRange.max) {
			searchParams.set('maxPrice', priceRange.max);
		} else {
			searchParams.delete('maxPrice');
		}

		if (sortValues[sortOption]) {
			searchParams.set('sort', sortValues[sortOption]);
		}

		searchParams.set('page', currentPage); // Sync current page to URL
		searchParams.set('itemsPerPage', itemPerPageActive); // Sync itemsPerPage to URL

		if (searchTerm) {
			searchParams.set('search', searchTerm); // Add search term to URL
		}

		navigate({ search: searchParams.toString() }, { replace: true });
	}, [
		filters,
		categoryFilter,
		sortOption,
		currentPage,
		productsPerPage,
		itemPerPageActive,
		navigate,
		priceRange,
		searchTerm,
	]);

	const renderCategoryFilters = () => {
		const categoryFilters = filterConfig[categoryFilter?.replace(/\s+/g, '')] || allFilterConfig;
		return categoryFilters.map((filter, index) => (
			<CheckboxFilter
				key={index}
				label={filter.label}
				items={filter.items}
				name={filter.name}
				selectedFilters={filters[filter.name]}
				onChange={handleFilterChange}
			/>
		));
	};

	return (
		<>
			<Header />
			<main className="shop">
				<div className="shop__container">
					<aside className={`filters${filterOpenState ? " _active" : ""}`}>
						<div className='filters__block'>
							<button onClick={() => {
								setFilterOpenState(!filterOpenState)
							}} className="filters__opener"><CiFilter /></button>
							<button onClick={resetFilters} className="reset-button">
								<span>Reset Filters</span>
							</button>
							{/* <PriceFilter /> */}
							<PriceReactSlider />
							<RadioFilter />
							{renderCategoryFilters()}
						</div>
					</aside>
					<MianBlock setFilterOpenState={setFilterOpenState} filterOpenState={filterOpenState} />
				</div>
			</main>
			<Footer />
		</>
	);
};

export default ShopPage;