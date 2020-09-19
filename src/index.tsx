import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import './App.css';
import moviesJSON from './movies.json';
import TableFrame from './TableFrame';

const initialState = {
  moviesDB: moviesJSON
};

const reducer = (state:any = initialState, action:any) => {
	return state;
}

const store = createStore(reducer);

const App = () => (
	<Provider store={store}>
		<TableFrame />
	</Provider>
);

ReactDOM.render(<App />, document.getElementById("moviesTable"));