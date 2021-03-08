import React from 'react';
import './App.css';
import { useState } from "react";
import Axios from "axios";

function Tip_camera() {

  const [idtip, setIDtip] = useState(0);
  const [denumire, setDenumire] = useState("");
  const [nrpaturi, setNrpaturi] = useState(0);
  const [capacitate, setCapacitate] = useState(0);

  const [tipList, setTipList] = useState([]);

  const addTip = () => {
    Axios.post("http://localhost:3001/createTip", {
      idtip: idtip,
      denumire: denumire,
      nrpaturi: nrpaturi,
      capacitate: capacitate,
    }).then(() => {
      setTipList([
        ...tipList,
        {
          idtip: idtip,
      denumire: denumire,
      nrpaturi: nrpaturi,
      capacitate: capacitate,
        },
      ]);
    });
  };

  const getTip = () => {
    Axios.get("http://localhost:3001/tipuri").then((response) => {
      setTipList(response.data);
    });
  };

  return (

    <div className="Tip">
      <h3>Bine ati venit pe pagina tipurilor de camere!</h3>
      <div className="DateTip">
        <label>Id tip</label>
        <input
          type="number"
          onChange={(event) => {
            setIDtip(event.target.value);
          }}
        />
        <label>Denumire tip</label>
        <input
          type="text"
          onChange={(event) => {
            setDenumire(event.target.value);
          }}
        />
        <label>Nr. paturi</label>
        <input
          type="number"
          onChange={(event) => {
            setNrpaturi(event.target.value);
          }}
        />
        <label>Capacitate maxima</label>
        <input
          type="number"
          onChange={(event) => {
            setCapacitate(event.target.value);
          }}
        />
        <button onClick={addTip}>Adauga tip</button>
      </div>
      <div className="AfisajTip">
        <button onClick={getTip}>Afiseaza tipuri</button>

        {tipList.map((val, key) => {
          return (
            <div className="ShowTip">
              <h3>Id tip:{val.id_tip}</h3>
              <h3>Denumire:{val.denumire_tip}</h3>
              <h3>Nr. paturi:{val.nr_paturi}</h3>
              <h3>Capacitate max.:{val.capacitate_maxima}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Tip_camera;