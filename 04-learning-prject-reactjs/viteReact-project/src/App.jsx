import { useState } from "react";
import "./App.css";
import PropTypes from "prop-types";
import React from "react";

export default function FilterableProductTable() {
  const [searchText, setSearch] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);

  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const matchesStock = inStockOnly ? product.stocked === "true" : true;
    return matchesSearch && matchesStock;
  });

  return (
    <div className="Filterable-product-table">
      <SearchBar
        searchText={searchText}
        onSearchChange={setSearch}
        inStockOnly={inStockOnly}
        onStockChange={setInStockOnly}
      />
      <ProductTable products={filteredProducts} />
    </div>
  );
}

function SearchBar({ searchText, onSearchChange, inStockOnly, onStockChange }) {
  return (
    <form>
      <input
        type="text"
        placeholder="Search..."
        value={searchText}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <label>
        <input
          type="checkbox"
          checked={inStockOnly}
          onChange={(e) => onStockChange(e.target.checked)}
        />{" "}
        Only show products in stock
      </label>
    </form>
  );
}

SearchBar.propTypes = {
  searchText: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  inStockOnly: PropTypes.bool.isRequired,
  onStockChange: PropTypes.func.isRequired,
};

function ProductTable({ products }) {
  const categories = [...new Set(products.map((p) => p.category))];
  console.log(categories);

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {categories.map((category) => (
          <React.Fragment key={category}>
            <ProductCategoryRow value={category} />
            {products
              .filter((product) => product.category === category)
              .map((product) => (
                <ProductRow
                  key={product.name}
                  productName={product.name}
                  price={product.price}
                  stocked={product.stocked}
                />
              ))}
          </React.Fragment>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td>Footer</td>
        </tr>
      </tfoot>
    </table>
  );
}

ProductTable.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      category: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
      stocked: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};

function ProductCategoryRow({ value }) {
  return (
    <tr>
      <th>{value}</th>
    </tr>
  );
}

ProductCategoryRow.propTypes = {
  value: PropTypes.string.isRequired,
};

function ProductRow({ productName, price, stocked }) {
  // const rowStyle = {
  //   color: stocked === "true" ? "black" : "red", // Red for out-of-stock products
  // };
  return (
    <tr
      className={`product-row ${stocked === "true" ? stocked : "out-of-stock"}`}
    >
      <td className="product-name">{productName}</td>
      <td className="price">{price}</td>
    </tr>
  );
}

ProductRow.propTypes = {
  productName: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  stocked: PropTypes.string.isRequired, // Ensure `stocked` is a boolean
};

const PRODUCTS = [
  { category: "Fruits", price: "$1", stocked: "true", name: "Apple" },
  { category: "Fruits", price: "$2", stocked: "false", name: "DragonFruit" },
  { category: "Fruits", price: "$3", stocked: "true", name: "PassionFruit" },
  { category: "Vegetable", price: "$4", stocked: "false", name: "Spinach" },
  { category: "Vegetable", price: "$5", stocked: "true", name: "Pumpkin" },
  { category: "Vegetable", price: "$6", stocked: "true", name: "Peas" },
  { category: "Fruits", price: "$6", stocked: "true", name: "mango" },
  { category: "Fruits2", price: "$6", stocked: "false", name: "mango1" },
  { category: "Fruits2", price: "$6", stocked: "true", name: "mango2" },
  { category: "Fruits2", price: "$6", stocked: "true", name: "mango3" },
];
