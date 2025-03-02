"use client";

import { useState } from "react";



const veri = {
    soru: "Fransa'nın başkenti neresidir?",
    secenekler: ["Paris", "Londra", "Berlin", "Madrid"],
    dogruCevapIndeks: 0
};


export default function Page() {

    const[puan, puanGuncelle] = useState(0);
    const[can, canGuncelle] = useState(3);


    


function secimYap(indeks){
    if(veri.dogruCevapIndeks ===indeks){
        puanGuncelle(puan + 5);
    }
    else{
        canGuncelle(can - 1);
        
    }
}


    return (
        <main className="p-8 flex flex-col items-center justify-center h-screen relative">
            <div id="oyun-bilgi" className="absolute top-4 right-4 flex gap-4">
           <div>Puan: <span className="border rounded-lg p-3">0</span></div> 
           <div>Can: <span className="border rounded-lg p-3">3</span></div>
           </div>



                <section className = "flex flex-col items-center justify-center">
                        <p className="mb-8 text-4xl">{veri.soru}</p>


                        <div className="flex flex-col items-center justify-center gap-4">
                        <button onClick={()=>{secimYap(0)}} className="border py-3 px-4 rounded-md">{veri.secenekler[0]}</button>
                        <button onClick={()=>{secimYap(1)}} className="border py-3 px-4 rounded-md">{veri.secenekler[1]}</button>
                        <button onClick={()=>{secimYap(2)}} className="border py-3 px-4 rounded-md">{veri.secenekler[2]}</button>
                        <button onClick={()=>{secimYap(3)}} className="border py-3 px-4 rounded-md">{veri.secenekler[3]}</button>

                        </div>
                </section>



        </main>

    );
}