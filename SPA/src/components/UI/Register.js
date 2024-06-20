import React, { useState } from "react";
import "../../App.css";
import "../UI/General.css";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import {Link} from "react-router-dom";
import Links from "../Links"

function Register() {
  const { register, handleSubmit } = useForm();

  const [selectedRole, setselectedRole] = useState("");
  const [result, setResult] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const onSubmit = (data) => {
    console.log(JSON.stringify(data));
    fetch( Links.MDV_URL()+"/api/User", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // We convert the React state to JSON and send it as the POST body
      body: JSON.stringify(data),
    })
      .then((response) => {
        console.log(response.status);
        if (!response.ok) {
          const error = data.message || response.status;
          setResult("Error creating new User!");
          return error.toString();
        }
        setResult("User created with success!");
        window.location.replace( Links.UVM_URL())
        return response.json();
      })
      .then((data) => console.log(data));
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
    <div className="divRegisterUI" data-testid="registerTest">
      <h1>Register an User</h1>
      <div className="divCreate" data-testid="registerTest">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label data-testid="mailTextTest">Mail: </label>
          <input
            data-testid="mailTest"
            type="textInput"
            name="mail"
            ref={register}
            placeholder="Mail of the User"
          />
          <br />
          <label data-testid="NameTextTest">Name: </label>
          <input
            data-testid="nameTest"
            type="textInput"
            name="name"
            ref={register}
            placeholder="Name of the User"
          />
          <br />
          <label data-testid="addressTest">Address: </label>
          <input
            data-testid="addressTest"
            type="textInput"
            name="address"
            ref={register}
            placeholder="Address of the User"
          />
          <br />
          <label data-testid="pNumberTest">Phone Number: </label>
          <input
            data-testid="pNumberTest"
            type="number"
            name="pNumber"
            ref={register}
            placeholder="Phone Number of the User"
          />
          <br />
          <br />
          <label data-testid="birthTest">Date of birth: </label>
          <input
            data-testid="birthTest"
            type="textInput"
            name="age"
            ref={register}
            placeholder="Date of birth of the User"
          />
          <br />
          <label data-testid="roleTest">Role: </label>
          <select
            data-testid="roleSelectTest"
            onChange={(e) => setselectedRole(e.target.value)}
          >
            <option data-testid="roleNormalTest" value={"Normal"} selected>
              Normal
            </option>
            <option data-testid="roleAdminTest" value={"Admin"} selected>
              Admin
            </option>
            <option selected disabled hidden>
              Role
            </option>
          </select>
          <div className="pass-wrapper">
            <label data-testid="passTest">Password: </label>
            <input
              type={passwordShown ? "text" : "password"}
              data-testid="passTest"
              name="pass"
              ref={register}
              placeholder="Password of the User"
            />
          </div>
          <br />
          <input
            data-testid="roleTest"
            type="hidden"
            name="role"
            value={selectedRole}
            ref={register}
          />
          <br />
          {/* Terms of Use */}
          <div>Clicking Register account means that you agree to the <Link to="/termsOfUse" label="TermsOfUse" > Terms of Use </Link>
            and <Link to="/privacyPolicy" label="TermsOfUse" > Policy Privacy </Link>
          <input
              type="checkbox"  required value="true"
              id="rgpd"
            />
            
          </div>
          
          <br />
          <input
            data-testid="submitTest"
            type="submit"
            value="Submit"
            onClick={openModal}
          />
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            className="Modal"
          >
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <div className="popup">{result}</div>
          </Modal>
        </form>
      </div>
    </div>
  );
}

export default Register;
