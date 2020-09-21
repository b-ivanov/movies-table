import FilterStringProperty from './FilterStringProperty';
import FilterNumberProperty from './FilterNumberProperty';

interface FilterObject
{
	id_min: FilterNumberProperty|null,
	id_max: FilterNumberProperty|null,
	title: FilterStringProperty|null,
	director: FilterStringProperty|null,
	distributor: FilterStringProperty|null,
	imdb_rating_min: FilterNumberProperty|null,
	imdb_rating_max: FilterNumberProperty|null,
	imdb_votes_min: FilterNumberProperty|null,
	imdb_votes_max: FilterNumberProperty|null
}

export default FilterObject;