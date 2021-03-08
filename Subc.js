import React from "react";
import "./App.css";
import { useState } from "react";
import Axios from "axios";

function Subc() {


    const [cameraL, setCameraL] = useState([]);

const cerere = () => {
    Axios.get("http://localhost:3001/cerere").then((response) => {
                setCameraL(response.data);
    })

}
    
    return (
        <div className="Subc">
            <h3>Subpunctul c) Afisare camere din hotel de 5 stele cu capacitate maxima de 2 persoane</h3>
            <button onClick={cerere}>Apasa-ma</button>
                {cameraL.map((val,key) => {
                    return <div className = "cerere">
                        <label>Id camera: {val.id_camera}</label>
                        <label>Denumire tip: {val.denumire_tip}</label>
                        <label>Numar de stele: {val.nr_stele}</label> 
                    </div>
                })}
        </div>
    )
}

export default Subc;