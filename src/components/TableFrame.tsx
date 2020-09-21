import React from 'react';
import {connect} from 'react-redux';
import TableRows from './TableRows';
import HeaderRow from './HeaderRow';
import AppUtils from '../app-utils';

class TableFrame extends React.Component {
	tableBodyContent () {
		const props:any = this.props;
		if (props.moviesDB.length !== 0) {
			return <TableRows />
		}
	};

	render () {
		const props:any = this.props;
		return (
			<>
				<table className="tableFrame">
					<thead>
						<HeaderRow />
					</thead>
					<tbody>
						{ this.tableBodyContent() }
					</tbody>
				</table>
				<div>Number of records: {props.moviesDB.length}</div>
			</>
		);
	}
};

export default connect(AppUtils.mapStateToProps)(TableFrame);