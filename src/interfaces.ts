interface MovieRecord
{
	id: number,
	title: string | number,
	director: string,
	distributor: string,
	imdb_rating: number,
	imdb_votes: number
}

export default MovieRecord;