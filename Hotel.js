import React from "react";
import "./App.css";
import { useState } from "react";
import Axios from "axios";

function Hotel() {
  const [idhotel, setIDhotel] = useState(0);
  const [nrstele, setNrstele] = useState(0);
  const [tara, setTara] = useState("");
  const [oras, setOras] = useState("");
  const [strada, setStrada] = useState("");
  const [zip, setZip] = useState("");
  const [nrtel, setNrtel] = useState("");

  const [newNrstele, setNewnrstele] = useState(0);
  const [newTara, setNewtara] = useState("");
  const [newOras, setNeworas] = useState("");
  const [newStrada, setNewstrada] = useState("");
  const [newZip, setNewzip] = useState("");
  const [newNrtel, setNewnrtel] = useState("");

  const [hotelList, setHotelList] = useState([]);

  const addHotel = () => {
    Axios.post("http://localhost:3001/createHotel", {
      idhotel: idhotel,
      nrstele: nrstele,
      tara: tara,
      oras: oras,
      strada: strada,
      zip: zip,
      nrtel: nrtel,
    }).then(() => {
      setHotelList([
        ...hotelList,
        {
          idhotel: idhotel,
          nrstele: nrstele,
          tara: tara,
          oras: oras,
          strada: strada,
          zip: zip,
          nrtel: nrtel,
        },
      ]);
    });
  };

  const getHotel = () => {
    Axios.get("http://localhost:3001/hotels").then((response) => {
      setHotelList(response.data);
    });
  };

  const updateHotelNrstele = (id) => {
    Axios.put("http://localhost:3001/updateHotel_nrstele", {
      nrstele: newNrstele,
      id: id,
    }).then((response) => {
      setHotelList(
        hotelList.map((val) => {
          return val.id == id
            ? {
                id: val.id,
                nrstele: newNrstele,
                tara: val.tara,
                oras: val.oras,
                strada: val.strada,
                zip: val.zip,
                nrtel: val.nrtel,
              }
            : val;
        })
      );
    });
  };

  const updateHotelTara = (idhotel) => {
    Axios.put("http://localhost:3001/updateHotel_tara", {
      tara: newTara,
      idhotel: idhotel,
    }).then((response) => {
      setHotelList(
        hotelList.map((val) => {
          return val.idhotel == idhotel
            ? {
                idhotel: val.idhotel,
                nrstele: val.nrstele,
                tara: newTara,
                oras: val.oras,
                strada: val.strada,
                zip: val.zip,
                nrtel: val.nrtel,
              }
            : val;
        })
      );
    });
  };

  const updateHotelOras = (idhotel) => {
    Axios.put("http://localhost:3001/updateHotel_oras", {
      oras: newOras,
      idhotel: idhotel,
    }).then((response) => {
      setHotelList(
        hotelList.map((val) => {
          return val.idhotel == idhotel
            ? {
                idhotel: val.idhotel,
                nrstele: val.nrstele,
                tara: val.tara,
                oras: newOras,
                strada: val.strada,
                zip: val.zip,
                nrtel: val.nrtel,
              }
            : val;
        })
      );
    });
  };

  const updateHotelStrada = (idhotel) => {
    Axios.put("http://localhost:3001/updateHotel_strada", {
      strada: newStrada,
      idhotel: idhotel,
    }).then((response) => {
      setHotelList(
        hotelList.map((val) => {
          return val.idhotel == idhotel
            ? {
                idhotel: val.idhotel,
                nrstele: val.nrstele,
                tara: val.tara,
                oras: val.oras,
                strada: newStrada,
                zip: val.zip,
                nrtel: val.nrtel,
              }
            : val;
        })
      );
    });
  };

  const updateHotelZip = (idhotel) => {
    Axios.put("http://localhost:3001/updateHotel_zip", {
      zip: newZip,
      idhotel: idhotel,
    }).then((response) => {
      setHotelList(
        hotelList.map((val) => {
          return val.idhotel == idhotel
            ? {
                idhotel: val.idhotel,
                nrstele: val.nrstele,
                tara: val.tara,
                oras: val.oras,
                strada: val.strada,
                zip: newZip,
                nrtel: val.nrtel,
              }
            : val;
        })
      );
    });
  };

  const updateHotelNrtel = (idhotel) => {
    Axios.put("http://localhost:3001/updateHotel_nrtelefon", {
      nrtel: newNrtel,
      idhotel: idhotel,
    }).then((response) => {
      setHotelList(
        hotelList.map((val) => {
          return val.idhotel == idhotel
            ? {
                idhotel: val.idhotel,
                nrstele: val.nrstele,
                tara: val.tara,
                oras: val.oras,
                strada: val.strada,
                zip: val.zip,
                nrtel: newNrtel,
              }
            : val;
        })
      );
    });
  };

  const deleteHotel = (idhotel) => {
    Axios.put("http://localhost:3001/deleteHotel", {
      idhotel: idhotel,
    }).then((response) => {
      console.log("Succes");
    });
  };

  return (
    <div className="Hotel">
      <h3>Bine ati venit pe pagina hotelurilor!</h3>
      <div className="DateHotel">
        <label>Id hotel</label>
        <input
          type="number"
          onChange={(event) => {
            setIDhotel(event.target.value);
          }}
        />
        <label>Nr. stele</label>
        <input
          type="number"
          onChange={(event) => {
            setNrstele(event.target.value);
          }}
        />
        <label>Tara</label>
        <input
          type="text"
          onChange={(event) => {
            setTara(event.target.value);
          }}
        />
        <label>Oras</label>
        <input
          type="text"
          onChange={(event) => {
            setOras(event.target.value);
          }}
        />
        <label>Strada</label>
        <input
          type="text"
          onChange={(event) => {
            setStrada(event.target.value);
          }}
        />
        <label>ZIP</label>
        <input
          type="text"
          onChange={(event) => {
            setZip(event.target.value);
          }}
        />
        <label>Nr. telefon</label>
        <input
          type="text"
          onChange={(event) => {
            setNrtel(event.target.value);
          }}
        />
        <button onClick={addHotel}>Adauga hotel</button>
      </div>
      <div className="AfisajHotel">
        <button onClick={getHotel}>Afiseaza hoteluri</button>

        {hotelList.map((val, key) => {
          return (
            <div className="ShowHotel">
              <div>
                <h3>Id Hotel:{val.id_hotel}</h3>
                <h3>Nr. stele:{val.nr_stele}</h3>
                <h3>Tara: {val.tara}</h3>
                <h3>Oras: {val.oras}</h3>
                <h3>Strada: {val.strada}</h3>
                <h3>ZIP: {val.zip}</h3>
                <h3>Nr. telefon: {val.nr_telefon}</h3>
              </div>
              <div>
                {" "}
                <input
                  type="text"
                  placeholder="3..."
                  onChange={(event) => {
                    setNewnrstele(event.target.value);
                  }}
                />
                <button
                  onClick={() => {
                    updateHotelNrstele(val.id);
                  }}
                >
                  Modifica nr. stele
                </button>
                <input
                  type="text"
                  placeholder="3..."
                  onChange={(event) => {
                    setNewtara(event.target.value);
                  }}
                />
                <button
                  onClick={() => {
                    updateHotelTara(val.idhotel);
                  }}
                >
                  Modifica tara
                </button>
                <input
                  type="text"
                  placeholder="3..."
                  onChange={(event) => {
                    setNeworas(event.target.value);
                  }}
                />
                <button
                  onClick={() => {
                    updateHotelOras(val.idhotel);
                  }}
                >
                  Modifica orasul
                </button>
                <input
                  type="text"
                  placeholder="3..."
                  onChange={(event) => {
                    setNewstrada(event.target.value);
                  }}
                />
                <button
                  onClick={() => {
                    updateHotelStrada(val.idhotel);
                  }}
                >
                  Modifica strada
                </button>
                <input
                  type="text"
                  placeholder="3..."
                  onChange={(event) => {
                    setNewzip(event.target.value);
                  }}
                />
                <button
                  onClick={() => {
                    updateHotelZip(val.idhotel);
                  }}
                >
                  Modifica ZIP
                </button>
                <input
                  type="text"
                  placeholder="3..."
                  onChange={(event) => {
                    setNewnrtel(event.target.value);
                  }}
                />
                <button
                  onClick={() => {
                    updateHotelNrtel(val.idhotel);
                  }}
                >
                  Modifica nr. telefon
                </button>
                <button onClick={()=>{deleteHotel(val.id_hotel)}}>Sterge</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Hotel;
