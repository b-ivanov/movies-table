/* eslint-disable no-new-func */
import FilterObject from './inerfaces/FilterObject'
import FilterNumberProperty from './inerfaces/FilterNumberProperty'
import FilterStringProperty from './inerfaces/FilterStringProperty'

const AppUtils:any = {
	mapStateToProps: (state:any) => ({
		moviesDB: state.moviesDB,
		sortByColumn: state.sortByColumn,
		currentPage: state.currentPage,
		recordsPerPage: state.recordsPerPage,
		showForm: state.showForm,
		recordIndexForEdit: state.recordIndexForEdit
	}),

	prettifyHeaderName: (uglyName:string) => {
		let prettyName:string = uglyName;
		if (uglyName === "id") {
			prettyName = "#";
		}
		if (uglyName.indexOf("imdb_") > -1) {
			prettyName = uglyName.replace("imdb_", "IMDB ");
		}
		return prettyName;
	},

	getPropertyType: (property:string) => {
		if (property.match(/title|director|distributor/gim)) {
			return "string";
		} else {
			return "number";
		}
	},
	
	dynamicSort: (property:string, isStringCompare:boolean) => {
		if (property) {
			let sortOrder:number = 1;
			if (property[0] === "-") {
				sortOrder = -1;
				property = property.substr(1);
			}
			return (object1:any,object2:any) => {
				let result:number = 0;
				let compare1:number = (isStringCompare ? object1[property].toString().toUpperCase() : object1[property]);
				let compare2:number = (isStringCompare ? object2[property].toString().toUpperCase() : object2[property]);
				//(a[property].toUpperCase() < b[property].toUpperCase()) ? -1 : (a[property].toUpperCase() > b[property].toUpperCase()) ? 1 : 0;
				if (compare1 < compare2) {
					result = -1;
				} else if (compare1 > compare2) {
					result = 1;
				} else {
					result = 0;
				}
				return result * sortOrder;
			}
		} else {
			return 0;
		}
	},

	dynamicFilter: (filters:FilterObject|any) => {
		let functionBody:string[] = [];
		let element:FilterNumberProperty|FilterStringProperty;
		for (const key in filters) {
			if (Object.prototype.hasOwnProperty.call(filters, key)) {
				element = filters[key];
				if (element.type === "number" && typeof element.val === "number") {
					if (key.indexOf("max") >= 0) {
						functionBody.push("movie." + element.property + " <= " + element.val);
					} else {
						functionBody.push("movie." + element.property + " >= " + element.val);
					}
				}
				if (element.type === "string" && element.val) {
					functionBody.push("movie." + element.property + ".toString().toLowerCase().indexOf('" + element.val.toString().toLowerCase() + "') >= 0");
				}
			}
		}
		if (functionBody.length === 0) {
			functionBody = ["true"]
		}
		const filterFunction:any = new Function("movie", "return " + functionBody.join(" && ") + ";");
		return filterFunction;
	},

	getIndexOfRecord: (collection:any[], key:string, val:any) => {
		for (let index = 0; index < collection.length; index++) {
			if (collection[index][key] === val) {
				return index;
			}
		}
		return -1;
	}
};

export default AppUtils;