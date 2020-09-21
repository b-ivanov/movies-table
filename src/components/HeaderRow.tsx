import React from 'react';
import {connect} from 'react-redux';
import AppUtils from '../app-utils';
import FilterObject from '../inerfaces/FilterObject';

class HeaderRow extends React.Component {
	toggleSort (columnName:string) {
		const props:any = this.props;
		if (props.sortByColumn === columnName) {
			columnName = "-" + columnName;
		}
		props.dispatch({
			type: "SORT_TABLE",
			sortByColumn: columnName
		});
	};

	toggleFilter (event:any) {
		const tableRowInputs:{}[] = event.target.parentNode.parentNode.querySelectorAll("input");
		const props:any = this.props;
		let filterObject:FilterObject|any = {};
		let element:any;
		let type:string, property:string, val:string|number;
		for (const key in tableRowInputs) {
			if (Object.prototype.hasOwnProperty.call(tableRowInputs, key)) {
				element = tableRowInputs[key];
				type = (element.type === "number" ? "number" : "string");
				val = element.value;
				if (type === "number" && element.value !== "") {
					val = parseFloat(element.value)
				}
				property = element.name.replace("_min", "").replace("_max", "");
				filterObject[element.name] = { type, val, property };
			}
		}
		props.dispatch({ 
			type: "FILTER_TABLE",
			filterObject
		});
	};

	filterInput (property:string) {
		const isText:boolean = (AppUtils.getPropertyType(property) === "string");
		if (isText) {
			return <input placeholder="name" className="textFilter" name={property} type="text" onChange={(event:any) => {this.toggleFilter(event)}}/>
		} else {
			return (<>
				<input placeholder="min" className="numberFilter" name={property + "_min"} type="number" min="0" onChange={(event:any) => {this.toggleFilter(event)}}/>
				-
				<input placeholder="max" className="numberFilter" name={property + "_max"} type="number" min="0" onChange={(event:any) => {this.toggleFilter(event)}}/>
			</>)
		}
	};

	render () {
		const props:any = this.props;
		let fields:string[] = ["id", "title", "director", "distributor", "imdb_rating", "imdb_votes"];
		if (props.moviesDB[0]) {
			fields = Object.keys(props.moviesDB[0]);
		}
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
						return (<th key={name} id={name} className={cls}>
							<div onClick={(event:any) => {this.toggleSort(event.target.parentNode.id)}}>{AppUtils.prettifyHeaderName(name)}</div>
							{this.filterInput(name)}
						</th>)
					})
				}
			</tr>
		);
	}
};

export default connect(AppUtils.mapStateToProps)(HeaderRow);