import React from 'react';
import {connect} from 'react-redux';
import MovieRecord from './interfaces'
import TableHeader from './TableHeader';
import TableRow from './TableRow';

class TableFrame extends React.Component {
	render () {
		const props:any = this.props;
		if (props.moviesDB.length === 0) {
			return <div>No records to show!</div>;
		} else {
			const fields:any = Object.keys(props.moviesDB[0]);
			const columnForSort:string = props.sortByColumn;
			let item:{
				name:string,
				isSortColumn:boolean
			};
			return (
				<>
					<table>
						<thead>
							<tr>
								{
									fields.map((name:string) => {
										item = {
											name: name,
											isSortColumn: (name === columnForSort)
										};
										return <TableHeader key={name} header={item}/>
									})
								}
							</tr>
						</thead>
						<tbody>
						{
							props.moviesDB.map((record: MovieRecord) => {
								return <TableRow key={'id_' + record.id} movie={record}/>
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

const mapStateToProps = (state:any) => ({
	moviesDB: state.moviesDB,
	sortByColumn: state.sortByColumn
})

export default connect(mapStateToProps)(TableFrame);