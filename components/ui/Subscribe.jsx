import React from "react";
import classes from "./ui.module.css"
const Subscribe = ({rtl})=>{
     return(
        <div className={classes.emailing} style={{direction: rtl? "rtl":""}}>
        <h3>{rtl? "قائمة الرسائل" : "Mailing List"}</h3>
        <p>{rtl? "لتبقى على اطلاع بأخبار وزارة النقل يرجى الاشتراك في القائمة البريدية" : <>To keep up-to-date with the news of the Ministry <br/> of Transport, Please subscribe to the mailing list</>}</p>
        <div className={classes.emaillist}>
          <input type="email" placeholder="Email" />
           <button style={{left: rtl? "0": "", right: rtl? "" : "0"}}>{rtl? "اشتراك" : "Subscribe"}</button>
        </div>
     </div>
     )
}
export default Subscribe;