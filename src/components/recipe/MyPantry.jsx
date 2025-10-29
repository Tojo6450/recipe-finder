import React, { useState } from 'react';

export default function MyPantry({ pantry = [], setPantry = () => {} }) {
  const [newItem, setNewItem] = useState('');

  const handleAddItem = (e) => {
    e.preventDefault();
    const formattedItem = newItem.toLowerCase().trim();
    if (formattedItem && !pantry.includes(formattedItem)) {
      setPantry([...pantry, formattedItem]);
      setNewItem('');
    }
  };

  const handleDeleteItem = (itemToDelete) => {
    setPantry(pantry.filter(item => item !== itemToDelete));
  };

  return (
    <div className="bg-gradient-to-br from-white to-green-50 p-8 rounded-2xl shadow-xl mb-8 border border-green-100">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-4xl">🥑</span>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
          My Pantry
        </h2>
      </div>
      
      <p className="text-gray-600 mb-6 text-lg">
        Add ingredients you have. We'll find recipes that use <span className="font-semibold text-green-600">any</span> of them. ✨
      </p>
      
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-grow">
            <input
              type="text"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleAddItem(e);
                }
              }}
              placeholder="e.g., Eggs, Milk, Flour"
              className="w-full p-4 pl-5 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all duration-200 text-gray-700 placeholder-gray-400 shadow-sm hover:border-gray-300"
            />
          </div>
          <button 
            onClick={handleAddItem}
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl whitespace-nowrap"
          >
            <span className="flex items-center justify-center gap-2">
              <span className="text-xl">+</span>
              Add to Pantry
            </span>
          </button>
        </div>
      </div>

      {/* Pantry List */}
      <div className="min-h-[80px]">
        {pantry.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 px-4 border-2 border-dashed border-gray-200 rounded-xl bg-white/50">
            <span className="text-5xl mb-3 opacity-40">🍽️</span>
            <p className="text-gray-400 text-lg font-medium">Your pantry is empty</p>
            <p className="text-gray-400 text-sm mt-1">Start adding ingredients above!</p>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-semibold text-gray-600">
                {pantry.length} {pantry.length === 1 ? 'ingredient' : 'ingredients'} in your pantry
              </p>
              <button
                onClick={() => setPantry([])}
                className="text-xs text-red-500 hover:text-red-700 font-medium transition-colors duration-200 hover:underline"
              >
                Clear all
              </button>
            </div>
            <div className="flex flex-wrap gap-3">
              {pantry.map(item => (
                <div 
                  key={item} 
                  className="group flex items-center bg-gradient-to-r from-white to-green-50 border-2 border-green-200 rounded-full px-5 py-2.5 shadow-sm hover:shadow-md transition-all duration-200 hover:border-green-300"
                >
                  <span className="text-gray-800 capitalize font-medium text-sm">{item}</span>
                  <button 
                    onClick={() => handleDeleteItem(item)}
                    className="ml-3 w-6 h-6 flex items-center justify-center rounded-full bg-red-100 text-red-600 hover:bg-red-500 hover:text-white font-bold text-sm transition-all duration-200 transform group-hover:scale-110"
                    title={`Remove ${item}`}
                    aria-label={`Remove ${item}`}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}