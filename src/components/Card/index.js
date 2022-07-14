import React from "react";
import ContentLoader from "react-content-loader";
import styles from "./Card.module.scss";
import AppContext from "../../context";

function Card({
  id,

  onFavorite,
  imageUrl,
  title,
  price,
  onPlus,
  favorited = false,

  loading = false,
}) {
  const { isItemAdded } = React.useContext(AppContext);
  const [isFavorite, setIsFavored] = React.useState(favorited);
  const itemObj = { id, parentId: id, imageUrl, title, price };

  const clickHandler = () => {
    onPlus(itemObj);
  };

  const favoriteHandler = () => {
    onFavorite(itemObj);
    setIsFavored(!isFavorite);
  };

  return (
    <div className={styles.card}>
      {loading ? (
        <ContentLoader
          speed={2}
          width={165}
          height={265}
          viewBox="0 0 150 265"
          backgroundColor="#bfdef1"
          foregroundColor="#ecebeb"
        >
          <rect x="0" y="0" rx="10" ry="10" width="150" height="135" />
          <rect x="0" y="167" rx="5" ry="5" width="150" height="15" />
          <rect x="0" y="210" rx="5" ry="5" width="93" height="15" />
          <rect x="0" y="234" rx="5" ry="5" width="80" height="24" />
          <rect x="118" y="230" rx="10" ry="10" width="32" height="32" />
        </ContentLoader>
      ) : (
        <>
          {onFavorite && (
            <div className={styles.favorite} onClick={favoriteHandler}>
              <img
                src={
                  isFavorite ? "/img/heart-liked.svg" : "/img/heart-unliked.svg"
                }
                alt="Unliked"
              />
            </div>
          )}

          <img width="100%" height={135} src={imageUrl} alt="Sneakers" />
          <h5>{title}</h5>
          <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column">
              <span>Price:</span>
              <b>{price} rub</b>
            </div>
            {onPlus && (
              <img
                className={styles.plus}
                onClick={clickHandler}
                src={isItemAdded(id) ? "/img/in-cart.svg" : "/img/plus.svg"}
                alt="plus"
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Card;
