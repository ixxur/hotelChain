import React from 'react';
import './App.css';
import { useState } from "react";
import Axios from "axios";

function Regim_cazare() {
  const [idregim, setIDregim] = useState(0);
  const [nume, setNume] = useState("");
  const [tarif, setTarif] = useState(0);

  const [regimList, setRegimList] = useState([]);

  const addRegim = () => {
    Axios.post("http://localhost:3001/createRegim", {
      idregim: idregim,
      nume: nume,
      tarif: tarif,
    }).then(() => {
      setRegimList([
        ...regimList,
        {
          idregim: idregim,
      nume: nume,
      tarif: tarif,
        },
      ]);
    });
  };

  const getRegim = () => {
    Axios.get("http://localhost:3001/regimuri").then((response) => {
      setRegimList(response.data);
    });
  };

  return (
    <div className="Regim">
      <h3>Bine ati venit pe pagina regimurilor de cazare!</h3>
      <div className="DateRegim">
        <label>Id regim</label>
        <input
          type="number"
          onChange={(event) => {
            setIDregim(event.target.value);
          }}
        />
        <label>Nume regim</label>
        <input
          type="text"
          onChange={(event) => {
            setNume(event.target.value);
          }}
        />
        <label>Tarif regim (euro)</label>
        <input
          type="number"
          onChange={(event) => {
            setTarif(event.target.value);
          }}
        />
        <button onClick={addRegim}>Adauga regim</button>
      </div>
      <div className="AfisajRegim">
        <button onClick={getRegim}>Afiseaza regimuri</button>

        {regimList.map((val, key) => {
          return (
            <div className="ShowRegim">
              <h3>Id regim: {val.id_regim}</h3>
              <h3>Nume regim: {val.nume_regim}</h3>
              <h3>Tarif: {val.tarif_regim}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Regim_cazare;