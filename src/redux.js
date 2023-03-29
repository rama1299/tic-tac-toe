import { createStore } from 'redux';

const initialGameState = {
  squares: Array(9).fill(null),
  status: "Next Player X"
};

function gameReducer(state = initialGameState, action) {
  switch (action.type) {
    case 'SELECT_SQUARE': {
      const { index, nextValue } = action.payload;
      const squares = [...state.squares];
      squares[index] = nextValue;
      return { ...state, squares };
    }
    case 'SET_STATUS': {
      const { status } = action.payload;
      return { ...state, status };
    }
    case 'RESTART': {
      return initialGameState;
    }
    default:
      return state;
  }
}

const store = createStore(gameReducer);

export default store