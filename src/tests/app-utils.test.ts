import AppUtils from '../app-utils'
import MovieRecord from '../inerfaces/MovieRecord';

const testMoviesDB:MovieRecord[] = [{
	"id": 34,
	"title": "Body Double",
	"director": "Brian De Palma",
	"distributor": "Sony Columbia",
	"imdb_rating": 6.4,
	"imdb_votes": 9738
}, {
	"id": 1,
	"title": "Following",
	"director": "Christopher Nolan",
	"distributor": "Zeitgeist",
	"imdb_rating": 7.7,
	"imdb_votes": 15133
}, {
	"id": 12,
	"title": "The Abyss",
	"director": "James Cameron",
	"distributor": "20th Century Fox",
	"imdb_rating": 7.6,
	"imdb_votes": 51018
}, {
	"id": 43,
	"title": "Beverly Hills Cop III",
	"director": "John Landis",
	"distributor": "Paramount Pictures",
	"imdb_rating": 5,
	"imdb_votes": 21199
}, {
	"id": 4,
	"title": "Indiana Jones",
	"director": "Steven Spielberg",
	"distributor": "Universal",
	"imdb_rating": 5.6,
	"imdb_votes": 13364
}];

test('Test mapStateToProps function', () => {
  const testStateObject:any = {
		moviesDB: [],
		sortByColumn: "title",
		currentPage: 1,
		recordsPerPage: 20,
		showForm: false,
		recordIndexForEdit: null
	};
	const props:any = AppUtils.mapStateToProps(testStateObject);
	for (const key in testStateObject) {
		if (Object.prototype.hasOwnProperty.call(testStateObject, key)) {
			expect(props[key] === testStateObject[key]).toBeTruthy();
		}
	}
});

test('Test prettifyHeaderName function', () => {
	expect(AppUtils.prettifyHeaderName("id") === "#").toBeTruthy();
	expect(AppUtils.prettifyHeaderName("title") === "title").toBeTruthy();
	expect(AppUtils.prettifyHeaderName("imdb_votes") === "IMDB votes").toBeTruthy();
});

test('Test getPropertyType function', () => {
	expect(AppUtils.getPropertyType("id") === "number").toBeTruthy();
	expect(AppUtils.getPropertyType("title") === "string").toBeTruthy();
	expect(AppUtils.getPropertyType("director") === "string").toBeTruthy();
	expect(AppUtils.getPropertyType("distributor") === "string").toBeTruthy();
	expect(AppUtils.getPropertyType("imdb_votes") === "number").toBeTruthy();
	expect(AppUtils.getPropertyType("imdb_rating") === "number").toBeTruthy();
});

test('Test getIndexOfRecord function', () => {
	expect(AppUtils.getIndexOfRecord(testMoviesDB, "title", "Body Double") === 0).toBeTruthy();
	expect(AppUtils.getIndexOfRecord(testMoviesDB, "title", "Indiana Jones") === 4).toBeTruthy();
	expect(AppUtils.getIndexOfRecord(testMoviesDB, "director", "Christopher Nolan") === 1).toBeTruthy();
	expect(AppUtils.getIndexOfRecord(testMoviesDB, "imdb_rating", 7.6) === 2).toBeTruthy();
});

test('Test dynamicSort function', () => {
	const titleSort:MovieRecord[] = testMoviesDB.sort(AppUtils.dynamicSort("title", true));
	expect(titleSort[0].title === "Beverly Hills Cop III").toBeTruthy();
	expect(titleSort[4].title === "The Abyss").toBeTruthy();

	const titleSortRev:MovieRecord[] = testMoviesDB.sort(AppUtils.dynamicSort("-title", true));
	expect(titleSortRev[0].title === "The Abyss").toBeTruthy();
	expect(titleSortRev[4].title === "Beverly Hills Cop III").toBeTruthy();

	const IMDBvotesSort:MovieRecord[] = testMoviesDB.sort(AppUtils.dynamicSort("imdb_votes", false));
	expect(IMDBvotesSort[0].title === "Body Double").toBeTruthy();
	expect(IMDBvotesSort[4].title === "The Abyss").toBeTruthy();

	const IMDBvotesSortRev:MovieRecord[] = testMoviesDB.sort(AppUtils.dynamicSort("-imdb_votes", false));
	expect(IMDBvotesSortRev[0].title === "The Abyss").toBeTruthy();
	expect(IMDBvotesSortRev[4].title === "Body Double").toBeTruthy();
});

test('Test dynamicFilter function', () => {
	const titleFilter:MovieRecord[] = testMoviesDB.filter(AppUtils.dynamicFilter({
		title: {
			type: "string",
			val: "Following",
			property: "title"
		}
	}));
	expect(titleFilter.length === 1).toBeTruthy();
	expect(titleFilter[0].title === "Following").toBeTruthy();

	const IMDBvotesFilter:MovieRecord[] = testMoviesDB.filter(AppUtils.dynamicFilter({
		min_imdb_votes: {
			type: "number",
			val: 15000,
			property: "imdb_votes"
		}
	}));
	expect(IMDBvotesFilter.length === 3).toBeTruthy();
});