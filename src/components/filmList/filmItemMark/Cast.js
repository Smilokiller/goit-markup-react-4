import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../Film.module.css";

function Cast(prop) {
  const id = prop.match.params.movieId;
  const API_KEY = "bc91f782d3f4017afb52e00498ab052a";
  axios.defaults.baseURL = "https://api.themoviedb.org";

  const [cast, setCast] = useState([]);

  const getCast = async () => {
    try {
      const filmCast = await axios.get(
        `/3/movie/${id}/credits?api_key=${API_KEY}`
      );
      await setCast(filmCast.data.cast);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getCast();
  }, []);

  function addDefaultSrc(ev) {
    ev.target.src =
      "https://vignette.wikia.nocookie.net/roblox/images/7/7b/Err.png/revision/latest/top-crop/width/360/height/450?cb=20200425195944&path-prefix=ru";
  }

  return (
    <ul className={styles.actorsList}>
      {cast.map((el) => (
        <li className={styles.actorsItem}>
          <div key={el.credit_id}>
            <img
              src={`https://image.tmdb.org/t/p/w300${el.profile_path}`}
              onError={addDefaultSrc}
              alt={el.name}
            ></img>
            <h2>{el.name}</h2>
            <p>Character: {el.character}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
export default Cast;
