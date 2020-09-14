import React, { useEffect, useState, lazy, Suspense } from "react";
import axios from "axios";
import styles from "../filmList/Film.module.css";

const FilmList = lazy(() => import("../filmList/FilmList"));

export function Home() {
  axios.defaults.baseURL = "https://api.themoviedb.org";
  const [popular, setPopular] = useState([]);
  const API_KEY = "bc91f782d3f4017afb52e00498ab052a";
  async function getPopular() {
    try {
      const popularList = await axios.get(
        `/3/trending/all/day?api_key=${API_KEY}`
      );
      setPopular(popularList.data.results);
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    getPopular();
  }, []);

  return (
    <Suspense fallback={<h2>Загрузка...</h2>}>
      <div className={styles.filmList}>
        <FilmList item={popular} prop={"/movies"} />
      </div>
    </Suspense>
  );
}
