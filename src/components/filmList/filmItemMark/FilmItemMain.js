import React from "react";

function FilmItemMain({ genres = ["null", "null"] }) {
  return genres.map((el) => (
    <p key={el.id} style={{ marginRight: 10 }}>
      {el.name}
    </p>
  ));
}
export default FilmItemMain;
