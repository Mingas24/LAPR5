import React from "react";
import "../UI/General.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Links from "../Links"

function Logout() {

    return (
        <div>
            <button
                data-testid="lineAddLinePathTest"
                type="button"
                className="buttonCreate"
                onClick={window.location.replace(Links.UVM_URL())}>
            </button>
        </div>
    );
}

export default Logout;
