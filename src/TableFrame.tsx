import React from 'react';
import TableColumn from './TableColumn';
import MovieRecord from './interfaces';

interface MovieRecordProps {
	moviesList: MovieRecord[];
}

export default function TableFrame({moviesList}: MovieRecordProps) {
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
						moviesList.map(record => {
							return <TableColumn key={'id_' + record.id} movie={record}/>
						})
					}
				</tbody>
			</table>
			<div>Number of records: {moviesList.length}</div>
		</>
	)
}
