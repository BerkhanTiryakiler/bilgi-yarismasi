"use client";

import { useState } from "react";
import SecenekButon from "./SecenekButon";
import veri from "./veri.ts";

export default function Page() {
  const [puan, puanGuncelle] = useState(0);
  const [can, canGuncelle] = useState(3);
  const [dogruIndex, dogruIndexGuncelle] = useState(null);
  const [yanlisIndex, yanlisIndexGuncelle] = useState(null);
  const [aktifSoruIndex, aktifSoruGuncelle] = useState(0);
  const [oyunBitti, oyunBittiGuncelle] = useState(false);

  function secimYap(indeks) {
    if (oyunBitti) return; // Oyun bittiyse tıklamalar devre dışı

    if (veri[aktifSoruIndex].dogruCevapIndeks === indeks) {
      puanGuncelle(prevPuan => prevPuan + 5);
    } else {
      yanlisIndexGuncelle(indeks);
      canGuncelle(prevCan => prevCan - 1);
    }

    dogruIndexGuncelle(veri[aktifSoruIndex].dogruCevapIndeks);

    setTimeout(() => {
      if (can - 1 === 0) { // Can bitmişse oyunu bitir
        oyunBittiGuncelle(true);
        alert("Oyun bitti! Puanınız: " + puan);
        return;
      }

      if (aktifSoruIndex === veri.length - 1) { // Son soruya geldiysek bitir
        oyunBittiGuncelle(true);
        alert("Oyun bitti! Puanınız: " + puan);
        return;
      }

      aktifSoruGuncelle(prevIndex => prevIndex + 1);
      dogruIndexGuncelle(null);
      yanlisIndexGuncelle(null);
    }, 3000);
  }

  return (
    <main className="p-8 flex flex-col items-center justify-center h-screen relative">
      {/* Bilgi Alanı */}
      <div id="oyun-bilgi" className="absolute top-4 right-4 flex gap-4">
        <div>
          Puan: <span className="border rounded-lg p-3">{puan}</span>
        </div>
        <div>
          Can: <span className="border rounded-lg p-3">{can}</span>
        </div>
      </div>

      {/* Oyun Bitti Ekranı */}
      {oyunBitti ? (
        <div className="text-center">
          <p className="text-4xl font-bold">Oyun Bitti!</p>
          <p className="text-xl">Puanınız: {puan}</p>
          <button
            onClick={() => {
              puanGuncelle(0);
              canGuncelle(3);
              aktifSoruGuncelle(0);
              oyunBittiGuncelle(false);
            }}
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md"
          >
            Tekrar Oyna
          </button>
        </div>
      ) : (
        <section className="flex flex-col items-center justify-center">
          {/* Soru Sayısı */}
          <p className="mb-2 text-lg text-gray-500">
            Soru {aktifSoruIndex + 1} / {veri.length}
          </p>

          {/* Soru Metni */}
          <p className="mb-8 text-4xl">{veri[aktifSoruIndex].soru}</p>

          {/* Seçenekler */}
          <div className="flex flex-col items-center justify-center gap-4">
            {veri[aktifSoruIndex].secenekler.map((secenek, indeks) => (
              <SecenekButon
                key={indeks}
                secenek={secenek}
                indeks={indeks}
                secimYap={secimYap}
                dogruIndex={dogruIndex}
                yanlisIndex={yanlisIndex}
              />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
