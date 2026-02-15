const table = document.getElementById("periodicTable");
const searchInput = document.getElementById("searchInput");

let elements = [];

/* TÜRKÇE İSİM ÇEVİRİ SİSTEMİ */
const turkce = {
  Hydrogen:"Hidrojen", Helium:"Helyum", Lithium:"Lityum", Beryllium:"Berilyum",
  Boron:"Bor", Carbon:"Karbon", Nitrogen:"Azot", Oxygen:"Oksijen",
  Fluorine:"Flor", Neon:"Neon", Sodium:"Sodyum", Magnesium:"Magnezyum",
  Aluminum:"Alüminyum", Silicon:"Silisyum", Phosphorus:"Fosfor",
  Sulfur:"Kükürt", Chlorine:"Klor", Argon:"Argon", Potassium:"Potasyum",
  Calcium:"Kalsiyum", Iron:"Demir", Copper:"Bakır", Zinc:"Çinko",
  Silver:"Gümüş", Gold:"Altın", Mercury:"Cıva", Lead:"Kurşun"
};

/* 118 ELEMENT VERİSİNİ ÇEK */
fetch("https://raw.githubusercontent.com/Bowserinator/Periodic-Table-JSON/master/PeriodicTableJSON.json")
  .then(res => res.json())
  .then(data => {
    elements = data.elements.map(e => ({
      number: e.number,
      symbol: e.symbol,
      name: turkce[e.name] || e.name,
      type: turToTurkce(e.category),
      weight: e.atomic_mass,
      electron: e.electron_configuration,
      melting: e.melt ? e.melt + " K" : "Bilinmiyor",
      boiling: e.boil ? e.boil + " K" : "Bilinmiyor",
      image: `https://images-of-elements.com/${e.name.toLowerCase()}.jpg`,
      row: e.ypos,
      column: e.xpos
    }));

    drawTable(elements);
  });

/* TÜR ÇEVİRİ */
function turToTurkce(cat){
  if(cat.includes("metal") && !cat.includes("metalloid")) return "Metal";
  if(cat.includes("metalloid")) return "YarıMetal";
  if(cat.includes("noble")) return "Soygaz";
  return "Ametal";
}

/* TABLOYU ÇİZ */
function drawTable(list){
  table.innerHTML = "";

  list.forEach(el=>{
    const div = document.createElement("div");
    div.className = `element ${el.type}`;
    div.style.gridRow = el.row;
    div.style.gridColumn = el.column;

    div.innerHTML = `
      <div class="number">${el.number}</div>
      <div class="symbol">${el.symbol}</div>
      <div class="name">${el.name}</div>
    `;

    div.onclick = ()=> openModal(el);
    table.appendChild(div);
  });
}

/* MODAL AÇ */
function openModal(el){
  document.getElementById("modal").style.display="flex";
  document.getElementById("modalName").innerText=`${el.name} (${el.symbol})`;
  document.getElementById("modalImage").src=el.image;

  document.getElementById("modalDetails").innerHTML=`
    <p><b>Atom Numarası:</b> ${el.number}</p>
    <p><b>Atom Ağırlığı:</b> ${el.weight}</p>
    <p><b>Elektron Dizilimi:</b> ${el.electron}</p>
    <p><b>Erime Noktası:</b> ${el.melting}</p>
    <p><b>Kaynama Noktası:</b> ${el.boiling}</p>
    <p><b>Tür:</b> ${el.type}</p>
  `;
}

/* MODAL KAPAT */
function closeModal(){
  document.getElementById("modal").style.display="none";
}

/* FİLTRE */
function filterElements(type){
  if(type==="all"){
    drawTable(elements);
  }else{
    drawTable(elements.filter(e=>e.type===type));
  }
}

/* ARAMA */
searchInput.addEventListener("input",()=>{
  const value=searchInput.value.toLowerCase();
  drawTable(elements.filter(e=>
    e.name.toLowerCase().includes(value) ||
    e.symbol.toLowerCase().includes(value) ||
    e.number.toString().includes(value)
  ));
});

