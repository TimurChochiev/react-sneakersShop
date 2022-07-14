import Card from "../components/Card";
import React from "react";
import AppContext from "../context";

function Favorites() {
  const { favorites, onFavorite } = React.useContext(AppContext);
  return (
    <div className="content p-40">
      <div className="d-flex align-center mb-40 justify-between">
        <h1>Мои закладки</h1>
      </div>

      <div className="d-flex flex-wrap">
        {favorites.map((el, index) => (
          <Card key={index} {...el} favorited={true} onFavorite={onFavorite} />
        ))}
      </div>
    </div>
  );
}

export default Favorites;
