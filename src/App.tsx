import React from 'react';
import './App.css';
import moviesDB from './movies.json';
import TableFrame from './TableFrame';

function App() {

	return (
		<TableFrame moviesList={moviesDB}/>
	);
}

export default App;
