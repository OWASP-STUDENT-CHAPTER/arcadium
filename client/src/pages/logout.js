import React, { useState, useEffect } from "react";

const Logout = () => {
  return (
    <div className="logout-component">
      <a href={`${process.env.REACT_APP_BASE_URL}/api/auth/logout`}>LOGOUT</a>
    </div>
  );
};

export default Logout;
