import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { debounce } from "lodash";
import { setFilter, clearFilters } from "../store/slices/filterSlice";
import styles from "../styles/filters.module.scss";

const Filter = ({ fields }) => {
  const dispatch = useDispatch();
  const [filters, setFilters] = useState({});

  const capitalizeFirstLetters = (value) => {
    return value
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const handleInputChange = (field, value) => {
    if (value) {
      const updatedValue =
        field.type === "text" ? capitalizeFirstLetters(value) : value;
      setFilters({ ...filters, [field.name]: updatedValue });
      dispatch(setFilter({ field: field.name, value: updatedValue }));
    } else {
      setFilters({});
      dispatch(clearFilters());
    }
  };

  const onInputChangeDebouncer = debounce(handleInputChange, 800);

  const handleClear = () => {
    setFilters({});
    dispatch(clearFilters());
  };

  return (
    <div className={styles.filters_wrapper}>
      {fields.map((field) => (
        <div key={field.name} className={styles.filter_item}>
          <label>{field.label}</label>
          {field.type === "text" && (
            <input
              type="text"
              key={filters[field.name] === undefined ? "" : field.name}
              defaultValue={filters[field.name] || ""}
              onChange={(e) => onInputChangeDebouncer(field, e.target.value)}
            />
          )}
          {field.type === "number" && (
            <input
              type="number"
              key={filters[field.name] === undefined ? "" : field.name}
              defaultValue={filters[field.name] || ""}
              onChange={(e) => onInputChangeDebouncer(field, e.target.value)}
            />
          )}
          {field.type === "date" && (
            <input
              type="date"
              key={filters[field.name] === undefined ? "" : field.name}
              defaultValue={filters[field.name] || ""}
              onChange={(e) => handleInputChange(field, e.target.value)}
            />
          )}
          {field.type === "select" && (
            <select
              key={filters[field.name] === undefined ? "" : field.name}
              defaultValue={filters[field.name] || ""}
              onChange={(e) => handleInputChange(field, e.target.value)}
            >
              {field.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          )}
        </div>
      ))}
      <button onClick={handleClear} className={styles.clear_button}>
        Clear
      </button>
    </div>
  );
};

export default Filter;
