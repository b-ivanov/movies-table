import React from 'react';
import {connect} from 'react-redux';
import TableRows from './TableRows';
import HeaderRow from './HeaderRow';
import AppUtils from '../app-utils';

/**The TableFrame component renders the outer shell of the table */
class TableFrame extends React.Component {
	/**Calls dispatch for navigating to the next page */
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

	/**Calls dispatch for navigating to the previoous page */
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

	/**Calls render of TableRow if there are record */
	tableBodyContent () {
		const props:any = this.props;
		if (props.moviesDB.length !== 0) {
			return <TableRows />
		} else {
			return "";
		}
	};

	/**Component render function */
	render () {
		const props:any = this.props;
		const numOfRecords:number = props.moviesDB.length;
		const numOfPages:number = Math.ceil(numOfRecords / props.recordsPerPage);
		return (
			<>
				<h1>My movie database</h1>
				<table className="tableFrame">
					<thead>
						<HeaderRow />
					</thead>
					<tbody>
						{ this.tableBodyContent() }
					</tbody>
				</table>
				<div className="footer">
					<div className="numOfRecordsHolder">Number of records: {numOfRecords}</div>
					<div className="pageNavigation">
						<button className="uiBtn" onClick={() => {this.decrementPage()}}>Previous</button>
						<span>Page {props.currentPage} of {numOfPages}</span>
						<button className="uiBtn" onClick={() => {this.incrementPage(numOfPages)}}>Next</button>
					</div>
				</div>
			</>
		);
	}
};

export default connect(AppUtils.mapStateToProps)(TableFrame);