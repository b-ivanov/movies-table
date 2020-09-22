import React from 'react';
import {connect} from 'react-redux';
import AppUtils from '../app-utils';
import MovieRecord from '../inerfaces/MovieRecord'

class TableRows extends React.Component {
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
					<td className="recordActions">Buttons here</td>
				</tr>
			} else {
				return false;
			}
		});
	}
};

export default connect(AppUtils.mapStateToProps)(TableRows);