import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import styles from "./Film.module.css";
const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

function FilmList({ item, prop }) {
  const classes = useStyles();

  return (
    <div className={styles.filmList}>
      {item.map((el) => (
        <Card className={classes.root} style={{ margin: 10 }} key={el.id}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={`https://image.tmdb.org/t/p/w300${el.poster_path}`}
              title={el.title}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {el.title}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {el.overview}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary">
              <Link to={`${prop}/${el.id}`}>Learn More</Link>
            </Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
}

export default FilmList;
