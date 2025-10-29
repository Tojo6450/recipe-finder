
import { useState, useEffect } from 'react';

function getSavedValue(key, initialValue) {
  try {
    const savedValue = localStorage.getItem(key);
    if (savedValue) {
      return JSON.parse(savedValue);
    }
  } catch (error) {
    console.error("Error reading from localStorage", error);
  }
 
  return initialValue;
}

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    return getSavedValue(key, initialValue);
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error saving to localStorage", error);
    }
  }, [key, value]); 

  return [value, setValue];
}