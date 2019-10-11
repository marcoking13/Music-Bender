import React from "react";
import {Link} from "react-router-dom";

import "./../../css/search.css";
import "./../../css/landing.css";

export default class NavbarMobile extends React.Component {
  render(){
    return(
        <div className="container-fluid">
          <div className="row">

            <div className="col-6">
              <img className="landingLogo fl w50" src="assets/images/logo.png"/>
              <p className=" cw landingTitle mt10 bold fl">Music Bender</p>

            </div>




            <div className="col-6">

              <div className="links">
                  <ul>
                    <li className="cw nol ml2_5 f10 turnBold brW fr"> About</li>

                    <li className="cw nol ml2_5 f10 turnBold fr"> Download</li>
                  </ul>

                </div>

              </div>

            </div>

        </div>
      );
  }
}
