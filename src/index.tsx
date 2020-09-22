import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import './index.css';
import moviesJSON from './movies.json';
import MovieRecord from './inerfaces/MovieRecord';
import TableFrame from './components/TableFrame';
import NewRecordForm from './components/NewRecordForm';
import AppUtils from './app-utils';

const initialState = {
  moviesDB: moviesJSON,
  sortByColumn: "title",
  currentPage: 1,
  recordsPerPage: 20,
  showForm: false,
  recordIndexForEdit: null
};

let _allRecords:any = moviesJSON;

const reducer = (state:any = initialState, action:any) => {
	switch (action.type) {
		case "SORT_TABLE":
			if (action.sortByColumn) {
				const newSortColumn:string = action.sortByColumn;
				let newSort:MovieRecord[] = state.moviesDB;
				const isString:boolean = (AppUtils.getPropertyType(newSortColumn) === "string" ? true : false);
				newSort.sort(AppUtils.dynamicSort(newSortColumn, isString));
				return {
					moviesDB: newSort,
					sortByColumn: newSortColumn,
					currentPage: state.currentPage,
					recordsPerPage: state.recordsPerPage,
					showForm: state.showForm,
					recordIndexForEdit: null
				};
			}
			break;
		case "FILTER_TABLE":
			if (action.filterObject) {
				const filter:any = AppUtils.dynamicFilter(action.filterObject);
				const filteredDB:MovieRecord[] = _allRecords.filter(filter);
				let isString:boolean = (AppUtils.getPropertyType(state.sortByColumn) === "string" ? true : false);
				filteredDB.sort(AppUtils.dynamicSort(state.sortByColumn, isString));
				return {
					moviesDB: filteredDB,
					sortByColumn: state.sortByColumn,
					currentPage: 1,
					recordsPerPage: state.recordsPerPage,
					showForm: false,
					recordIndexForEdit: null
				};
			}
			break;
		case "CLEAR_FILTER_TABLE":
			return {
				moviesDB: _allRecords,
				sortByColumn: state.sortByColumn,
				currentPage: state.currentPage,
				recordsPerPage: state.recordsPerPage,
				showForm: false,
				recordIndexForEdit: null
			};
		case "CHANGE_PAGE":
			if (action.newPageNum) {
				return {
					moviesDB: state.moviesDB,
					sortByColumn: state.sortByColumn,
					currentPage: action.newPageNum,
					recordsPerPage: state.recordsPerPage,
					showForm: false,
					recordIndexForEdit: null
				};
			}
			break;
		case "TOGGLE_FORM_DISPLAY":
			return {
				moviesDB: state.moviesDB,
				sortByColumn: state.sortByColumn,
				currentPage: state.currentPage,
				recordsPerPage: state.recordsPerPage,
				showForm: action.showForm,
				recordIndexForEdit: action.recordIndexForEdit
			};
		case "RECORD_CREATE":
			if (action.recordUpdate) {
				_allRecords = _allRecords.concat(action.recordUpdate);
				let movies:any = state.moviesDB.concat(action.recordUpdate);
				const isString:boolean = (AppUtils.getPropertyType(state.sortByColumn) === "string" ? true : false);
				movies.sort(AppUtils.dynamicSort(state.sortByColumn, isString));
				return {
					moviesDB: movies,
					sortByColumn: state.sortByColumn,
					currentPage: state.currentPage,
					recordsPerPage: state.recordsPerPage,
					showForm: action.showForm,
					recordIndexForEdit: null
				};
			}
			break;
		case "RECORD_UPDATE":
			if (action.recordUpdate) {
				state.moviesDB[state.recordIndexForEdit] = action.recordUpdate;
				return {
					moviesDB: state.moviesDB,
					sortByColumn: state.sortByColumn,
					currentPage: state.currentPage,
					recordsPerPage: state.recordsPerPage,
					showForm: action.showForm,
					recordIndexForEdit: null
				};
			}
			break;
		case "DELETE_RECORD":
			if (action.recordIndex >= 0) {
				let movies:any[] = state.moviesDB;
				movies = movies.filter((elem, index) => {
					return (action.recordIndex !== index);
				});
				return {
					moviesDB: movies,
					sortByColumn: state.sortByColumn,
					currentPage: state.currentPage,
					recordsPerPage: state.recordsPerPage,
					showForm: false,
					recordIndexForEdit: null
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
		<NewRecordForm />
		<TableFrame />
	</Provider>
);

ReactDOM.render(<App />, document.getElementById("moviesTable"));