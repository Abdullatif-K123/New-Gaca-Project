import React from "react";
import classes from "./sub-section.module.css"
import { TextField } from "@mui/material";
const SubSection = ()=>{
     return(
         <div className={classes.subMainSection}>
             <h1>SUBSCRIBE TO GET ALL NEW</h1>
              <div className={classes.emailPart}>
                  <input type="text" className={classes.email} placeholder="EMAIL ADDRESS" />
                   <button>SEND</button>
              </div>
         </div>
     )
}
export default SubSection; 