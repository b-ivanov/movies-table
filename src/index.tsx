import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import './index.css';
import moviesJSON from './movies.json';
import MovieRecord from './inerfaces/MovieRecord';
import TableFrame from './components/TableFrame';
import AppUtils from './app-utils';

const initialState = {
  moviesDB: moviesJSON,
  sortByColumn: "title",
  currentPage: 1,
  recordsPerPage: 20
};

const reducer = (state:any = initialState, action:any) => {
	switch (action.type) {
		case "SORT_TABLE":
			if (action.sortByColumn) {
				const newSortColumn:string = action.sortByColumn;
				let newSort:MovieRecord[] = state.moviesDB;
				let isString:boolean = (AppUtils.getPropertyType(newSortColumn) === "string" ? true : false);
				newSort.sort(AppUtils.dynamicSort(newSortColumn, isString));
				return {
					moviesDB: newSort,
					sortByColumn: newSortColumn,
					currentPage: state.currentPage,
					recordsPerPage: state.recordsPerPage
				};
			}
			break;
		case "FILTER_TABLE":
			if (action.filterObject) {
				const filter:any = AppUtils.dynamicFilter(action.filterObject);
				const filteredDB:MovieRecord[] = moviesJSON.filter(filter);
				let isString:boolean = (AppUtils.getPropertyType(state.sortByColumn) === "string" ? true : false);
				filteredDB.sort(AppUtils.dynamicSort(state.sortByColumn, isString));
				return {
					moviesDB: filteredDB,
					sortByColumn: state.sortByColumn,
					currentPage: 1,
					recordsPerPage: state.recordsPerPage
				};
			}
			break;
		case "CLEAR_FILTER_TABLE":
			return {
				moviesDB: moviesJSON,
				sortByColumn: state.sortByColumn,
				currentPage: state.currentPage,
				recordsPerPage: state.recordsPerPage
			};
		case "CHANGE_PAGE":
			if (action.newPageNum) {
				return {
					moviesDB: moviesJSON,
					sortByColumn: state.sortByColumn,
					currentPage: action.newPageNum,
					recordsPerPage: state.recordsPerPage
				};
			}
			break;
		default:
			return state;
	}
	return state;
}

const store = createStore(reducer);
store.dispatch({
	type: "SORT_TABLE",
	sortByColumn: initialState.sortByColumn
});

const App = () => (
	<Provider store={store}>
		<TableFrame />
	</Provider>
);

ReactDOM.render(<App />, document.getElementById("moviesTable"));