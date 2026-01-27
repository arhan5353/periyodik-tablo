/* =========================
   TABLOYU ÇİZEN FONKSİYON
   ========================= */

const table = document.getElementById("table");

function drawElements(list) {
  table.innerHTML = "";

  list.forEach(e => {
    if (!e.group || !e.period) return;

    const div = document.createElement("div");
    div.className = "element " + e.type.toLowerCase();
    div.style.gridColumn = e.group;
    div.style.gridRow = e.period;

    div.innerHTML = `
      <span>${e.symbol}</span>
      <small>${e.number}</small>
    `;

    div.onclick = () => showInfo(e);
    table.appendChild(div);
  });
}

/* =========================
   118 ELEMENTİ ÇEKME
   ========================= */

fetch("https://raw.githubusercontent.com/Bowserinator/Periodic-Table-JSON/master/PeriodicTableJSON.json")
  .then(res => res.json())
  .then(data => {
    window.allElements = data.elements.map(e => ({
      symbol: e.symbol,
      name: e.name.toLowerCase(),
      number: e.number,
      group: e.xpos,
      period: e.ypos,
      weight: e.atomic_mass,
      summary: e.summary,
      type: e.category.includes("noble") ? "Soygaz" :
            e.category.includes("metal") ? "Metal" : "Ametal"
    }));

    drawElements(window.allElements);
  });

/* =========================
   ARAMA
   ========================= */

document.getElementById("search").addEventListener("keyup", e => {
