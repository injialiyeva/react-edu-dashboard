import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import styles from "../styles/sidebar.module.scss";

const Sidebar = () => {
  const location = useLocation();
  const [isSelected, setIsSelected] = useState(location.pathname);

  useEffect(() => {
    setIsSelected(location.pathname);
  }, [location.pathname]);

  return (
    <div className={styles.sidebar}>
      <ul>
        <li
          className={
            isSelected === "/universities"
              ? styles.active_menu_item
              : styles.menu_item
          }
        >
          <NavLink to="/universities">Universities</NavLink>
        </li>
        <li
          className={
            isSelected === "/schools"
              ? styles.active_menu_item
              : styles.menu_item
          }
        >
          <NavLink to="/schools">Schools</NavLink>
        </li>
        <li
          className={
            isSelected === "/high-schools"
              ? styles.active_menu_item
              : styles.menu_item
          }
        >
          <NavLink to="/high-schools">High Schools</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
