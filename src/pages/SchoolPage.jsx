import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Filter from "../components/FilterComponent";
import ConfirmDialogModal from "../components/ConfirmDialogue";
import { getSchoolsList } from "../api/api";
import { deleteIcon } from "../icons/index";
import styles from "../styles/page.module.scss";

const Schools = () => {
  const [schools, setSchools] = useState([]);
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

  const fetchSchools = async () => {
    try {
      const queryString = constructQueryString(filters);
      const response = await getSchoolsList(queryString);
      setSchools(response?.list);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchSchools();
  }, [filters]);

  const filterFields = [
    { name: "schoolName", label: "School Name", type: "text" },
    {
      name: "type",
      label: "Type",
      type: "select",
      options: [
        { value: "Elementary", label: "Elementary" },
        { value: "Middle", label: "Middle" },
        { value: "High", label: "High" },
      ],
    },
  ];

  const tableHeaders = [
    { name: "School Name", id: 0 },
    { name: "Location", id: 1 },
    { name: "Type", id: 2 },
    { name: "Focus", id: 3 },
    { name: "Website", id: 4 },
    { name: "Delete", id: 5 },
  ];

  return (
    <div>
      <Filter fields={filterFields} />
      <div className={styles.page_title}>Schools</div>
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
            {schools.map((item) => (
              <tr key={item.Id}>
                <td>{item.schoolName}</td>
                <td>{item.location}</td>
                <td>{item.type}</td>
                <td>{item.focus}</td>
                <td>{item.website}</td>
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
          action={"schools"}
          setIsOpen={setOpenConfirmationModal}
          selectedItemId={selectedItemId}
        />
      )}
    </div>
  );
};

export default Schools;
