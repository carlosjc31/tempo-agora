import { useReducer } from 'react';

const MAX_HISTORY = 10;

const initialState = { history: [] };

function historyReducer(state, action) {
  switch (action.type) {
    case 'ADD_CITY': {
      const city = action.payload.trim();
      const filtered = state.history.filter(
        (c) => c.toLowerCase() !== city.toLowerCase()
      );
      return { history: [city, ...filtered].slice(0, MAX_HISTORY) };
    }
    case 'REMOVE_CITY':
      return {
        history: state.history.filter((c) => c !== action.payload),
      };
    case 'CLEAR_HISTORY':
      return { history: [] };
    default:
      return state;
  }
}

export function useSearchHistory() {
  const [state, dispatch] = useReducer(historyReducer, initialState);

  const addCity = (city) => dispatch({ type: 'ADD_CITY', payload: city });
  const removeCity = (city) => dispatch({ type: 'REMOVE_CITY', payload: city });
  const clearHistory = () => dispatch({ type: 'CLEAR_HISTORY' });

  return { history: state.history, addCity, removeCity, clearHistory };
}
