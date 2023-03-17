import { useState, useEffect } from "react";
import Button from "./button";
import styles from "./addProduct.module.css";
import arrow_down from "../images/arrow_down.png";

const AddProduct = ({ onAddProduct }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const toggleOpen = () => setIsOpen(!isOpen);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, []);

  const handleAddProduct = () => {
    if (!selectedOption) {
      alert("Please select a product");
      return;
    }

    const newProduct = {
      title: selectedOption.title,
      price: selectedOption.price,
      quantity: parseInt(quantity),
      id: selectedOption.id,
      discountedPrice: selectedOption.discountPercentage,
    };
    setSelectedProducts([...selectedProducts, newProduct]);
    setSelectedOption(null);
    setQuantity(1);
  };

  const handleBuy = () => {
    if (selectedProducts.length === 0) {
      alert("Please select a product");
      return;
    }
    onAddProduct(selectedProducts);
    setSelectedProducts([]);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.header} onClick={toggleOpen}>
          {selectedOption ? selectedOption.title : "Select product"}
          <img className={styles.img} src={arrow_down} />
        </div>
      </div>
      {isOpen && (
        <div className={styles.list_container}>
          {products.length > 0 ? (
            <ul>
              {products.map((product) => (
                <li
                  key={product.id}
                  onClick={() => {
                    setSelectedOption(product);
                    setIsOpen(false);
                  }}
                >
                  {product.title}
                </li>
              ))}
            </ul>
          ) : (
            <p>Loading products or something went wrong...</p>
          )}
        </div>
      )}
      <div className={styles.container}>
        <label>
          Quantity
          <input
            min={1}
            type="number"
            value={quantity}
            onChange={(event) => setQuantity(event.target.value)}
          />
        </label>
        <Button onClick={handleAddProduct} text="Add to basket" />
      </div>
      {selectedProducts.length > 0 && (
        <>
          <div className={styles.container}>
            <div className={styles.selected_products}>Selected Products:</div>
            <ul className={styles.selected_list}>
              {selectedProducts.map((product, index) => (
                <li className={styles.selected_list} key={index}>
                  {product.title}, quantity: {product.quantity}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
      <div className={styles.container}>
        <Button onClick={handleBuy} text="Buy" />
      </div>
    </div>
  );
};

export default AddProduct;
