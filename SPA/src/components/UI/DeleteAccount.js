import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import "../UI/General.css";
import "../../App.css";
import Modal from "react-modal";
import Links from "../Links"

function DeleteAccount() {
  // useEffect(() => {
  //   fetchUsers();
  // }, []);

  const [loading, setLoading] = useState(false);
  const mail = useFormInput("");
  const password = useFormInput("");
  const [error, setError] = useState(null);
  const [result, setResult] = useState([]);

  // handle button click of login form
  const handleLogin = () => {
    setError(null);
    setLoading(true);
    let url = Links.MDV_URL()+"/api/User/" + mail.value;
    axios.delete(url).then((response) => {
      setLoading(false);
      setResult("Account deleted with success!");
      openModal()
      window.location.replace(Links.UVM_URL());
      return response.data;
    }).catch(function(error){
      setResult("Error deleting account!");
      openModal();  
      setLoading(false);
      return error.toString();
    })
  };

  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    setResult("");
  }
  return (
    <div>
      Delete Account
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
      
      <div>Are you sure you want to delete your account?
            
          <input
              type="checkbox"  required value="true"
              id="rgpd"
            />
            
          </div>
      
      <input
        type="button"
        value={loading ? "Loading..." : "Delete"}
        onClick={handleLogin}
        disabled={loading}
      />
      
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className="Modal" >
        <span className="close" onClick={closeModal}>
          &times;
        </span>
        <div className="popup">{result}</div>
      </Modal>
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

export default DeleteAccount;
