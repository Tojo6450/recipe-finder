import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import * as api from '../api/mealdb';

import LoadingSpinner from '../components/common/LoadingSpinner.jsx';
import ErrorMessage from '../components/common/ErrorMessage.jsx';
import SuggestionRow from '../components/recipe/SuggestionRow.jsx';
import { useFetch } from '../hooks/useFetch.js';

const getIngredients = (recipe) => {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    if (ingredient && ingredient.trim() !== "") {
      ingredients.push(`${measure} ${ingredient}`);
    }
  }
  return ingredients;
};

function RecipeDetailPage() {
  const { id } = useParams();

  const { data: recipe, loading, error } = useFetch(api.getRecipeById, [id]);

  
  const { data: areaRecipes, exec: fetchAreaRecipes } = useFetch(
    api.getRecipesByArea, [], true
  );

  const { data: categoryRecipes, exec: fetchCategoryRecipes } = useFetch(
    api.getRecipesByCategory, [], true
  );

  useEffect(() => {
    if (recipe) {
      if (recipe.strArea) {
        fetchAreaRecipes([recipe.strArea]);
      }
      if (recipe.strCategory) {
        fetchCategoryRecipes([recipe.strCategory]);
      }
    }
  }, [recipe, fetchAreaRecipes, fetchCategoryRecipes]);

  if (loading) return <LoadingSpinner />;
  if (error || !recipe) return <ErrorMessage message="Could not find that recipe." />;

  const ingredients = getIngredients(recipe);
  const instructions = recipe.strInstructions.split('\n').filter(p => p.trim() !== "");

  const filterCurrent = (list) => list ? list.filter(r => r.idMeal !== recipe.idMeal) : [];

  return (
    <article className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-purple-50 py-8 sm:py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-semibold mb-6 transition-colors group"
        >
          <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Search
        </Link>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-orange-500 via-red-500 to-purple-600 p-8 sm:p-10">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-4 drop-shadow-lg">
              {recipe.strMeal}
            </h1>
            <div className="flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full font-semibold shadow-lg">
                <span className="text-xl">🌍</span>
                {recipe.strArea}
              </span>
              <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full font-semibold shadow-lg">
                <span className="text-xl">🍽️</span>
                {recipe.strCategory}
              </span>
              {recipe.strTags && (
                <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full font-semibold shadow-lg">
                  <span className="text-xl">🏷️</span>
                  {recipe.strTags.split(',').join(', ')}
                </span>
              )}
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6 sm:p-10">
            {/* Left Column (Image & Ingredients) */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-purple-500 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
                  <img
                    src={recipe.strMealThumb}
                    alt={recipe.strMeal}
                    className="relative w-full rounded-2xl shadow-2xl transform group-hover:scale-[1.02] transition-transform duration-300"
                  />
                </div>
                
                <div className="mt-8 bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border-2 border-green-200 shadow-lg">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <span className="text-3xl">🥕</span>
                    Ingredients
                  </h2>
                  <ul className="space-y-3">
                    {ingredients.map((ing, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-700">
                        <span className="flex-shrink-0 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                          {i + 1}
                        </span>
                        <span className="font-medium">{ing}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Right Column (Instructions) */}
            <div className="lg:col-span-2">
              <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 sm:p-8 rounded-2xl border-2 border-orange-200 shadow-lg">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                  <span className="text-4xl">👨‍🍳</span>
                  Instructions
                </h2>
                <div className="space-y-5">
                  {instructions.map((step, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-xl flex items-center justify-center font-bold text-lg shadow-md">
                        {i + 1}
                      </div>
                      <p className="flex-1 text-gray-800 leading-relaxed pt-2 text-lg">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Suggestion Rows */}
        <div className="mt-12">
          <SuggestionRow 
            title={`More ${recipe.strArea} Dishes`} 
            recipes={filterCurrent(areaRecipes)} 
          />
          <SuggestionRow 
            title={`More from ${recipe.strCategory}`}
            recipes={filterCurrent(categoryRecipes)} 
          />
        </div>
      </div>
    </article>
  );
}

export default RecipeDetailPage;