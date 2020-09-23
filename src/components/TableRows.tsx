import React from 'react';
import {connect} from 'react-redux';
import AppUtils from '../app-utils';
import MovieRecord from '../inerfaces/MovieRecord';

/**The TableRows component renders each row in the table */
class TableRows extends React.Component {
	/**Calls dispatch for deleting a record */
	deleteRecord (movie:MovieRecord) {
		const props:any = this.props;
		const recordIndex:number = AppUtils.getIndexOfRecord(props.moviesDB, "id", movie.id);
		const answer:boolean = window.confirm("You are about to delete record '" + movie.title + "'!");
		if (recordIndex >= 0 && answer) {
			props.dispatch({
				type: "DELETE_RECORD",
				recordIndex: recordIndex
			});
		}
	};

	/**Calls dispatch for displaying the form with a given record */
	editRecord (movieID:number) {
		const props:any = this.props;
		const recordIndex:number = AppUtils.getIndexOfRecord(props.moviesDB, "id", movieID);
		props.dispatch({ 
			type: "TOGGLE_FORM_DISPLAY",
			showForm: true,
			recordIndexForEdit: recordIndex
		});
	};
	
	/**Component render function */
	render () {
		const props:any = this.props;
		const startIndex:number = (props.recordsPerPage * (props.currentPage - 1));
		const endIndex:number = ((props.recordsPerPage * props.currentPage) - 1);
		return props.moviesDB.map((movie:MovieRecord, index:number) => {
			// <td>{movie.id}</td>
			if (index >= startIndex && index <= endIndex) {
				return <tr className="recordRow" key={'id_' + movie.id}>
					<td>{movie.title}</td>
					<td>{movie.director}</td>
					<td>{movie.distributor}</td>
					<td>{movie.imdb_rating}</td>
					<td>{movie.imdb_votes}</td>
					<td className="recordActions">
						<button className="uiBtn orange" onClick={() => {this.editRecord(movie.id)}}>Edit</button>
						<button className="uiBtn red" onClick={() => {this.deleteRecord(movie)}}>Delete</button>
					</td>
				</tr>
			} else {
				return false;
			}
		});
	}
};

export default connect(AppUtils.mapStateToProps)(TableRows);