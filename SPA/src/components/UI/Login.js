import React, { useState } from "react";
import axios from "axios";
import "../UI/General.css";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Links from "../Links"

function Login() {

  const [loading, setLoading] = useState(false);
  const mail = useFormInput("");
  const password = useFormInput("");
  const [error, setError] = useState(null);

  // handle button click of login form
  const handleLogin = () => {
    setError(null);
    setLoading(true);
    let url = Links.MDV_URL() + "/api/User/" + mail.value;
    axios.get(url).then((response) => {
      setLoading(false);
      console.log(response.data);

      if (response.data.pass !== password.value) {
        setError("User not found");
      } else if (
        response.data.pass === password.value &&
        response.data.role === "Admin"
      ) {
        //call AdminTabs
        window.location.replace(Links.UVM_URL() + '/admin')
      } else if (
        response.data.pass === password.value &&
        response.data.role === "Normal"
      ) {
        //call NormalTabs
        window.location.replace(Links.UVM_URL() + '/user')
      }
    });
  };

  return (
    <div>
      <h1> Log In </h1>
      <br />
      <br />
      <div>
        Mail
        <br />
        <input
          className="emailText"
          type="text"
          {...mail}
          autoComplete="new-password"
        />
      </div>
      <div style={{ marginTop: 10 }}>
        Password
        <br />
        <input type="password" {...password} autoComplete="new-password" />
      </div>
      {error && (
        <>
          <small style={{ color: "red" }}>{error}</small>
          <br />
        </>
      )}
      <br />
      {/* Delete Account */}
      <div>
        {" "}
        <Link to="/deleteAccount" label="DeleteAccount">
          {" "}
          Delete Account{" "}
        </Link>
      </div>
      <br />
      <input
        type="button"
        value={loading ? "Loading..." : "Login"}
        onClick={handleLogin}
        disabled={loading}
      />
      <br />
    </div>
  );
}

const useFormInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return {
    value,
    onChange: handleChange,
  };
};

export default Login;
