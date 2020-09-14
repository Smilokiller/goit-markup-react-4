import React, { useState, useEffect } from "react";
import axios from "axios";

function Reviews(prop) {
  const id = prop.match.params.movieId;
  const API_KEY = "bc91f782d3f4017afb52e00498ab052a";
  axios.defaults.baseURL = "https://api.themoviedb.org";

  const [reviews, setReviews] = useState([]);

  const getReviews = async () => {
    try {
      const filmCast = await axios.get(
        `/3/movie/${id}/reviews?api_key=${API_KEY}&language=en-US&page=1`
      );
      await setReviews(filmCast.data.results);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getReviews();
  }, []);
  return reviews.map((el) => (
    <div key={el.id}>
      <h2> Author: {el.author}</h2>
      <p>{el.content}</p>
    </div>
  ));
}
export default Reviews;
