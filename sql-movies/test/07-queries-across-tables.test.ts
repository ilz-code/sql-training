import { Database } from "../src/database";
import { minutes } from "./utils";

describe("Queries Across Tables", () => {
  let db: Database;

  beforeAll(async () => {
    db = await Database.fromExisting("06", "07");    
  }, minutes(3));

  it(
    "should select top three directors ordered by total budget spent in their movies",
    async done => {
      const query = `
      select 
        full_name as director, 
        round(sum(budget_adjusted),2) as total_budget
      from movie_directors 
        join directors on movie_directors.director_id = directors.id
        join movies on movie_directors.movie_id = movies.id
      group by director 
      order by total_budget desc 
      limit 3`;
      
      const result = await db.selectMultipleRows(query);

      expect(result).toEqual([
        {
          director: "Ridley Scott",
          total_budget: 722882143.58
        },
        {
          director: "Michael Bay",
          total_budget: 518297522.1
        },
        {
          director: "David Yates",
          total_budget: 504100108.5
        }
      ]);

      done();
    },
    minutes(3)
  );

  it(
    "should select top 10 keywords ordered by their appearance in movies",
    async done => {
      const query = `
      select 
        keyword, 
        count(movie_id) as count 
      from movie_keywords 
        join keywords on movie_keywords.keyword_id = keywords.id
      group by keyword
      order by count(movie_id) desc 
      limit 10`;
         
      const result = await db.selectMultipleRows(query);

      expect(result).toEqual([
        {
          keyword: "woman director",
          count: 162
        },
        {
          keyword: "independent film",
          count: 115
        },
        {
          keyword: "based on novel",
          count: 85
        },
        {
          keyword: "duringcreditsstinger",
          count: 82
        },
        {
          keyword: "biography",
          count: 78
        },
        {
          keyword: "murder",
          count: 66
        },
        {
          keyword: "sex",
          count: 60
        },
        {
          keyword: "revenge",
          count: 51
        },
        {
          keyword: "sport",
          count: 50
        },
        {
          keyword: "high school",
          count: 48
        }
      ]);

      done();
    },
    minutes(3)
  );

  it(
    "should select one movie which has highest count of actors",
    async done => {
      const query = `
      select 
        count(actor_id) as count, 
        original_title as original_title 
      from  movie_actors 
        join movies on movies.id = movie_actors.movie_id
      group by original_title
      order by count(actor_id) desc 
      limit 1`;
      const result = await db.selectSingleRow(query);

      expect(result).toEqual({
        original_title: "Life",
        count: 12
      });

      done();
    },
    minutes(3)
  );

  it(
    "should select three genres which has most ratings with 5 stars",
    async done => {
      const query = `
       select 
          genre as genre, 
          count(rating) as five_stars_count
       from movie_genres 
          join genres on movie_genres.genre_id = genres.id 
          join movie_ratings on movie_genres.movie_id = movie_ratings.movie_id
       where rating = 5
       group by genre
       order by five_stars_count desc
       limit 3`;
      const result = await db.selectMultipleRows(query);

      expect(result).toEqual([
        {
          genre: "Drama",
          five_stars_count: 15052
        },
        {
          genre: "Thriller",
          five_stars_count: 11771
        },
        {
          genre: "Crime",
          five_stars_count: 8670
        }
      ]);

      done();
    },
    minutes(3)
  );

  it(
    "should select top three genres ordered by average rating",
    async done => {

      const query = `
      select         
        round(avg(rating),2) as avg_rating,
        genre as genre
      from movie_genres        
        join movie_ratings on movie_genres.movie_id = movie_ratings.movie_id
        join genres on movie_genres.genre_id = genres.id
      group by genre
      order by avg_rating desc
      limit 3`;
      
      const result = await db.selectMultipleRows(query);

      expect(result).toEqual([
        {
          genre: "Crime",
          avg_rating: 3.79
        },
        {
          genre: "Music",
          avg_rating: 3.73
        },
        {
          genre: "Documentary",
          avg_rating: 3.71
        }
      ]);

      done();
    },
    minutes(3)
  );
});
