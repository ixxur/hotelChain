import React from "react";
import "./App.css";
import { useState } from "react";
import Axios from "axios";
import Moment from "moment";

function Rezervare() {
  const [idrezervare, setIDrezervare] = useState(0);
  const [cnp, setCnp] = useState("");
  const [idregim, setIDregim] = useState(0);
  const [dateBegin, setDateBegin] = useState(
    Moment(new Date()).format("yyyy-mm-dd")
  );
  const [dateEnd, setDateEnd] = useState(
    Moment(new Date()).format("yyyy-mm-dd")
  );
  const [nrpersoane, setNrpersoane] = useState(0);
  const [nrcamere, setNrcamere] = useState(0);
  const [total, setTotal] = useState(0);

  const [rezervareList, setRezervareList] = useState([]);

  const addRezervare = () => {
    Axios.post("http://localhost:3001/createRezervare", {
      idrezervare: idrezervare,
      cnp: cnp,
      idregim: idregim,
      dateBegin: dateBegin,
      dateEnd: dateEnd,
      nrpersoane: nrpersoane,
      nrcamere: nrcamere,
      total: total,
    }).then(() => {
      setRezervareList([
        ...rezervareList,
        {
          idrezervare: idrezervare,
          cnp: cnp,
          idregim: idregim,
          dateBegin: dateBegin,
          dateEnd: dateEnd,
          nrpersoane: nrpersoane,
          nrcamere: nrcamere,
          total: total,
        },
      ]);
    });
  };

  const getRezervare = () => {
    Axios.get("http://localhost:3001/rezervari").then((response) => {
      setRezervareList(response.data);
    });
  };

  return (
    <div className="Rezervare">
      <h3>Bine ati venit pe pagina rezervarilor!</h3>
      <div className="DateRezervare">
        <label>Id rezervare</label>
        <input
          type="number"
          onChange={(event) => {
            setIDrezervare(event.target.value);
          }}
        />
        <label>CNP</label>
        <input
          type="text"
          onChange={(event) => {
            setCnp(event.target.value);
          }}
        />
        <label>Id regim</label>
        <input
          type="number"
          onChange={(event) => {
            setIDregim(event.target.value);
          }}
        />
        <label>Data checkin</label>
        <input
          type="date"
          onChange={(event) => {
            setDateBegin(event.target.value);
          }}
        />
        <label>Data checkout</label>
        <input
          type="date"
          onChange={(event) => {
            setDateEnd(event.target.value);
          }}
        />
        <label>Nr. persoane</label>
        <input
          type="number"
          onChange={(event) => {
            setNrpersoane(event.target.value);
          }}
        />
        <label>Nr. camere</label>
        <input
          type="number"
          onChange={(event) => {
            setNrcamere(event.target.value);
          }}
        />
        <label>Total plata</label>
        <input
          type="number"
          onChange={(event) => {
            setTotal(event.target.value);
          }}
        />
        <button onClick={addRezervare}>Adauga rezervare</button>
      </div>
      <div className="AfisajRezervare">
        <button onClick={getRezervare}>Afiseaza rezervari</button>

        {rezervareList.map((val, key) => {
          return (
            <div className="ShowRezervare">
              <h3>Id rezervare: {val.id_rezervare}</h3>
              <h3>CNP: {val.CNP}</h3>
              <h3>Id regim: {val.id_regim}</h3>
              <h3>Data checkin: {val.data_checkin}</h3>
              <h3>Data checkout: {val.data_checkout}</h3>
              <h3>Nr. persoane: {val.nr_persoane}</h3>
              <h3>Nr. camere: {val.nr_camere}</h3>
              <h3>Total plata: {val.total_plata}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Rezervare;
