import React, { useState, useEffect, lazy, Suspense } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  useLocation,
} from "react-router-dom";
import styles from "./Film.module.css";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const FilmItemMain = lazy(() => import("./filmItemMark/FilmItemMain"));
const Cast = lazy(() => import("./filmItemMark/Cast"));
const Reviews = lazy(() => import("./filmItemMark/Reviews"));

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));
export function FilmItem(prop) {
  const classes = useStyles();
  const id = prop.match.params.movieId;
  const API_KEY = "bc91f782d3f4017afb52e00498ab052a";
  axios.defaults.baseURL = "https://api.themoviedb.org";

  const [film, setFilm] = useState({});
  let history = useHistory();
  let location = useLocation();
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

  function goBack() {
    history.push({
      pathname: location.state.from,
      search: location.state.inputWord
        ? `?query=${location.state.inputWord}`
        : "",
    });
  }
  function addDefaultSrc(ev) {
    ev.target.src =
      "https://vignette.wikia.nocookie.net/roblox/images/7/7b/Err.png/revision/latest/top-crop/width/360/height/450?cb=20200425195944&path-prefix=ru";
  }

  return (
    <>
      <Suspense fallback={<h2>Загрузка...</h2>}>
        <Button variant="contained" color="secondary" onClick={goBack}>
          Go back
        </Button>
        <div className={styles.filmBlock} key={film.id}>
          <div className={styles.filmImg}>
            <img
              src={`https://image.tmdb.org/t/p/w300${film.poster_path}`}
              alt={film.title}
              onError={addDefaultSrc}
            ></img>
          </div>
          <div>
            <h1>{film.title}</h1>

            <p>User Score: {film.vote_average}</p>
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
