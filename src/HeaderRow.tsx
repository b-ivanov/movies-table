import React from 'react';
import {connect} from 'react-redux';
import AppUtils from './app-utils';

class HeaderRow extends React.Component {
	toggleSorting (columnName:string) {
		const props:any = this.props;
		if (props.sortByColumn === columnName) {
			columnName = "-" + columnName;
		}
		props.dispatch({
			type: "SORT_TABLE",
			sortByColumn: columnName
		});
	};

	render () {
		const props:any = this.props;
		const fields:any = Object.keys(props.moviesDB[0]);
		let cls:string;
		let clsName:string;
		let columnForSort:string = props.sortByColumn;
		return (
			<tr>
				{
					fields.map((name:string) => {
						clsName = "selectedForSortAZ";
						if (columnForSort[0] === "-") {
							clsName = "selectedForSortZA";
						}
						cls = (columnForSort.replace("-", "") === name ? clsName : "");
						return <th key={name} id={name} className={cls} onClick={(event: any) => {
							this.toggleSorting(event.target.id)
						}}>{name.replace("imdb_", "IMDB ")}</th>;
					})
				}
			</tr>
		);
	}
};

export default connect(AppUtils.mapStateToProps)(HeaderRow);