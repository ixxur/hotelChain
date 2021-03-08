import React from "react";
import "./App.css";
import { useState } from "react";
import Axios from "axios";

function Client() {
  const [cnp, setCNP] = useState("");
  const [nume, setNume] = useState("");
  const [prenume, setPrenume] = useState("");
  const [email, setEmail] = useState("");
  const [nrtel, setNrtel] = useState("");

  const [clientList, setClientList] = useState([]);

  const addClient = () => {
    Axios.post("http://localhost:3001/createClient", {
      cnp: cnp,
      nume: nume,
      prenume: prenume,
      email: email,
      nrtel: nrtel,
    }).then(() => {
      setClientList([
        ...clientList,
        {
          cnp: cnp,
          nume: nume,
          prenume: prenume,
          email: email,
          nrtel: nrtel,
        },
      ]);
    });
  };

  const getClient = () => {
    Axios.get("http://localhost:3001/clienti").then((response) => {
      setClientList(response.data);
    });
  };

  return (
    <div className="cLlient">
      <h3>Bine ati venit pe pagina clientilor!</h3>
      <div className="DateClient">
        <label>CNP</label>
        <input
          type="text"
          onChange={(event) => {
            setCNP(event.target.value);
          }}
        />
        <label>Nume:</label>
        <input
          type="text"
          onChange={(event) => {
            setNume(event.target.value);
          }}
        />
        <label>Prenume</label>
        <input
          type="text"
          onChange={(event) => {
            setPrenume(event.target.value);
          }}
        />
        <label>Email:</label>
        <input
          type="text"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <label>Nr. telefon</label>
        <input
          type="text"
          onChange={(event) => {
            setNrtel(event.target.value);
          }}
        />
        <button onClick={addClient}>Adauga client</button>
      </div>
      <div className="AfisajClient">
        <button onClick={getClient}>Afiseaza clienti</button>

        {clientList.map((val, key) => {
          return (
            <div className="ShowClient">
              <h3>CNP:{val.CNP}</h3>
              <h3>Nume:{val.nume}</h3>
              <h3>Prenume: {val.prenume}</h3>
              <h3>Email: {val.email}</h3>
              <h3>Nr. telefon: {val.nr_telefon}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Client;
