
const API_BASE_URL = "https://www.themealdb.com/api/json/v1/1/";

/**
 * A reusable fetch function to handle API requests.
 */
const fetchData = async (endpoint) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    if (!response.ok) {
      throw new Error(`Network response was not ok`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return null; // Return null on error
  }
};

/**
 * Fetches recipes by a single main ingredient.
 */
export const getRecipesByIngredient = async (ingredient) => {
  const data = await fetchData(`filter.php?i=${ingredient}`);
  return data ? data.meals : null;
};

/**
 * Fetches the full details for a single recipe by its ID.
 */
export const getRecipeById = async (id) => {
  const data = await fetchData(`lookup.php?i=${id}`);
  return data && data.meals ? data.meals[0] : null;
};

/**
 * Fetches a single random recipe.
 */
export const getRandomRecipe = async () => {
  const data = await fetchData(`random.php`);
  return data && data.meals ? data.meals[0] : null;
};

/**
 * Fetches the list of all available categories.
 */
export const getCategories = async () => {
  const data = await fetchData(`list.php?c=list`);
  return data ? data.meals : null;
};

/**
 * Fetches the list of all available cuisines (Areas).
 */
export const getAreas = async () => {
  const data = await fetchData(`list.php?a=list`);
  return data ? data.meals : null;
};

/**
 * Fetches recipes filtered by a specific category.
 */
export const getRecipesByCategory = async (category) => {
  const data = await fetchData(`filter.php?c=${category}`);
  return data ? data.meals : null;
};

/**
 * Fetches recipes filtered by a specific cuisine (Area).
 */
export const getRecipesByArea = async (area) => {
  const data = await fetchData(`filter.php?a=${area}`);
  return data ? data.meals : null;
};

/**
 * Fetches recipes by their name (for a standard search bar).
 */
export const getRecipesByName = async (name) => {
    const data = await fetchData(`search.php?s=${name}`);
    return data ? data.meals : null;
};