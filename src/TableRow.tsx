import React from 'react';

export default function TableRow({movie}: any) {
	return (
		<tr>
			<td>{movie.id}</td>
			<td>{movie.title}</td>
			<td>{movie.director}</td>
			<td>{movie.distributor}</td>
			<td>{movie.imdb_rating}</td>
			<td>{movie.imdb_votes}</td>
		</tr>
	);
}