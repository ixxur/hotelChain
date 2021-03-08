import React from 'react';
import './App.css';
import { useState } from "react";
import Axios from "axios";

function Camera() {
  const [idcamera, setIDcamera] = useState(0);
  const [idhotel, setIDhotel] = useState(0);
  const [idtip, setIDtip] = useState(0);
  const [nrcamera, setNrcamera] = useState(0);
  const [tarif, setTarif] = useState(0);
  const [etaj, setEtaj] = useState(0);

  const [cameraList, setCameraList] = useState([]);

  const addCamera = () => {
    Axios.post("http://localhost:3001/createCamera", {
      idcamera: idcamera,
      idhotel: idhotel,
      idtip: idtip,
      nrcamera: nrcamera,
      tarif: tarif,
      etaj: etaj,
    }).then(() => {
      setCameraList([
        ...cameraList,
        {
          idcamera: idcamera,
      idhotel: idhotel,
      idtip: idtip,
      nrcamera: nrcamera,
      tarif: tarif,
      etaj: etaj,
        },
      ]);
    });
  };

  const getCamera = () => {
    Axios.get("http://localhost:3001/camere").then((response) => {
      setCameraList(response.data);
    });
  };

  return (
    <div className="Camera">
      <h3>Bine ati venit pe pagina camerelor!</h3>
      <div className="DateCamera">
        <label>Id camera</label>
        <input
          type="number"
          onChange={(event) => {
            setIDcamera(event.target.value);
          }}
        />
        <label>Id hotel</label>
        <input
          type="number"
          onChange={(event) => {
            setIDhotel(event.target.value);
          }}
        />
        <label>Id tip</label>
        <input
          type="number"
          onChange={(event) => {
            setIDtip(event.target.value);
          }}
        />
        <label>Nr. camera</label>
        <input
          type="number"
          onChange={(event) => {
            setNrcamera(event.target.value);
          }}
        />
        <label>Tarif (euro)</label>
        <input
          type="number"
          onChange={(event) => {
            setTarif(event.target.value);
          }}
        />
        <label>Etaj</label>
        <input
          type="number"
          onChange={(event) => {
            setEtaj(event.target.value);
          }}
        />
        <button onClick={addCamera}>Adauga camera</button>
      </div>
      <div className="AfisajCamera">
        <button onClick={getCamera}>Afiseaza camere</button>

        {cameraList.map((val, key) => {
          return (
            <div className="ShowCamera">
              <h3>Id Camera: {val.id_camera}</h3>
              <h3>Id hotel: {val.id_hotel}</h3>
              <h3>Id tip: {val.id_tip}</h3>
              <h3>Nr. camera: {val.nr_camera}</h3>
              <h3>Tarif (euro): {val.tarif}</h3>
              <h3>Etaj: {val.etaj}</h3>\
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Camera;
