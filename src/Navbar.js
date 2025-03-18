import React from 'react';
import './Navbar.css';
import Select from 'react-select';

const Navbar = ({ handleLength, sorting, len }) => {
  return (
    <nav className="navbar">
      <div className="nav-brand">Sorting Visualizer</div>
      <div>
        <div className="group length">
          <label>Length</label>
          <input
            type="range"
            onChange={handleLength}
            min="5"
            max="100"
            step="1"
            disabled={sorting}
            value={len}
          />
        </div>
      </div>
      <div>
        
      </div>
    </nav>
  );
};

export default Navbar;