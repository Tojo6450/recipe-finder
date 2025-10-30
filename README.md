# 🍽️ Recipe Finder

This project is a solution to the "Recipe Ideas" take-home challenge. It's a dynamic web application built for the user persona **Taylor, a busy professional** who needs help deciding what to cook.

The app allows Taylor to find recipes based on what's in their pantry, search by specific categories, or get a random suggestion when they can't decide.

## ✨ Features

* **Persistent Pantry:** Add ingredients you have to a "My Pantry" list. This list is saved in your browser's `localStorage`, so it's still there even after you refresh the page!
* **Pantry-Based Search:** Find recipes that use *any* of the ingredients from your pantry (an "OR" search).
* **Advanced Search:** Search for recipes by:
    * Recipe Name
    * Main Ingredient
    * Category (e.g., "Seafood", "Vegetarian")
    * Cuisine/Area (e.g., "Italian", "Thai")
* **Surprise Me:** A "Random Recipe" button for when Taylor doesn't want to make a decision.
* **Dynamic UI:** The app provides clear loading spinners during API calls and user-friendly error messages.
* **Auto-Scrolling:** When you start a search, the page automatically scrolls down to the results area.
* **Responsive Design:** The UI is built with Tailwind CSS and works great on both desktop and mobile devices.

## 🏗️ Architecture & Tech Stack

This project is a single-page application (SPA) built with a modern frontend stack. All logic is contained within the `Home.jsx` component.

* **Framework:** **React**
* **Styling:** **Tailwind CSS**
* **State Management:**
    * React's built-in hooks (`useState`, `useRef`, `useEffect`).
    * A custom `useLocalStorage` hook to create a persistent, reactive state for the user's pantry.
* **Data Fetching:** Native `fetch` API to interact with **TheMealDB public API**.
* **Icons:** **Lucide-React**

### Component & Data Flow

```mermaid
graph TD
    subgraph "User Interaction"
        direction TB
        A[User] -- (adds/removes) --> B[MyPantry.jsx]
        A -- (types in) --> B
        A -- (clicks) --> C[SearchForm.jsx]
        A -- (types in) --> C
        A -- (clicks) --> D[Random Button]
    end

    subgraph "React Application (Home.jsx)"
        direction TB
        Main[Home.jsx State]
        
        B -- (updates pantry) --> Main
        C -- (triggers search) --> Main
        D -- (triggers random) --> Main
        
        Main -- (uses) --> E[useLocalStorage.js]
        Main -- (renders) --> F[Results Section]
        Main -- (renders) --> B
        Main -- (renders) --> C
        
        F --> G[LoadingSpinner]
        F --> H[ErrorMessage]
        F --> I[RecipeList.jsx]
        I --> J[RecipeCard.jsx]
    end

    subgraph "External Data"
        direction TB
        K[(Browser LocalStorage)]
        L[("TheMealDB API")]
        
        E <--> K
        Main -- (fetches data) --> L
    end