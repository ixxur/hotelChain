import React from "react";
import "./App.css";
import { useState } from "react";
import Axios from "axios";
import Moment from "moment";

function Angajat() {
  const [idangajat, setIDangajat] = useState(0);
  const [idhotel, setIDhotel] = useState(0);
  const [nume, setNume] = useState("");
  const [prenume, setPrenume] = useState("");
  const [email, setEmail] = useState("");
  const [nrtel, setNrtel] = useState("");
  const [salariu, setSalariu] = useState(0);
  const [dateBegin, setDateBegin] = useState(
    Moment(new Date()).format("yyyy-mm-dd")
  );
  const [dateEnd, setDateEnd] = useState(null);
  const [departament, setDepartament] = useState("");

  const [angajatList, setAngajatList] = useState([]);

  const addAngajat = () => {
    Axios.post("http://localhost:3001/createAngajat", {
      idangajat: idangajat,
      idhotel: idhotel,
      nume: nume,
      prenume: prenume,
      email: email,
      nrtel: nrtel,
      salariu: salariu,
      dateBegin: dateBegin,
      dateEnd: dateEnd,
      departament: departament,
    }).then(() => {
      setAngajatList([
        ...angajatList,
        {
          idangajat: idangajat,
          idhotel: idhotel,
          nume: nume,
          prenume: prenume,
          email: email,
          nrtel: nrtel,
          salariu: salariu,
          dateBegin: dateBegin,
          dateEnd: dateEnd,
          departament: departament,
        },
      ]);
    });
  };

  const getAngajat = () => {
    Axios.get("http://localhost:3001/angajati").then((response) => {
      setAngajatList(response.data);
    });
  };

  return (
    <div className="Angajat">
      <h3>Bine ati venit pe pagina angajatilor!</h3>
      <div className="DateAngajat">
        <label>Id angajat</label>
        <input
          type="number"
          onChange={(event) => {
            setIDangajat(event.target.value);
          }}
        />
        <label>Id hotel </label>
        <input
          type="number"
          onChange={(event) => {
            setIDhotel(event.target.value);
          }}
        />
        <label>Nume </label>
        <input
          type="text"
          onChange={(event) => {
            setNume(event.target.value);
          }}
        />
        <label>Prenume </label>
        <input
          type="text"
          onChange={(event) => {
            setPrenume(event.target.value);
          }}
        />
        <label>Email </label>
        <input
          type="text"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <label>Nr. telefon </label>
        <input
          type="text"
          onChange={(event) => {
            setNrtel(event.target.value);
          }}
        />
        <label>Salariu </label>
        <input
          type="number"
          onChange={(event) => {
            setSalariu(event.target.value);
          }}
        />
        <label>Data angajarii </label>
        <input
          type="date"
          onChange={(event) => {
            setDateBegin(event.target.value);
          }}
        />
        <label>Data eliberare post </label>
        <input
          type="date"
          onChange={(event) => {
            setDateEnd(event.target.value);
          }}
        />
        <label>Departament </label>
        <input
          type="text"
          onChange={(event) => {
            setDepartament(event.target.value);
          }}
        />

        <button onClick={addAngajat}>Adauga angajat</button>
      </div>
      <div className="AfisajAngajat">
        <button onClick={getAngajat}>Afiseaza angajati</button>

        {angajatList.map((val, key) => {
          return (
            <div className="ShowAngajat">
              <h3>Id Angajat: {val.id_angajat}</h3>
              <h3>Id Hotel:{val.id_hotel}</h3>
              <h3>Nume:{val.nume}</h3>
              <h3>Prenume: {val.prenume}</h3>
              <h3>Email: {val.email}</h3>
              <h3>Nr. telefon: {val.nr_telefon}</h3>
              <h3>Salariu: {val.salariu}</h3>
              <h3>Data angajarii: {val.data_angajare}</h3>
              <h3>Data eliberare post: {val.data_eliberare}</h3>
              <h3>Departament: {val.departament}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Angajat;
