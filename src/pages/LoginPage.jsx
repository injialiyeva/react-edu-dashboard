import React, { useState } from "react";
import styles from "../styles/login.module.scss";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const formData = JSON.stringify({
    //   userName: username,
    //   password: password,
    // });
    // await postLogin(formData);
  };

  return (
    <div className={styles.login_page}>
      <form onSubmit={handleSubmit}>
        <div className={styles.login_input}>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className={styles.login_input}>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className={styles.login_btn}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
