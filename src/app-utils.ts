const AppUtils:any = {
	mapStateToProps: (state:any) => ({
		moviesDB: state.moviesDB,
		sortByColumn: state.sortByColumn
	}),
	
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
	}
};

export default AppUtils;