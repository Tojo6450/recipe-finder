
import React from 'react';
import RecipeCard from './RecipeCard.jsx';

function SuggestionRow({ title, recipes }) {
  if (!recipes || recipes.length === 0) {
    return null; 
  }

  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {recipes.map((recipe) => (
          <div key={recipe.idMeal} className="flex-shrink-0 w-64">
            <RecipeCard recipe={recipe} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default SuggestionRow;