import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import './index.css';
import moviesJSON from './movies.json';
import MovieRecord from './interfaces';
import TableFrame from './TableFrame';
import AppUtils from './app-utils';

const initialState = {
  moviesDB: moviesJSON,
  sortByColumn: "id"
};

const reducer = (state:any = initialState, action:any) => {
	switch (action.type) {
		case "SORT_TABLE":
			if (action.sortByColumn) {
				const newSortColumn:string = action.sortByColumn;
				let newSort:MovieRecord[] = state.moviesDB;
				let isString:boolean = (newSortColumn.match(/title|director|distributor/gim) ? true : false);
				newSort.sort(AppUtils.dynamicSort(newSortColumn, isString));
				return {
					moviesDB: newSort,
					sortByColumn: newSortColumn
				};
			}
			break;
		case "FILTER_TABLE":
			console.error("Filtration not active yet!");
			return state;
		default:
			return state;
	}
	return state;
}

const store = createStore(reducer);
const App = () => (
	<Provider store={store}>
		<TableFrame />
	</Provider>
);

ReactDOM.render(<App />, document.getElementById("moviesTable"));