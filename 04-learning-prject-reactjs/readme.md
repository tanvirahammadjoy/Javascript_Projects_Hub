# Filterable Product Table

Project Overview
This project is a Filterable Product Table built with React. It demonstrates key concepts of React development, such as:
Dynamic rendering of product data grouped by categories.
Conditional styling for out-of-stock products.
Modular design with reusable components.
Type validation using PropTypes.
Clean and maintainable code structure.
The application renders a table displaying product categories and their respective products. It includes features like:
Highlighting out-of-stock products in red.
Organizing products dynamically by categories.
Responsive and user-friendly design.

Features
Dynamic Data Rendering:
Products are dynamically rendered based on a data array.
Products are grouped by their category in the table.
Conditional Styling:
Products that are out of stock are highlighted in red for better visibility.

Reusable Components:
SearchBar: A placeholder for future search functionality.
ProductCategoryRow: Displays category headers.
ProductRow: Displays individual product details.

Type Validation:
PropTypes ensure correct data types are passed to components, reducing potential bugs.

Scalability:
Code is structured for easy extension and maintenance.
Adding new features like search functionality or sorting would be straightforward.

Project Setup
Prerequisites
Node.js (v14 or higher)
npm package manager
Installation Steps
Clone the repository:
git clone <repository_url>
Navigate to the project directory:
cd filterable-product-table
Install dependencies:
npm install

Start the development server:
npm run dev

Open your browser and navigate to <http://localhost:5173>
Why Use Vite React Instead of Create React App (CRA)?

Performance:
Vite is significantly faster during development due to its use of ES modules (ESM) and native browser support for modern JavaScript.
CRA relies on bundling the entire project during startup, which can be slow, especially for large projects.

Faster Hot Module Replacement (HMR):
Vite provides faster and more reliable HMR, allowing developers to see changes instantly without full-page reloads.

Lightweight and Modern:
Vite has a smaller dependency footprint compared to CRA.
It uses Rollup for production builds, ensuring efficient and optimized output.

Customizability:
Vite allows for easier customization and integration of plugins compared to CRA, which can be restrictive unless ejected.

Future-Proof:
Vite is built to support modern JavaScript tooling and workflows, making it more suitable for future projects.

By choosing Vite React, this project benefits from faster development cycles and a modern build system.

Future Improvements

Sorting:
Enable sorting by name, price, or stock status.

Responsive Design:
Make the UI fully responsive for mobile and tablet devices.

Backend Integration:
Connect to an API to fetch product data dynamically.

Testing:
Add unit and integration tests for better reliability.

License
This project is licensed under the MIT License. Feel free to use and modify it as needed.

Acknowledgments
React: For providing a powerful and efficient library for building user interfaces.

Vite: For its modern and fast development experience.
