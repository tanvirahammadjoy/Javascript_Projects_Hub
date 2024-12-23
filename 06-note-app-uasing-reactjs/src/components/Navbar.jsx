import PropTypes from "prop-types";
import "./Navbar.css";

const Navbar = ({ addNote }) => {
  return (
    <nav className="navbar">
      <h1 className="logo">Note App</h1>
      <button onClick={addNote} className="add-button">
        Add
      </button>
    </nav>
  );
};

Navbar.propTypes = {
  addNote: PropTypes.string.isRequired,
};

export default Navbar;
