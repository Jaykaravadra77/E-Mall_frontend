import React, { useState } from "react";
import "./checkbox.css";
function Checkboxcat({ category,filterHandler }) {

    let [cat, setCat] = useState([]);
   
    const handler = (id) => {
           
        return () => {
            let indexCat = cat.indexOf(id);
            // console.log(indexCat);
            let newCat = [...cat];
            if (indexCat === -1) {
                newCat.push(id);
            } else {
                newCat.splice(indexCat, 1);
            }
         
             setCat(newCat);
             filterHandler(newCat);
          

        }
      
    }
     

  
    return category.map((c, i) => (
        <div key={i}>
            <label >
                <input onChange={handler(c._id)}  type="checkbox" />
                <span className="label-text">{c.name}</span>
            </label>
       </div>

    ))
}


export default Checkboxcat;