import axios from 'axios';
import React, { Component } from 'react';
import Links from "../Links"

class ImportFile extends Component {

  state = {

    // Initially, no file is selected 
    selectedFile: null
  };

  // On file select (from the pop up) 
  onFileChange = event => {

    // Update the state 
    this.setState({ selectedFile: event.target.files[0] });

  };

  // On file upload (click the upload button) 
  onFileUpload = () => {

    // Create an object of formData 
    const formData = new FormData();

    // Update the formData object 
    formData.append(
      "fileImport",
      this.state.selectedFile,
    );

    axios.post(Links.MDR_URL()+"/api/import", formData).then(response => {
      if (response.status === 200) {
        alert("Import MDR File with Success");
      }
    }).catch(function (error) {
      if (error.response) {
        alert("Import MDR File Failed");
      }
    });
  };

  fileData = () => {

    if (this.state.selectedFile) {

      return (
        <div>
          <h2>File Details:</h2>
          <p>File Name: {this.state.selectedFile.name}</p>
        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h4>Choose before Pressing the Upload button</h4>
        </div>
      );
    }
  };

  render() {

    return (
      <div>
        <h1>
          Import File from MDR
            </h1>
        <div>
          <input type="file" accept=".xml,.glx" onChange={this.onFileChange} />
          <button onClick={this.onFileUpload}>
            Import
                </button>
        </div>
        {this.fileData()}
      </div>
    );
  }
}

export default ImportFile; 