import React from 'react';


class TableHeaderCell extends React.Component {
	headerName:string;
	isSortColumn:boolean;
	
	constructor (props:any) {
		super(props)

		this.headerName = props.headerName;
		this.isSortColumn = props.isSortColumn;
	};

	toggleSorting () {
		console.log(this.headerName, this.isSortColumn);
		// sort(this.headerName);
	};

	render () {
		const cls:string = (this.isSortColumn ? "selectedForSort" : "");
		return <th key={this.headerName} className={cls} onClick={(event: any) => {
			this.toggleSorting()
		  }}>{this.headerName.replace("imdb_", "IMDB ")}</th>;
	};
}

export default TableHeaderCell;