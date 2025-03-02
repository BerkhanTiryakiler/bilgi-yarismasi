export default function SecenekButon({ secenek, indeks, secimYap, yanlisIndex, dogruIndex }) {
    return (
        <button
            onClick={() => {secimYap(indeks);}}
            className={`border py-2 px-4 rounded-md 
                ${yanlisIndex === indeks ? "bg-red-600" : ""} 
                ${dogruIndex === indeks ? "bg-green-600" : ""}`
            }
        >
            {secenek}
        </button>
    );
}