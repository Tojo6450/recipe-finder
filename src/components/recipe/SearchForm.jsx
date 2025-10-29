import React, { useState, useEffect } from 'react';

// Mock API functions for demo
const getCategories = async () => [
  { strCategory: 'Beef' },
  { strCategory: 'Chicken' },
  { strCategory: 'Dessert' },
  { strCategory: 'Lamb' },
  { strCategory: 'Pasta' },
  { strCategory: 'Seafood' },
  { strCategory: 'Vegetarian' }
];

const getAreas = async () => [
  { strArea: 'American' },
  { strArea: 'British' },
  { strArea: 'Chinese' },
  { strArea: 'French' },
  { strArea: 'Indian' },
  { strArea: 'Italian' },
  { strArea: 'Japanese' },
  { strArea: 'Mexican' }
];

function SearchForm({ setFilter = () => {}, handleRandom = () => {} }) {
  const [term, setTerm] = useState('');
  const [categories, setCategories] = useState([]);
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    const fetchFilters = async () => {
      const cats = await getCategories();
      const ars = await getAreas();
      setCategories(cats || []);
      setAreas(ars || []);
    };
    fetchFilters();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFilter({ type: 'ingredient', value: term });
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    if (value === '') {
      setFilter({ type: 'ingredient', value: term });
    } else {
      setFilter({ type: name, value: value });
    }
  };

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl shadow-xl mb-8 border border-gray-100">
      {/* Random Recipe Button Section */}
      <div className="text-center mb-8">
        <button
          onClick={handleRandom}
          className="group relative w-full md:w-auto bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-lg"
        >
          <span className="flex items-center justify-center gap-3">
            <span className="text-2xl group-hover:rotate-180 transition-transform duration-500">🎲</span>
            <span className="text-lg">I'm Feeling Lucky</span>
          </span>
        </button>
        <p className="text-gray-600 mt-3 text-sm font-medium">
          Perfect for when Taylor can't decide! ✨
        </p>
      </div>

      <div className="relative mb-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="bg-gradient-to-br from-white to-gray-50 px-4 text-sm text-gray-500 font-medium">
            or search manually
          </span>
        </div>
      </div>

      {/* Main Search Section */}
      <div className="mb-6">
        <label htmlFor="search" className="block text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
          <span className="text-2xl">🔍</span>
          Search by Main Ingredient
        </label>
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-grow">
            <input
              type="text"
              id="search"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSubmit(e);
                }
              }}
              placeholder="e.g., Chicken, Salmon, or Beef"
              className="w-full p-4 pl-5 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all duration-200 text-gray-700 placeholder-gray-400 shadow-sm hover:border-gray-300"
            />
          </div>
          <button
            onClick={handleSubmit}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl whitespace-nowrap"
          >
            Search Recipes
          </button>
        </div>
      </div>

      {/* Filter Dropdowns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="group">
          <label htmlFor="category" className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
            <span className="text-lg">🍽️</span>
            Filter by Category
          </label>
          <div className="relative">
            <select
              id="category"
              name="category"
              onChange={handleFilterChange}
              className="appearance-none w-full p-4 pr-10 bg-white border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all duration-200 text-gray-700 cursor-pointer hover:border-gray-300 font-medium"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.strCategory} value={cat.strCategory}>
                  {cat.strCategory}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
              <svg className="fill-current h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="group">
          <label htmlFor="area" className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
            <span className="text-lg">🌍</span>
            Filter by Cuisine
          </label>
          <div className="relative">
            <select
              id="area"
              name="area"
              onChange={handleFilterChange}
              className="appearance-none w-full p-4 pr-10 bg-white border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all duration-200 text-gray-700 cursor-pointer hover:border-gray-300 font-medium"
            >
              <option value="">All Cuisines</option>
              {areas.map((area) => (
                <option key={area.strArea} value={area.strArea}>
                  {area.strArea}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
              <svg className="fill-current h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchForm;