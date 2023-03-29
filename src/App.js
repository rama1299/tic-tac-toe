import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Provider } from 'react-redux';
import store from './redux';
import { useEffect } from 'react';
import './App.css'

// import "./App.css"

function Board() {
  const dispatch = useDispatch();
  const squares = useSelector((state) => state.squares);
  const status = useSelector((state) => state.status);
  
  useEffect(() => {
    const winner = calculateWinner(squares);
    const nextValue = calculateNextValue(squares);
    const status = calculateStatus(winner, squares, nextValue);
    dispatch({ type: 'SET_STATUS', payload: { status } });
  }, [dispatch, squares]);

  function selectSquare(index) {
    const nextValue = calculateNextValue(squares);
    dispatch({ type: 'SELECT_SQUARE', payload: { index, nextValue } });
  }

  function restart() {
    dispatch({ type: 'RESTART' });
  }

  function renderSquare(i) {
    return (
      <button className="square bg-white hover:bg-gray-100 text-indigo-900 font-bold py-2 px-4 border border-gray-400 rounded shadow text-5xl mr-1 ml-1" onClick={() => squares[i] === null && selectSquare(i)}>
        {squares[i]}
      </button>
    );
  }

  return (
    <div className='text-center mt-20'>
      <p className='status text-2xl mb-3'>{status}</p>
      <div className='m-auto box-content contain'>
      <div className='box mb-2 mt-2'>
         {renderSquare(0)}
         {renderSquare(1)} 
         {renderSquare(2)} 
      </div>
      <div className='box mb-2 mt-2'>
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div >
      <div className='box mb-2 mt-2'>
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      </div>
      <button className='bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded mt-2' onClick={restart}>Restart</button>
    </div>
  );
}

function Game() {
  return (
    <div >
      <div >
        <Board />
      </div>
    </div>
  );
}

// eslint-disable-next-line no-unused-vars
function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: Player ${winner}`
    : squares.every(Boolean)
      ? `Scratch: Cat's game`
      : `Next Player: ${nextValue}`;
}

// eslint-disable-next-line no-unused-vars
function calculateNextValue(squares) {
  return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O';
}

// eslint-disable-next-line no-unused-vars
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}


function App() {
  return (
    <Provider store={store}>
      <Game />
    </Provider>
  );
}

export default App