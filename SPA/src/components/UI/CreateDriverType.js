import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import '../../App.css';
import './General.css'
import Links from "../Links"

function CreateDriverType() {

  const { register, handleSubmit } = useForm();
  const [result, setResult] = useState("");
  const onSubmit = (data) => {
    //console.log(JSON.stringify(data));
    fetch(Links.MDR_URL() + "/api/driver", {
      method: "POST",
      headers: { //"Accept": "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      //body: data
      body: JSON.stringify(data)
    }).then((response) => {
      console.log(response.status);
      if (!response.ok) {
        const error = data.message || response.status;
        setResult("Error creating new Driver Type!");
        return error.toString();
      }
      setResult("Driver Type created with success!");
      console.log(response.status);
      return response.json();
    })
      .then((data) => console.log(data));
  };


  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setIsOpen(false);
    setResult("");
  }

  return (
    <div>
      <h1>Create New Driver Type</h1>
      <div className="CreateDriverType" data-testid="createDriverTypeTest">
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset>
            <label>
              <p>id</p>
              <input
                data-testid="codeDriverTypeTest"
                type="textInput"
                name="id"
                ref={register}
                placeholder="Code of the new Driver Type"
              />
              {/* <input name="code" onChange={(e) => this.handleFileChange(e)} /> */}
              <p>Description</p>
              <input
                data-testid="descriptionDriverTypeTest"
                type="textInput"
                name="description"
                ref={register}
                placeholder="Description of the new Driver Type"
              />
              <br />
              <br />
              <input type="submit" value="Submit" data-testid="submitTest" onClick={openModal} />
              <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                className="Modal"
              >
                <span className="close" onClick={closeModal}>&times;</span>
                <div className="popup">{result}</div>
              </Modal>
            </label>
          </fieldset>
        </form>
      </div>
    </div>
  );
}
export default CreateDriverType;
