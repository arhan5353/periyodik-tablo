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

