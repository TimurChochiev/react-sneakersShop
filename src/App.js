import React from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import Home from "./pages/Home";
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import Favorites from "./pages/Favorites";
import AppContext from "./context";
import Orders from "./pages/Orders";

function App() {
  const [items, setItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [cartOpened, setCartOpened] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const [cartRes, favRes, itemRes] = await Promise.all([
          axios.get(`https://62b9c7c041bf319d22855607.mockapi.io/cart`),
          axios.get(`https://62b9c7c041bf319d22855607.mockapi.io/favorites`),
          axios.get("https://62b9c7c041bf319d22855607.mockapi.io/Items"),
        ]);

        setIsLoading(false);

        setCartItems(cartRes.data);
        setFavorites(favRes.data);
        setItems(itemRes.data);
      } catch (error) {
        alert(error);
        console.log(error);
      }
    }

    fetchData();
  }, []);

  const onAddToCart = async (obj) => {
    try {
      const findItem = cartItems.find(
        (carted) => Number(carted.parentId) === Number(obj.id)
      );
      if (findItem) {
        setCartItems((prev) =>
          prev.filter((item) => Number(item.parentId) !== Number(obj.id))
        );
        await axios.delete(
          `https://62b9c7c041bf319d22855607.mockapi.io/cart/${findItem.id}`
        );
      } else {
        setCartItems((prev) => [...prev, obj]);
        const { data } = await axios.post(
          "https://62b9c7c041bf319d22855607.mockapi.io/cart",
          obj
        );
        setCartItems((prev) =>
          prev.map((item) => {
            if (item.parentId === data.parentId) {
              return {
                ...item,
                id: data.id,
              };
            }
            return item;
          })
        );
      }
    } catch (error) {
      alert("Add to card error");
      console.log(error);
    }
  };

  const onRemoveFromCart = (id) => {
    try {
      axios.delete(`https://62b9c7c041bf319d22855607.mockapi.io/cart/${id}`);

      setCartItems((prev) => prev.filter((el) => Number(el.id) !== Number(id)));
    } catch (error) {
      alert("Remove from cart error");
      console.log(error);
    }
  };

  const searchHandler = (event) => {
    setSearchValue(event.target.value);
  };

  const onFavorite = async (obj) => {
    try {
      if (favorites.find((fav) => Number(fav.id) === Number(obj.id))) {
        axios.delete(
          `https://62b9c7c041bf319d22855607.mockapi.io/favorites/${obj.id}`
        );
        setFavorites((prev) =>
          prev.filter((el) => Number(el.id) !== Number(obj.id))
        );
      } else {
        const { data } = await axios.post(
          `https://62b9c7c041bf319d22855607.mockapi.io/favorites`,
          obj
        );
        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      alert("Ошибка при добавлении закладки");
      console.log(error);
    }
  };

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(id));
  };

  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        favorites,
        isItemAdded,
        onFavorite,
        setCartOpened,
        setCartItems,
      }}
    >
      <div className="wrapper clear">
        <Drawer
          items={cartItems}
          onClose={() => setCartOpened(false)}
          onRemove={(id) => onRemoveFromCart(id)}
          opened={cartOpened}
        />
        <Header onClickCart={() => setCartOpened(true)} />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                items={items}
                searchValue={searchValue}
                searchHandler={searchHandler}
                setSearchValue={setSearchValue}
                onFavorite={(obj) => onFavorite(obj)}
                onAddToCart={(obj) => onAddToCart(obj)}
                isLoading={isLoading}
              />
            }
          ></Route>
          <Route path="/favorites" element={<Favorites />}></Route>
          <Route path="/orders" element={<Orders />}></Route>
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
