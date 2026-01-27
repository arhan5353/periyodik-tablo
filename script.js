fetch("https://raw.githubusercontent.com/Bowserinator/Periodic-Table-JSON/master/PeriodicTableJSON.json")
.then(res => res.json())
.then(data => {
  window.allElements = data.elements.map(e => ({
    symbol: e.symbol,
    name: e.name.toLowerCase(),
    number: e.number,
    group: e.xpos,
    period: e.ypos,
    type: e.category.includes("noble") ? "Soygaz" :
          e.category.includes("metal") ? "Metal" : "Ametal",
    weight: e.atomic_mass,
    summary: e.summary
  }));
  drawElements(window.allElements);
});
const table = document.getElementById("table");

function drawElements(list) {
  table.innerHTML = "";
  list.forEach(e => {
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
const elements = [
{symbol:"H", name:"Hidrojen", number:1, type:"Ametal", group:1, period:1},
{symbol:"He", name:"Helyum", number:2, type:"Soygaz", group:18, period:1},
{symbol:"Li", name:"Lityum", number:3, type:"Metal", group:1, period:2},
{symbol:"Be", name:"Berilyum", number:4, type:"Metal", group:2, period:2},
{symbol:"B", name:"Bor", number:5, type:"Ametal", group:13, period:2},
{symbol:"C", name:"Karbon", number:6, type:"Ametal", group:14, period:2},
{symbol:"N", name:"Azot", number:7, type:"Ametal", group:15, period:2},
{symbol:"O", name:"Oksijen", number:8, type:"Ametal", group:16, period:2},
{symbol:"F", name:"Flor", number:9, type:"Ametal", group:17, period:2},
{symbol:"Ne", name:"Neon", number:10, type:"Soygaz", group:18, period:2}
];
const table = document.getElementById("table");

function drawElements(list) {
  table.innerHTML = "";
  list.forEach(e => {
    const div = document.createElement("div");
    div.className = "element " + e.type.toLowerCase();
    div.style.gridColumn = e.group;
    div.style.gridRow = e.period;
    div.innerHTML = `<span>${e.symbol}</span><br>${e.number}`;
    table.appendChild(div);
  });
}

drawElements(elements);
document.getElementById("search").addEventListener("keyup", e => {
  const v = e.target.value.toLowerCase();
  drawElements(
    elements.filter(el =>
      el.name.toLowerCase().includes(v) ||
      el.symbol.toLowerCase().includes(v)
    )
  );
});
function filterType(type){
  if(type === "all") {
    drawElements(elements);
  } else {
    drawElements(elements.filter(e => e.type === type));
  }
}
function showInfo(e) {
document.getElementById("popup-content").innerHTML = `
<h3>${e.symbol} - ${e.name}</h3>
<p><b>Atom No:</b> ${e.number}</p>
<p><b>Atom Ağırlığı:</b> ${e.weight}</p>
<p><b>Tür:</b> ${e.type}</p>
<p>${e.summary}</p>
<p><i>Kapatmak için tıkla</i></p>
`;
document.getElementById("popup").style.display = "block";
}

document.getElementById("popup").onclick = () =>
document.getElementById("popup").style.display = "none";
document.getElementById("search").addEventListener("keyup", e => {
const v = e.target.value.toLowerCase();
drawElements(
window.allElements.filter(el =>
el.name.includes(v) || el.symbol.toLowerCase().includes(v)
)
);
});
function filterType(type){
if(type==="all") drawElements(window.allElements);
else drawElements(window.allElements.filter(e=>e.type===type));
}

