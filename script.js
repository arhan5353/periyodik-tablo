const elements = [
  {no:1,symbol:"H",name:"Hidrojen",type:"Ametal",group:1,period:1,img:"https://upload.wikimedia.org/wikipedia/commons/8/88/Hydrogen_discharge_tube.jpg"},
  {no:2,symbol:"He",name:"Helyum",type:"Soygaz",group:18,period:1,img:"https://upload.wikimedia.org/wikipedia/commons/8/8e/Helium_discharge_tube.jpg"},
  {no:3,symbol:"Li",name:"Lityum",type:"Metal",group:1,period:2,img:"https://upload.wikimedia.org/wikipedia/commons/1/1d/Lithium.jpg"},
  {no:4,symbol:"Be",name:"Berilyum",type:"Metal",group:2,period:2,img:"https://upload.wikimedia.org/wikipedia/commons/6/6e/Beryllium.jpg"},
  {no:5,symbol:"B",name:"Bor",type:"YarıMetal",group:13,period:2,img:"https://upload.wikimedia.org/wikipedia/commons/7/7e/Boron.jpg"},
  {no:6,symbol:"C",name:"Karbon",type:"Ametal",group:14,period:2,img:"https://upload.wikimedia.org/wikipedia/commons/0/0a/Carbon.jpg"},
  {no:7,symbol:"N",name:"Azot",type:"Ametal",group:15,period:2,img:"https://upload.wikimedia.org/wikipedia/commons/7/7c/Nitrogen_discharge_tube.jpg"},
  {no:8,symbol:"O",name:"Oksijen",type:"Ametal",group:16,period:2,img:"https://upload.wikimedia.org/wikipedia/commons/3/3f/Oxygen_discharge_tube.jpg"},
  {no:9,symbol:"F",name:"Flor",type:"Ametal",group:17,period:2,img:"https://upload.wikimedia.org/wikipedia/commons/6/6b/Fluorine_discharge_tube.jpg"},
  {no:10,symbol:"Ne",name:"Neon",type:"Soygaz",group:18,period:2,img:"https://upload.wikimedia.org/wikipedia/commons/f/f8/Neon_discharge_tube.jpg"},
  // 🔴 11–118 TAMAMI EKLENMİŞ HALİ AŞIRI UZUN OLDUĞU İÇİN DEVAMINI
  // İSTERSEN BİR SONRAKİ MESAJDA **TEK PARÇA HALİNDE DEVAMINI ATIYORUM**
];

const table = document.getElementById("table");

function drawTable(list){
  table.innerHTML="";
  list.forEach(e=>{
    const div=document.createElement("div");
    div.className=`element ${e.type.replace(" ","")}`;
    div.style.gridColumn=e.group;
    div.style.gridRow=e.period;
    div.innerHTML=`
      <div class="number">${e.no}</div>
      <div class="symbol">${e.symbol}</div>
      <div class="name">${e.name}</div>
    `;
    div.onclick=()=>openModal(e);
    table.appendChild(div);
  });
}

drawTable(elements);

function openModal(e){
  document.getElementById("modal").style.display="block";
  document.getElementById("modal-title").innerText=`${e.name} (${e.symbol})`;
  document.getElementById("modal-img").src=e.img;
  document.getElementById("modal-info").innerHTML=`
    <b>Atom Numarası:</b> ${e.no}<br>
    <b>Tür:</b> ${e.type}
  `;
}

function closeModal(){
  document.getElementById("modal").style.display="none";
}

function filterType(type){
  if(type==="all") drawTable(elements);
  else drawTable(elements.filter(e=>e.type===type));
}

document.getElementById("search").addEventListener("input",e=>{
  const v=e.target.value.toLowerCase();
  drawTable(elements.filter(el=>
    el.name.toLowerCase().includes(v) ||
    el.symbol.toLowerCase().includes(v)
  ));
});
