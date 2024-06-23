import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Universities from "./pages/UniversityPage";
import Schools from "./pages/SchoolPage";
import HighSchools from "./pages/HighSchoolPage";
import styles from './styles/app.module.scss'

const App = () => {
  return (
    <Router>
      <div className={styles.app}>
        <Sidebar />
        <div className={styles.content_wrapper}>
          <Routes>
            <Route
              path="/universities"
              element={
                  <Universities />
              }
            />
            <Route
              path="/schools"
              element={
                  <Schools />
              }
            />
            <Route
              path="/highschools"
              element={
                  <HighSchools />
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
