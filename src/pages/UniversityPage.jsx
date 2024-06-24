import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Filter from "../components/FilterComponent";
import Modal from "../components/ModalComponent";
import ConfirmDialogModal from "../components/ConfirmDialogue";
import { getUniversitiesList } from "../api/api";
import { eyeIcon, deleteIcon } from "../icons/index";
import styles from "../styles/page.module.scss";

const Universities = () => {
  const [universities, setUniversities] = useState([]);
  const [openCorporaModal, setOpenCorporaModal] = useState(false);
  const [corporaData, setCorporaData] = useState([]);
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState();
  const [selectedUniversity, setSelectedUniversity] = useState("");
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

  const fetchUniversities = async () => {
    try {
      const queryString = constructQueryString(filters);
      const response = await getUniversitiesList(queryString);
      setUniversities(response?.list);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUniversities();
  }, [filters]);

  const handleViewCorpus = (corpora, universityName) => {
    setCorporaData(corpora);
    setSelectedUniversity(universityName);
  };

  const filterFields = [
    { name: "location", label: "Location", type: "text" },
    {
      name: "control",
      label: "Control",
      type: "select",
      options: [
        { value: "Private", label: "Private" },
        { value: "Public", label: "Public" },
      ],
    },
  ];

  const tableHeaders = [
    { name: "University Name", id: 0 },
    { name: "Location", id: 1 },
    { name: "Control", id: 2 },
    { name: "Students Count", id: 3 },
    { name: "Year of Establishment", id: 4 },
    { name: "Corpus", id: 5 },
    { name: "Delete", id: 6 },
  ];

  return (
    <div>
      <Filter
        fields={filterFields}
      />
      <div className={styles.page_title}>Universities</div>
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
            {universities.map((item) => (
              <tr key={item.Id}>
                <td>{item.universityName}</td>
                <td>{item.location}</td>
                <td>{item.control}</td>
                <td>{item.studentsCount}</td>
                <td>{item.yearFounded}</td>
                <td
                  className={styles.icon_column}
                  onClick={() => {
                    setOpenCorporaModal(true);
                    handleViewCorpus(item.corpora, item.universityName);
                  }}
                >
                  {eyeIcon}
                </td>
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

      {openCorporaModal && (
        <Modal
          isOpen={openCorporaModal}
          setIsOpen={setOpenCorporaModal}
          data={corporaData}
          selectedUniversity={selectedUniversity}
        />
      )}

      {openConfirmationModal && (
        <ConfirmDialogModal
          action={'universities'}
          setIsOpen={setOpenConfirmationModal}
          selectedItemId={selectedItemId}
        />
      )}
    </div>
  );
};

export default Universities;
