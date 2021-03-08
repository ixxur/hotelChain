import React from "react";
import "./App.css";
import Axios from "axios";
import {useState} from 'react';
function Subd() {

    const [platiList, setPlatiList] = useState([]); 
    const [platiVis, setPlatiVis] = useState(false);

    const having = () => {
        if(platiVis==true) {
            setPlatiVis(false)
        } else if(platiVis == false) 
        {
            setPlatiVis(true);
        Axios.get("http://localhost:3001/having").then((response) => {
                    setPlatiList(response.data);
        });
    }
      };
    return (
        <div className="Subd">
            <h3>Subpunctul d)</h3>
            <button onClick={having}>Apasa-ma</button>
                <div className = {`${platiVis == true ? "vis" : "invis"}`}>
                    {platiList.map((val,key) => {
                        return <div className ="having">
                            <label>ID rezervare: {val.id_rezervare}</label>
                            <label>Suma totala: {val.total_suma}</label>
                        </div>
                    })}
                </div> 
        </div>
    );

}

export default Subd;