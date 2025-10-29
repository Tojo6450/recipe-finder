
import React from 'react';
import { Link } from 'react-router-dom';

function RecipeCard({ recipe }) {
  return (
    <Link 
      to={`/recipe/${recipe.idMeal}`} 
      className="block bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl"
    >
      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        className="w-full h-48 object-cover" 
      />
      
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-800 truncate" title={recipe.strMeal}>
          {recipe.strMeal}
        </h3>
      </div>
    </Link>
  );
}

export default RecipeCard;