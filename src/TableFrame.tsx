import React from 'react';
import {connect} from 'react-redux';
import MovieRecord from './interfaces'
import TableColumn from './TableColumn';

class TableFrame extends React.Component {
	render () {
		const props:any = this.props;
		if (props.moviesDB.length === 0) {
			return (<div>No records to show!</div>);
		} else {
			return (
				<>
					<table>
						<thead>
							<tr>
								<th>#</th>
								<th>Title</th>
								<th>Director</th>
								<th>Distributor</th>
								<th>IMDB rating</th>
								<th>IMDB votes</th>
							</tr>
						</thead>
						<tbody>
						{
							props.moviesDB.map((record: MovieRecord) => {
								return <TableColumn key={'id_' + record.id} movie={record}/>
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
	moviesDB: state.moviesDB
})

export default connect(mapStateToProps)(TableFrame);