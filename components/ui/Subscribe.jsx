import React, { useState } from "react";
import classes from "./ui.module.css"
import { API_ROUTES } from "@/utils/apiConfig";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useFontSize } from "@/store/FontSizeContext";
const Subscribe = ({rtl})=>{
   const [email, setEmail] = useState(""); 
   const {fontSizeGeneral} = useFontSize();
   const notify = (msg) => toast(msg  );
   const handleSubscribe = async () => {
      try {
         console.log(API_ROUTES.subscribe.post)
        const response = await axios.post(API_ROUTES.subscribe.post, { email: email });
        console.log("Subscription successful:", response.data);
        notify(response.data.errorMessage);
        setEmail("")
        // You can add further actions like showing a success message to the user
      } catch (error) {
        console.error("Error subscribing:", error?.response.data.errorMessage);
        notify(error.response.data.errorMessage)
        // Handle error, show error message, etc.
      }
    };
     return(
        <div className={classes.emailing} style={{direction: rtl? "rtl":""}}  >
        <h3 style={{fontFamily: rtl? "DINNext-Arabic-meduim " : "", fontSize: `${19 + fontSizeGeneral}px`}}>{rtl? "القائمة البريدية" : "Mailing List"}</h3>
        <p style={{fontFamily: rtl? "DINNext-Arabic-meduim " : "", fontSize: `${11 + fontSizeGeneral}px`}} >{rtl? "لتبقى على اطلاع بأخبار وزارة النقل يرجى الاشتراك في القائمة البريدية" : <>To keep up-to-date with the news of the Ministry <br/> of Transport, Please subscribe to the mailing list</>}</p>
        <div className={classes.emaillist}>
          <input style={{fontFamily: rtl? "DINNext-Arabic-meduim " : ""}} type="email" placeholder={rtl? "يرجى كتابة الإيميل الخاص بك" : "Email"} 
          value={email} onChange={(e)=>{setEmail(e.target.value)}}
          />
           <button style={{left: rtl? "40px": "", right: rtl? "" : "0", fontFamily: rtl? "DINNext-Arabic-meduim " : ""}} onClick={handleSubscribe}>{rtl? "اشتراك" : "Subscribe"}</button>
        </div>
        <Toaster />
     </div>
     )
}
export default Subscribe;