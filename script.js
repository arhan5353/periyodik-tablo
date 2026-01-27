const table = document.getElementById("periodicTable");
const searchInput = document.getElementById("searchInput");

let elements = [];

fetch("https://raw.githubusercontent.com/Bowserinator/Periodic-Table-JSON/master/PeriodicTableJSON.json")
  .then(res => res.json())
  .then(data => {
    elements = data.elements.map(e => ({
      number: e.number,
      symbol: e.symbol,
      name: e.name,
      type: translateType(e.category),
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

function translateType(cat) {
  if (cat.includes("metal") && !cat.includes("metalloid")) return "Metal";
  if (cat.includes("metalloid")) return "Yarı Metal";
  if (cat.includes("noble")) return "Soygaz";
  return "Ametal";
}

function drawTable(list) {
  table.innerHTML = "";
  list.forEach(el => {
    const div = document.createElement("div");
    div.className = `element ${el.type.replace(" ", "")}`;
    div.style.gridRow = el.row;
    div.style.gridColumn = el.column;
    div.innerHTML = `
      <div class="number">${el.number}</div>
      <div class="symbol">${el.symbol}</div>
      <div class="name">${el.name}</div>
    `;
    div.onclick = () => openModal(el);
    table.appendChild(div);
  });
}

function openModal(el) {
  document.getElementById("modal").style.display = "flex";
  document.getElementById("modalName").innerText = `${el.name} (${el.symbol})`;
  document.getElementById("modalImage").src = el.image;
  document.getElementById("modalDetails").innerHTML = `
    <p><b>Atom Ağırlığı:</b> ${el.weight}</p>
    <p><b>Elektron Dizilimi:</b> ${el.electron}</p>
    <p><b>Erime Noktası:</b> ${el.melting}</p>
    <p><b>Kaynama Noktası:</b> ${el.boiling}</p>
    <p><b>Tür:</b> ${el.type}</p>
  `;
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

function filterElements(type) {
  drawTable(type === "all" ? elements : elements.filter(e => e.type === type));
}

searchInput.addEventListener("input", () => {
  const v = searchInput.value.toLowerCase();
  drawTable(elements.filter(e =>
    e.name.toLowerCase().includes(v) ||
    e.symbol.toLowerCase().includes(v) ||
    e.number.toString().includes(v)
  ));
});
