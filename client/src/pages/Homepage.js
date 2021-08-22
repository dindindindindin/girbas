import React from "react";
import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <div>
      <p>AnaSayfa</p>
      <Link to="/admin">admin girisi</Link>
    </div>
  );
};

export default Homepage;
