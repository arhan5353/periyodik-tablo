const elements = [
  {
    number: 1,
    symbol: "H",
    name: "Hidrojen",
    type: "Ametal",
    weight: "1.008",
    electron: "1s¹",
    melting: "-259 °C",
    boiling: "-253 °C",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Hydrogen_discharge_tube.jpg/320px-Hydrogen_discharge_tube.jpg",
    row: 1,
    column: 1
  },
  {
    number: 2,
    symbol: "He",
    name: "Helyum",
    type: "Soygaz",
    weight: "4.0026",
    electron: "1s²",
    melting: "-272 °C",
    boiling: "-269 °C",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Helium_discharge_tube.jpg/320px-Helium_discharge_tube.jpg",
    row: 1,
    column: 18
  },
  {
    number: 6,
    symbol: "C",
    name: "Karbon",
    type: "Ametal",
    weight: "12.011",
    electron: "1s² 2s² 2p²",
    melting: "3550 °C",
    boiling: "4827 °C",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/GraphiteUSGOV.jpg/320px-GraphiteUSGOV.jpg",
    row: 2,
    column: 14
  },
  {
    number: 26,
    symbol: "Fe",
    name: "Demir",
    type: "Metal",
    weight: "55.845",
    electron: "[Ar] 3d⁶ 4s²",
    melting: "1538 °C",
    boiling: "2862 °C",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Iron_electrolytic_and_1cm3_cube.jpg/320px-Iron_electrolytic_and_1cm3_cube.jpg",
    row: 4,
    column: 8
  }
];

const table = document.getElementById("periodicTable");
const searchInput = document.getElementById("searchInput");

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
    <p><b>Atom Numarası:</b> ${el.number}</p>
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
  if (type === "all") {
    drawTable(elements);
  } else {
    drawTable(elements.filter(e => e.type === type));
  }
}

searchInput.addEventListener("input", () => {
  const value = searchInput.value.toLowerCase();
  drawTable(
    elements.filter(e =>
      e.name.toLowerCase().includes(value) ||
      e.symbol.toLowerCase().includes(value) ||
      e.number.toString().includes(value)
    )
  );
});

drawTable(elements);

