import React from "react";
import { deleteHighSchool, deleteSchool, deleteUniversity } from "../api/api";
import styles from "../styles/modal.module.scss"

const ConfirmDialogModal = ({ action, setIsOpen, selectedItemId }) => {
  const handleDeleteItem = async () => {
    try {
      switch (action) {
        case "universities":
          await deleteUniversity(selectedItemId);
          setIsOpen(false);
          break;
        case "schools": 
          await deleteSchool(selectedItemId);
          setIsOpen(false);
          break;
        case "high-schools":
          await deleteHighSchool(selectedItemId);
          setIsOpen(false);
          break;
        default:
          return;
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.modal_overlay}>
      <div className={styles.confirm_modal_content}>
        <p>Are you sure you want to delete this item?</p>
        <div className={styles.footer}>
          <button
            type="button"
            className={styles.confirm_button}
            onClick={handleDeleteItem}
          >
            Confirm
          </button>
          <button
            type="button"
            className={styles.cancel_button}
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialogModal;
