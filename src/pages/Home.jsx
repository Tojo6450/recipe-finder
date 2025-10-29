import React, { useState, useRef } from 'react'; // --- ADDED 'useRef' ---
import { useNavigate } from 'react-router-dom';
import * as api from '../api/mealdb';

import { useLocalStorage } from '../hooks/useLocalStorage.js';

import SearchForm from '../components/recipe/SearchForm.jsx';
import RecipeList from '../components/recipe/RecipeList.jsx';
import LoadingSpinner from '../components/common/LoadingSpinner.jsx';
import ErrorMessage from '../components/common/ErrorMessage.jsx';
import MyPantry from '../components/recipe/MyPantry.jsx';

const getIngredientsString = (recipe) => {
  let ingredients = '';
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    if (ingredient && ingredient.trim() !== "") {
      ingredients += ingredient.toLowerCase() + " ";
    }
  }
  return ingredients;
};

function HomePage() {
  const [recipes, setRecipes] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTitle, setSearchTitle] = useState('');
  const navigate = useNavigate();

  const [pantry, setPantry] = useLocalStorage('recipePantry', []);
  
  // --- ADDED: Create a ref for the results section ---
  const resultsRef = useRef(null);

  const handleSearch = async (filter) => {
    // --- ADDED: Scroll to results on click ---
    resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
    
    setLoading(true);
    setError(null);
    setRecipes(null);
    setSearchTitle(`Results for "${filter.value}"`);

    try {
      let results;
      const { type, value, others } = filter;
      switch (type) {
        case 'ingredient':
          results = await api.getRecipesByIngredient(value);
          break;
        case 'category':
          results = await api.getRecipesByCategory(value);
          break;
        case 'area':
          results = await api.getRecipesByArea(value);
          break;
        default:
          results = await api.getRecipesByName(value);
      }

      if (!results) {
        setError(`No recipes found for "${value}". Try another search!`);
        setLoading(false);
        return;
      }

      const otherList = (others && others.trim() !== "") 
        ? others.toLowerCase().split(',').map(s => s.trim()).filter(Boolean)
        : [];

      if (otherList.length > 0) {
        setSearchTitle(`Results for "${value}" with "${others}"`);
        const detailPromises = results.map(r => api.getRecipeById(r.idMeal));
        const detailedRecipes = await Promise.all(detailPromises);
        const finalResults = detailedRecipes.filter(recipe => {
          if (!recipe) return false;
          const recipeIngredients = getIngredientsString(recipe);
          return otherList.every(otherIng => 
            recipeIngredients.includes(otherIng)
          );
        });

        if (finalResults.length === 0) {
          setError(`No recipes found for "${value}" that also have "${others}".`);
        } else {
          setRecipes(finalResults);
        }
      } else {
        setRecipes(results);
      }
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError("An error occurred while fetching recipes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handlePantrySearch = async () => {
    if (pantry.length === 0) {
      setError("Add some items to your pantry first!");
      return;
    }
    
    // --- ADDED: Scroll to results on click ---
    resultsRef.current?.scrollIntoView({ behavior: 'smooth' });

    setLoading(true);
    setError(null);
    setRecipes(null);
    setSearchTitle(`Recipes using items from your pantry`);

    try {
      const searchPromises = pantry.map(item => api.getRecipesByIngredient(item));
      const results = await Promise.allSettled(searchPromises);
      let allRecipes = [];
      results.forEach(result => {
        if (result.status === 'fulfilled' && result.value) {
          allRecipes.push(...result.value);
        }
      });
      const uniqueRecipes = [];
      const seenIds = new Set();
      for (const recipe of allRecipes) {
        if (!seenIds.has(recipe.idMeal)) {
          uniqueRecipes.push(recipe);
          seenIds.add(recipe.idMeal);
        }
      }
      if (uniqueRecipes.length === 0) {
        setError("No recipes found using any of your pantry items.");
      } else {
        setRecipes(uniqueRecipes);
      }
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError("An error occurred while searching your pantry.");
    } finally {
      setLoading(false);
    }
  };

  const handleRandom = async () => {
    // --- ADDED: Scroll to results on click ---
    resultsRef.current?.scrollIntoView({ behavior: 'smooth' });

    setLoading(true);
    setError(null);
    setRecipes(null);
    try {
      const recipe = await api.getRandomRecipe();
      if (recipe && recipe.idMeal) {
        navigate(`/recipe/${recipe.idMeal}`);
      } else {
        throw new Error();
      }
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError("Could not fetch a random recipe. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-299 from-orange-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        
        {/* Header Section */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-block mb-4">
            <span className="text-6xl sm:text-7xl lg:text-8xl">🍳</span>
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-4">
            <span className="bg-gradient-to-r from-orange-500 via-red-500 to-purple-600 bg-clip-text text-transparent">
              Recipe Finder
            </span>
          </h1>
          <p className="text-gray-600 text-lg sm:text-xl max-w-2xl mx-auto font-medium">
            Discover delicious recipes from your pantry or explore thousands of dishes
          </p>
        </div>

        {/* Pantry Section - Card Style */}
        <div className="mb-8 sm:mb-10">
          <MyPantry pantry={pantry} setPantry={setPantry} />
        </div>
        
        {/* Pantry Search Button - Enhanced */}
        <button
          onClick={handlePantrySearch}
          disabled={pantry.length === 0}
          className="w-full group relative overflow-hidden bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-700 
                       hover:from-purple-700 hover:via-purple-800 hover:to-indigo-800
                       text-white font-bold py-5 sm:py-6 px-8 rounded-2xl shadow-2xl hover:shadow-purple-500/50
                       transform hover:scale-[1.02] transition-all duration-300 ease-out
                       disabled:from-gray-300 disabled:via-gray-300 disabled:to-gray-400 
                       disabled:cursor-not-allowed disabled:shadow-none disabled:transform-none
                       focus:outline-none focus:ring-4 focus:ring-purple-300 mb-12"
        >
          <span className="relative z-10 flex items-center justify-center gap-3 text-lg sm:text-xl">
            <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Find Recipes From My Pantry
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 
                          transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        </button>

        {/* Divider - Elegant Style */}
        <div className="relative my-12 sm:my-14">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t-2 border-gray-200"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="px-8 py-3 bg-gradient-to-r from-orange-500 to-purple-600 text-white text-sm font-bold tracking-wider rounded-full shadow-lg">
              OR SEARCH BY
            </span>
          </div>
        </div>

        {/* Search Form - Card Style */}
        <div className="mb-12">
          <SearchForm 
            setFilter={handleSearch} 
            handleRandom={handleRandom} 
          />
        </div>

        {/* --- ADDED: Attach the ref to this wrapper div --- */}
        <div ref={resultsRef}>
          {/* Loading State - Enhanced */}
          {loading && (
            <div className="py-20 sm:py-24">
              <LoadingSpinner />
            </div>
          )}
          
          {/* Error State - Enhanced */}
          {error && (
            <div className="my-8">
              <ErrorMessage message={error} />
            </div>
          )}
          
          {/* Results Section - Enhanced */}
          {recipes && (
            <section className="mt-12 sm:mt-16">
              <div className="relative bg-gradient-to-r from-orange-500 via-red-500 to-purple-600 rounded-3xl p-8 sm:p-10 mb-10 shadow-2xl overflow-hidden">
                <div className="absolute inset-0 bg-black/5"></div>
                <div className="relative z-10">
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-3 drop-shadow-lg">
                    {searchTitle}
                  </h2>
                  <div className="flex items-center gap-3 text-white/95">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full px-5 py-2.5 flex items-center gap-2 shadow-lg">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                        <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/>
                      </svg>
                      <span className="text-xl font-bold">
                        {recipes.length}
                      </span>
                      <span className="text-lg font-semibold">
                        {recipes.length === 1 ? 'Recipe' : 'Recipes'} Found
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <RecipeList recipes={recipes} />
            </section>
          )}
        </div> {/* End of ref wrapper */}
      </div>
    </div>
  );
}

export default HomePage;