import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";
import { Home } from "./home/Home";
import { Movies } from "./movies/Movies";
import { FilmItem } from "./filmList/FilmItem";
import styles from "./Nav.module.css";

export default function Nav() {
  return (
    <Router>
      <div>
        <nav>
          <ul className={styles.navList}>
            <li className={styles.navListItem}>
              <NavLink exact to="/" activeClassName="active">
                Home
              </NavLink>
            </li>
            <li className={styles.navListItem}>
              <NavLink to="/movies" activeClassName="active">
                Movies
              </NavLink>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/movies/:movieId" component={FilmItem} />
          <Route exact path="/movies" component={Movies} />
        </Switch>
      </div>
    </Router>
  );
}
