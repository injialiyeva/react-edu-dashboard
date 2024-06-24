import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Filter from "../components/FilterComponent";
import ConfirmDialogModal from "../components/ConfirmDialogue";
import { getHighSchoolsList } from "../api/api";
import { deleteIcon } from "../icons/index";
import styles from "../styles/page.module.scss";

const HighSchools = () => {
  const [highSchools, setHighSchools] = useState([]);
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState();
  const filters = useSelector((state) => state.filters);

  const constructQueryString = (filters) => {
    const filterString = Object.entries(filters)
      .map(([key, value]) => `(${key},eq,${value})`)
      .join(",");

    const queryString = new URLSearchParams({
      where: filterString,
    });
    return queryString.toString();
  };

  const getHighSchools = async () => {
    try {
      const queryString = constructQueryString(filters);
      const response = await getHighSchoolsList(queryString);
      setHighSchools(response?.list);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getHighSchools();
  }, [filters]);

  const filterFields = [
    { name: "highSchoolName", label: "High School Name", type: "text" },
    { name: "count", label: "Student Count", type: "number" },
  ];

  const tableHeaders = [
    { name: "High School Name", id: 0 },
    { name: "Country", id: 1 },
    { name: "City", id: 2 },
    { name: "Student Count", id: 3 },
    { name: "Magnet Programs", id: 4 },
    { name: "Focus Areas", id: 5 },
    { name: "Delete", id: 6 },
  ];

  return (
    <div>
      <Filter fields={filterFields} />
      <div className={styles.page_title}>High Schools</div>
      <div className={styles.table_container}>
        <table className={styles.table}>
          <thead>
            <tr>
              {tableHeaders.map((item) => (
                <th key={item.id}>{item.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {highSchools.map((item) => (
              <tr key={item.Id}>
                <td>{item.highSchoolName}</td>
                <td>{item.country}</td>
                <td>{item.city}</td>
                <td>{item.count}</td>
                <td>{item.magnetPrograms}</td>
                <td>{item.focusAreas}</td>
                <td
                  className={styles.icon_column}
                  onClick={() => {
                    setOpenConfirmationModal(true);
                    setSelectedItemId(item.Id);
                  }}
                >
                  {deleteIcon}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {openConfirmationModal && (
        <ConfirmDialogModal
          action={"high-schools"}
          setIsOpen={setOpenConfirmationModal}
          selectedItemId={selectedItemId}
        />
      )}
    </div>
  );
};

export default HighSchools;
