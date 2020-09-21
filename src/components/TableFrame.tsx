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

	claearFilters () {
		const tableRowInputs:any = document.body.querySelectorAll("input");
		for (const key in tableRowInputs) {
			if (Object.prototype.hasOwnProperty.call(tableRowInputs, key)) {
				tableRowInputs[key].value = "";
			}
		}
		const props:any = this.props;
		props.dispatch({ 
			type: "CLEAR_FILTER_TABLE"
		});
	};

	render () {
		const props:any = this.props;
		return (
			<>
				<button onClick={() => {this.claearFilters()}}>Clear filters</button>
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