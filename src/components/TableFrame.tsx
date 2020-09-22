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
		} else {
			return "";
		}
	};

	incrementPage (maxPages:number) {
		const props:any = this.props;
		const nextPage:number = props.currentPage + 1;
		if (nextPage <= maxPages) {
			props.dispatch({
				type: "CHANGE_PAGE",
				newPageNum: nextPage
			});
		}
	};

	decrementPage () {
		const props:any = this.props;
		const prevPage:number = props.currentPage - 1;
		if (prevPage > 0) {
			props.dispatch({
				type: "CHANGE_PAGE",
				newPageNum: prevPage
			});
		}
	};

	render () {
		const props:any = this.props;
		const numOfRecords:number = props.moviesDB.length;
		const numOfPages:number = Math.ceil(numOfRecords / props.recordsPerPage);
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
				<div>
					<div className="numOfRecordsHolder">Number of records: {numOfRecords}</div>
					<div className="pageNavigation">
						<button onClick={() => {this.decrementPage()}}>Previous</button>
						<span>Page {props.currentPage} of {numOfPages}</span>
						<button onClick={() => {this.incrementPage(numOfPages)}}>Next</button>
					</div>
				</div>
			</>
		);
	}
};

export default connect(AppUtils.mapStateToProps)(TableFrame);