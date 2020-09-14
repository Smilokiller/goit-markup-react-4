import React, { useState, useEffect, lazy, Suspense } from "react";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import styles from "./Film.module.css";

const FilmItemMain = lazy(() => import("./filmItemMark/FilmItemMain"));
const Cast = lazy(() => import("./filmItemMark/Cast"));
const Reviews = lazy(() => import("./filmItemMark/Reviews"));

export function FilmItem(prop) {
  const id = prop.match.params.movieId;
  const API_KEY = "bc91f782d3f4017afb52e00498ab052a";
  axios.defaults.baseURL = "https://api.themoviedb.org";

  const [film, setFilm] = useState({});

  const getSingleFilm = async () => {
    try {
      const filmItem = await axios.get(
        `/3/movie/${id}?api_key=${API_KEY}&language=en-US`
      );
      await setFilm(filmItem.data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getSingleFilm();
  }, []);

  return (
    <>
      <Suspense fallback={<h2>Загрузка...</h2>}>
        <div className={styles.filmBlock} key={film.id}>
          <div className={styles.filmImg}>
            <img
              src={`https://image.tmdb.org/t/p/w300${film.poster_path}`}
              alt={film.title}
            ></img>
          </div>
          <div>
            <h1>{film.title}</h1>

            <p>User Score {film.vote_average}</p>
            <h2>Overview</h2>
            <p>{film.overview}</p>
            <h2>Genres</h2>
            <div className={styles.filmGenres}>
              <FilmItemMain genres={film.genres} />
            </div>
          </div>
        </div>
        <div className={styles.additionalBlock}>
          <h2>Additional information:</h2>
          <Router>
            <div>
              <ul>
                <li className={styles.additionalLink}>
                  <Link to={`${prop.match.url}/cast`}>Cast</Link>
                </li>
                <li className={styles.additionalLink}>
                  <Link to={`${prop.match.url}/reviews`}>Reviews</Link>
                </li>
              </ul>

              <Switch>
                <Route path="/movies/:movieId/cast" component={Cast} />
                <Route path="/movies/:movieId/reviews" component={Reviews} />
              </Switch>
            </div>
          </Router>
        </div>
      </Suspense>
    </>
  );
}
