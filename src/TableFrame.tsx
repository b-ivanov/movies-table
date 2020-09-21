import React from 'react';
import {connect} from 'react-redux';
import MovieRecord from './interfaces'
import TableRow from './TableRow';
import HeaderRow from './HeaderRow';
import AppUtils from './app-utils';

class TableFrame extends React.Component {
	render () {
		const props:any = this.props;
		if (props.moviesDB.length === 0) {
			return <div>No records to show!</div>;
		} else {
			return (
				<>
					<table className="tableFrame">
						<thead>
							<HeaderRow />
						</thead>
						<tbody>
						{
							props.moviesDB.map((record: MovieRecord) => {
								return <TableRow key={'id_' + record.id} movie={record} />
							})
						}
						</tbody>
					</table>
					<div>Number of records: {props.moviesDB.length}</div>
				</>
			);
		}
	}
};

export default connect(AppUtils.mapStateToProps)(TableFrame);