import { useState, useEffect } from "react";

import Basket from "./components/basket";
import Chart from "./components/chart";
import BouncingDotsLoader from "./components/loadingDots";
import Button from "./components/button";
import AddProduct from "./components/addProduct";

import "./App.css";

function App() {
  const [carts, setCarts] = useState(null);
  const [selectedBasket, setSelectedBasket] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleProductList, setIsVisibleProductList] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchCart = async () => {
      setIsLoading(true);

      try {
        const response = await fetch("https://dummyjson.com/carts");
        if (!response.ok) {
          setIsError(true);
        }

        const data = await response.json();
        setCarts(data.carts);
      } catch (error) {
        console.error(error);
      }

      setIsLoading(false);
    };

    fetchCart();
  }, []);

  const handleSelectCart = (basket, id) => {
    setSelectedBasket(basket);
    setSelectedId(id);

    setIsVisible(!isVisible);
  };
  const handleCloseChart = () => {
    setIsVisible(false);
  };

  const handleIsViibleProductList = () => {
    setIsVisibleProductList(true);
  };

  const handleDeleteBasket = (id) => {
    const updatedCarts = carts.filter((cart) => cart.id !== id);
    setCarts(updatedCarts);
  };
  const addNewCart = (products) => {
    const newCart = {
      id: Math.floor(Math.random() * 500),
      products: products,
    };

    setSelectedBasket(newCart.products);
    setSelectedId(newCart.id);
    setCarts((prevCarts) => [...prevCarts, newCart]);
    setIsVisibleProductList(false);
  };

  return isError ? (
    <h1>Something went wrong...</h1>
  ) : (
    <div className="container">
      {isLoading ? (
        <BouncingDotsLoader />
      ) : (
        <>
          <div className="items-container">
            {carts &&
              carts.map((cart) => (
                <div key={cart.id} className="basket-wrapper">
                  <Basket
                    id={cart.id}
                    onSelect={() => handleSelectCart(cart.products, cart.id)}
                    onDelete={() => handleDeleteBasket(cart.id)}
                    basketId={cart.id}
                  />
                </div>
              ))}
            <div className="add_basket">
              <Button
                onClick={handleIsViibleProductList}
                text="Add Basket"
              ></Button>

              {isVisibleProductList && (
                <AddProduct
                  onAddProduct={(products) => {
                    addNewCart(products);
                  }}
                />
              )}
            </div>
          </div>

          {isVisible && <div className="overlay"></div>}
          {selectedBasket && isVisible && (
            <Chart
              products={selectedBasket}
              id={selectedId}
              onCloseChart={handleCloseChart}
            />
          )}
        </>
      )}
    </div>
  );
}

export default App;
