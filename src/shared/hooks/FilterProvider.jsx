import React, { createContext, useState, useContext, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
	AccessoriesBrands,
	AccessoriesRating,
	ComputerBrands,
	ComputerStorage,
	ComputersProcessor,
	ComputersRams,
	ComputersRating,
	DisplaysBrands,
	DisplaysRating,
	DisplaysScreenSizes,
	GamingConsolesBrands,
	GamingConsolesRating,
	NotebooksBrands,
	NotebooksProcessor,
	NotebooksRams,
	NotebooksRating,
	NotebooksScreenSizes,
	NotebooksStorage,
	SmartphonesBrands,
	SmartphonesRams,
	SmartphonesRating,
	SmartphonesScreenSizes,
	SmartphonesStorage,
	accessories,
	allBrands,
	allRatings,
	computers,
	displays,
	drones,
	gamingConsoles,
	notebooks,
	products,
	smartphones,
} from '../data/products';

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	const categoryFilter = queryParams.get('category');

	const [loading, setLoading] = useState(false)
	const [pageLoading, setPageLoading] = useState(false)

	const defaultProductsPerPage = 0
	const defaulSort = 1;
	const allProductsPageNumbers = [10, 20, 30, 40]
	const categoriesProdutsPageNumbers = [3, 4, 5, 10]
	const ProductsPerPageOptions = categoryFilter ? categoriesProdutsPageNumbers : allProductsPageNumbers;
	const [sortOption, setSortOption] = useState(defaulSort);
	const [currentPage, setCurrentPage] = useState(1);
	const [productsPerPage, setProductsPerPage] = useState(ProductsPerPageOptions[defaultProductsPerPage]);
	const [itemPerPageActive, setItemPerPageActive] = useState(defaultProductsPerPage);
	const [searchTerm, setSearchTerm] = useState(queryParams.get('search') || '');

	const [filters, setFilters] = useState({
		brands: [],
		storage: [],
		ram: [],
		processors: [],
		screenSizes: [],
		ratings: [],
		availability: 'All'
	});

	// Sorting options for dropdown
	const sortValues = [
		'Sort By name',
		'Sort By price: low to high',
		'Sort By price: high to low',
	];
	const [priceRange, setPriceRange] = useState({
		min: queryParams.get('minPrice') || '',
		max: queryParams.get('maxPrice') || '',
	});

	const filterConfig = {
		Notebooks: [
			{ label: 'Brands', name: 'brands', items: NotebooksBrands },
			{ label: 'Processor', name: 'processors', items: NotebooksProcessor },
			{ label: 'RAM', name: 'ram', items: NotebooksRams },
			{ label: 'Storage', name: 'storage', items: NotebooksStorage },
			{ label: 'Screen Sizes', name: 'screenSizes', items: NotebooksScreenSizes },
			{ label: 'Rating', name: 'ratings', items: NotebooksRating },
		],
		Computers: [
			{ label: 'Brands', name: 'brands', items: ComputerBrands },
			{ label: 'Processor', name: 'processors', items: ComputersProcessor },
			{ label: 'RAM', name: 'ram', items: ComputersRams },
			{ label: 'Storage', name: 'storage', items: ComputerStorage },
			{ label: 'Rating', name: 'ratings', items: ComputersRating },
		],
		Smartphones: [
			{ label: 'Brands', name: 'brands', items: SmartphonesBrands },
			{ label: 'RAM', name: 'ram', items: SmartphonesRams },
			{ label: 'Storage', name: 'storage', items: SmartphonesStorage },
			{ label: 'Screen Sizes', name: 'screenSizes', items: SmartphonesScreenSizes },
			{ label: 'Rating', name: 'ratings', items: SmartphonesRating },
		],
		Displays: [
			{ label: 'Brands', name: 'brands', items: DisplaysBrands },
			{ label: 'Screen Sizes', name: 'screenSizes', items: DisplaysScreenSizes },
			{ label: 'Rating', name: 'ratings', items: DisplaysRating },
		],
		Accessories: [
			{ label: 'Brands', name: 'brands', items: AccessoriesBrands },
			{ label: 'Rating', name: 'ratings', items: AccessoriesRating },
		],
		GamingConsoles: [
			{ label: 'Brands', name: 'brands', items: GamingConsolesBrands },
			{ label: 'Rating', name: 'ratings', items: GamingConsolesRating },
		],
	};
	const priceFilterConfig = {
		Notebooks: Math.max(...notebooks.map((p) => p.price)),
		Computers: Math.max(...computers.map((p) => p.price)),
		Smartphones: Math.max(...smartphones.map((p) => p.price)),
		Displays: Math.max(...displays.map((p) => p.price)),
		Accessories: Math.max(...accessories.map((p) => p.price)),
		GamingConsoles: Math.max(...gamingConsoles.map((p) => p.price)),
		Drones: Math.max(...drones.map((p) => p.price)),
	}
	const allFilterConfig = [
		{ label: 'Brands', name: 'brands', items: allBrands },
		{ label: 'Rating', name: 'ratings', items: allRatings },
	]
	// const [maxProductPrice, setMaxProductPrice] = useState(priceFilterConfig[categoryFilter?.replace(/\s+/g, '')] || Math.max(...products.map((p) => p.price)))
	const maxProductPrice = Math.max(...products.map((p) => p.price))

	const maxAllProductPrice = Math.max(...products.map((p) => p.price))

	const handlePriceInputChange = (e) => {
		const { name, value } = e.target;
		setPriceRange((prevPriceRange) => ({
			...prevPriceRange,
			[name]: value,
		}));
	};




	const handleFilterChange = (e) => {
		setLoading(true)
		const { name, value, checked } = e.target;
		setFilters((prevFilters) => {
			const valueToAdd = name === 'screenSizes' || name === 'ratings' ? Number(value) : value;
			return {
				...prevFilters,
				[name]: checked
					? [...prevFilters[name], valueToAdd]
					: prevFilters[name].filter((item) => item !== valueToAdd),
			};
		});
		setCurrentPage(1)
		const filterSection = document.body;
		filterSection?.scrollIntoView({
			behavior: 'smooth',
		});
		setTimeout(() => {
			setLoading(false)
		}, 500);
	};

	const handleAvailabilityChange = (e) => {
		const { value } = e.target;
		setFilters((prevFilters) => ({
			...prevFilters,
			availability: value, // Update availability filter
		}));
		setCurrentPage(1); // Reset to the first page when filter changes
		const filterSection = document.body;
		filterSection?.scrollIntoView({
			behavior: 'smooth',
		});
	};


	{/* ************* ReactSlider ********************************************************************************************************* */ }
	const handleRangePriceChange = (newPriceRange) => {
		setPriceRange({
			min: newPriceRange.min || '',
			max: newPriceRange.max || maxProductPrice,
		});
	};
	{/* ************* ReactSlider ********************************************************************************************************* */ }


	const filteredProducts = products.filter((product) => {
		const matchesCategory = categoryFilter ? product.category === categoryFilter : true;
		const matchesBrand = filters.brands.length === 0 || filters.brands.includes(product.brand);
		const matchesStorage = filters.storage.length === 0 || filters.storage.includes(product.storage);
		const matchesRam = filters.ram.length === 0 || filters.ram.includes(product.ram);
		const matchesScreenSize = filters.screenSizes.length === 0 || filters.screenSizes.includes(product.screenSize);
		const matchesProcessor = filters.processors.length === 0 || filters.processors.includes(product.processor);
		const matchesRatings = filters.ratings.length === 0 || filters.ratings.includes(product.rating);

		const matchesPrice =
			(!priceRange.min || product.price >= priceRange.min) &&
			(!priceRange.max || product.price <= priceRange.max);

		const matchesSearch =
			!searchTerm ||
			product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
			product.category.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesAvailability =
			filters.availability === 'All' ||
			(filters.availability === "in-stock" && product.stock > 0) ||
			(filters.availability === "out-of-stock" && product.stock === 0);

		return (
			matchesCategory &&
			matchesBrand &&
			matchesStorage &&
			matchesRam &&
			matchesProcessor &&
			matchesRatings &&
			matchesScreenSize &&
			matchesPrice &&
			matchesSearch &&
			matchesAvailability
		);
	});


	const sortProducts = (products) => {
		if (sortOption === 1) {
			return products.sort((a, b) => a.price - b.price);
		} else if (sortOption === 2) {
			return products.sort((a, b) => b.price - a.price);
		} else {
			return products.sort((a, b) => a.name.localeCompare(b.name));
		}

	};


	const sortedProducts = sortProducts(filteredProducts);

	const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

	const handlePageChange = (page) => {
		setCurrentPage(page);
		const filterSection = document.body;
		filterSection?.scrollIntoView({
			behavior: 'smooth',
		});
	};

	const handleSearchChange = (e) => {
		setLoading(true)
		setCurrentPage(1)
		setSearchTerm(e.target.value);
		setTimeout(() => {
			setLoading(false)
		}, 500);
	};

	const resetFilters = () => {
		setLoading(true)
		const resetFilters = {
			brands: [],
			storage: [],
			ram: [],
			processors: [],
			screenSizes: [],
			ratings: [],
			availability: 'All',
		};
		// When use ReactSlider
		setPriceRange({
			min: '',
			max: maxProductPrice,
		});
		// When use InputPrice
		// setPriceRange({
		//   min: '',
		//   max: '',
		// });
		setSearchTerm('')
		setCurrentPage(1)
		setFilters(resetFilters);
		const filterSection = document.body;
		filterSection?.scrollIntoView({
			behavior: 'smooth',
		});
		setTimeout(() => {
			setLoading(false)
		}, 500);
	};
	const resetAll = () => {
		resetFilters()
		setProductsPerPage(allProductsPageNumbers[0])
		setItemPerPageActive(0)
		setPriceRange({
			min: '',
			max: maxAllProductPrice
		})
	}

	const resetCategories = () => {
		resetFilters()
		setProductsPerPage(categoriesProdutsPageNumbers[0])
		setItemPerPageActive(0)
	}

	return (
		<FilterContext.Provider value={{
			setFilters,
			filters,
			categoryFilter,
			filterConfig,
			allFilterConfig,
			handleFilterChange,
			resetFilters,
			loading,
			sortedProducts,
			setPageLoading,
			currentPage,
			totalPages,
			handlePageChange,
			pageLoading,
			productsPerPage,
			sortValues,
			sortOption,
			setSortOption,
			setLoading,
			setProductsPerPage,
			itemPerPageActive,
			setItemPerPageActive,
			setCurrentPage,
			ProductsPerPageOptions,
			searchTerm,
			handleSearchChange,
			priceRange,
			handleRangePriceChange,
			maxProductPrice,
			queryParams,
			defaulSort,
			setPriceRange,
			handleAvailabilityChange,
			handlePriceInputChange,
			defaultProductsPerPage,
			resetAll,
			setSearchTerm,
			resetCategories
		}}>
			{children}
		</FilterContext.Provider>
	);
};

export const useFilter = () => useContext(FilterContext);
