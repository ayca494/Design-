import React, { useEffect } from "react";
import "./App.css";
import { useState } from "react";
import app from "./firebase";

import { getDatabase, ref, child, get, set } from "firebase/database";

const db = getDatabase(app);

const dbRef = ref(getDatabase());

function hizGuncelle(hiz = 0) {
  set(ref(db, "arac"), {
    hiz: hiz, 
  });
}
function yonGuncelle(yon=10) {
  set(ref(db, "arac"), {
    yon: yon,
  });
}


function App() {
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
          
        } if (snapshot.exists()) {
          const data = snapshot.val();
          setDirection(data.yon);
          
        }else {
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
      hizGuncelle(counter + 1);
    }
    if (counter === 100) {
      setCounter(counter);
    }
  };
  const azaltmafonksiyonu = () => {
    if (counter > 0 && counter <= 100) {
      setCounter(counter - 1);
      hizGuncelle(counter - 1);
    }
  };

  // const frenfonksiyonu = ()=>{
  //   setCounter(0);
  // }

  const right = () => {
    if (direction >= 0 && direction < 20) {
      setDirection(direction + 1);
      yonGuncelle(direction + 1);
    }
  };

  const right2 = () => {
    if (direction >= 0 && direction < 20) {
      setDirection(direction + 2);
      yonGuncelle(direction + 2);
    }
  };

  const left = () => {
    if (direction > 0 && direction <= 20) {
      setDirection(direction - 1);
      yonGuncelle(direction - 1);
    }
  };

  const left2 = () => {
    if (direction > 1 && direction <= 20) {
      setDirection(direction - 2);
      yonGuncelle(direction - 2);
    }
  };

  return (
    <div className="App">
      
      <h3 style={{ color: "red" }}>ERCİYES OTONOM ARAÇ</h3>

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

        <button type="button" className="btn btn-danger">
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
