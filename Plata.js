import React from "react";
import "./App.css";
import { useState } from "react";
import Axios from "axios";

function Plata() {
  const [idplata, setIDplata] = useState(0);
  const [idrezervare, setIDrezervare] = useState(0);
  const [nrcard, setNrcard] = useState("");
  const [cvv, setCvv] = useState(0);
  const [suma, setSuma] = useState(0);

  const [plataList, setPlataList] = useState([]);

  const addPlata = () => {
    Axios.post("http://localhost:3001/createPlata", {
      idplata: idplata,
      idrezervare: idrezervare,
      nrcard: nrcard,
      cvv: cvv,
      suma: suma,
    }).then(() => {
      setPlataList([
        ...plataList,
        {
          idplata: idplata,
          idrezervare: idrezervare,
          nrcard: nrcard,
          cvv: cvv,
          suma: suma,
        },
      ]);
    });
  };

  const getPlata = () => {
    Axios.get("http://localhost:3001/plati").then((response) => {
      setPlataList(response.data);
    });
  };

  return (
    <div className="Plata">
      <h3>Bine ati venit pe pagina platilor!</h3>
      <div className="DatePlata">
        <label>Id plata</label>
        <input
          type="number"
          onChange={(event) => {
            setIDplata(event.target.value);
          }}
        />
        <label>Id rezervare</label>
        <input
          type="number"
          onChange={(event) => {
            setIDrezervare(event.target.value);
          }}
        />
        <label>Nr. card</label>
        <input
          type="text"
          onChange={(event) => {
            setNrcard(event.target.value);
          }}
        />
        <label>CVV</label>
        <input
          type="number"
          onChange={(event) => {
            setCvv(event.target.value);
          }}
        />
        <label>Suma</label>
        <input
          type="number"
          onChange={(event) => {
            setSuma(event.target.value);
          }}
        />
        <button onClick={addPlata}>Adauga plata</button>
      </div>
      <div className="AfisajPlata">
        <button onClick={getPlata}>Afiseaza plati</button>

        {plataList.map((val, key) => {
          return (
            <div className="ShowPlata">
              <h3>Id plata: {val.id_plata}</h3>
              <h3>Id rezervare: {val.id_rezervare}</h3>
              <h3>Nr. card: {val.nr_card}</h3>
              <h3>CVV: {val.cvv}</h3>
              <h3>Suma: {val.suma}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Plata;
