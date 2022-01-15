import React, { useEffect } from "react";
import "./App.css";
import { useState } from "react";
import app from "./firebase";
import { getDatabase, ref, child, get, set } from "firebase/database";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,

} from "react-google-maps";
import ArrowKeysReact from 'arrow-keys-react';

const db = getDatabase(app);
const dbRef = ref(getDatabase());

function veriGuncelle(hiz = 0, yon = 10) {
  set(ref(db, "arac"), {
    hiz: hiz,
    yon: yon,
  });
}

function App() {
  const MapWithAMarker = withScriptjs(
    withGoogleMap((props) => (
      <GoogleMap defaultZoom={8} defaultCenter={{ lat: 38.55, lng: 35.55 }}>
      </GoogleMap>
    ))
  );
  
  // ArrowKeysReact.config({
  //   left: () => {
  //     console.log('left key detected.');
  //   },
  //   right: () => {
  //     console.log('right key detected.');
  //   },
  //   up: () => {
  //     console.log('up key detected.');
  //   },
  //   down: () => {
  //     console.log('down key detected.');
  //   }
  // });

  const sol = "🡨";
  const sol2 = "<<";
  const sag = "🡪";
  const sag2 = ">>";
  const ust = "🡩";
  const alt = "🡫";

  //counter gaz için direction direksiyon için
  //direksiyon 0-10 arası sola dönerken 10-20 arası sağa döner.
  const [counter, setCounter] = useState(0);
  const [direction, setDirection] = useState(10);

  useEffect(() => {
    get(child(dbRef, `arac`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          setCounter(data.hiz);
          setDirection(data.yon);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const artırmafonksiyonu = () => {
    if (counter >= 0 && counter < 100) {
      setCounter(counter + 1);
      veriGuncelle(counter + 1, direction);
    }
    if (counter === 100) {
      setCounter(counter);
    }
  };
  const azaltmafonksiyonu = () => {
    if (counter > 0 && counter <= 100) {
      setCounter(counter - 1);
      veriGuncelle(counter - 1, direction);
    }
  };

  const frenfonksiyonu = () => {
    setCounter(0);
    veriGuncelle(0);
  };

  const right = () => {
    if (direction >= 0 && direction <= 20) {
      setDirection(direction + 1);
      veriGuncelle(counter, direction + 1);
    }
  };

  const right2 = () => {
    if (direction >= 0 && direction <= 20) {
      setDirection(direction + 2);
      veriGuncelle(counter, direction + 2);
    }
  };

  const left = () => {
    if (direction > 0 && direction <= 20) {
      setDirection(direction - 1);
      veriGuncelle(counter, direction - 1);
    }
  };

  const left2 = () => {
    if (direction > 1 && direction <= 20) {
      setDirection(direction - 2);
      veriGuncelle(counter, direction - 2);
    }
  };

  return (
    <div className="App">
      <h3 style={{ color: "red" }}>ERCİYES OTONOM ARAÇ</h3>
      <div>
        <MapWithAMarker
        //google map için api key oluşturmalısınz.Aşağıda yazan your_api_key kısmına kendi apinizi yapıştırın.
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=Your_api_key&v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={
            <div style={{ height: `250px`, width: `600px`, margin: `auto` }} />
          }
          mapElement={<div style={{ height: `100%` }} />}
          
        />
      </div>

      <div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={artırmafonksiyonu}
        >
          {ust}
        </button>
      </div>

      <div>
        <button type="button" className="btn btn-primary" onClick={left2}>
          {sol2}
        </button>
        <button type="button" className="btn btn-primary" onClick={left}>
          {sol}
        </button>
        <button type="button" className="btn btn-danger">
          ▧
        </button>

        <h4>{counter}</h4>

        <button
          type="button"
          className="btn btn-danger"
          onClick={frenfonksiyonu}
        >
          ⊚
        </button>
        <button type="button" className="btn btn-primary" onClick={right}>
          {sag}
        </button>
        <button type="button" className="btn btn-primary" onClick={right2}>
          {sag2}
        </button>
      </div>

      <div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={azaltmafonksiyonu}
        >
          {alt}
        </button>
      </div>
    </div>
  );
}

export default App;
