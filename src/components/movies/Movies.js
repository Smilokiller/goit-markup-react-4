import React, { useState, lazy, Suspense } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

const FilmList = lazy(() => import("../filmList/FilmList"));
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

export function Movies(prop) {
  const classes = useStyles();
  const [search, setSearch] = useState([]);
  const [inputWord, setInputWord] = useState("");
  axios.defaults.baseURL = "https://api.themoviedb.org";
  const API_KEY = "bc91f782d3f4017afb52e00498ab052a";
  async function getPopular() {
    try {
      const searchImages = await axios.get(
        `/3/search/movie?api_key=${API_KEY}&language=en-US&query=${inputWord}&page=1&include_adult=false`
      );
      setSearch(searchImages.data.results);
    } catch (e) {
      console.log(e);
    }
  }

  function handleChange({ target }) {
    const { value } = target;
    setInputWord(value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    getPopular();
    setInputWord("");
  }
  return (
    <>
      <Suspense fallback={<h2>Загрузка...</h2>}>
        <form
          className={classes.root}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <TextField
            id="standard-basic"
            label="Search"
            style={{ width: 500 }}
            onChange={handleChange}
            value={inputWord}
            name={"inputWord"}
            placeholder="Input film name"
          />
          <Button variant="contained" color="primary" type="submit">
            Find
          </Button>
        </form>
        <FilmList item={search} prop={prop.match.url} />
      </Suspense>
    </>
  );
}
