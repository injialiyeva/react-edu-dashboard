import React from "react";
import { cancelIcon } from "../icons";
import styles from "../styles/page.module.scss";

const Modal = ({ setIsOpen, data, selectedUniversity}) => {
  const tableHeaders = [
    { name: "Name", id: 0 },
    { name: "Description", id: 1 },
    { name: "Size", id: 2 },
    { name: "Access", id: 3 },
  ];

  return (
    <div className={styles.modal_overlay}>
      <div className={styles.modal_content}>
        <div className={styles.modal_header}>
          <div className={styles.modal_title}>Corpora List of {selectedUniversity}</div>
          <button type="button" onClick={() => setIsOpen(false)}>
            {cancelIcon}
          </button>
        </div>
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
              {data.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>{item.size}</td>
                  <td>{item.access}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Modal;
