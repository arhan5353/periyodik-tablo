const elements = {
H: {
ad: "Hidrojen",
atomNo: 1,
agirlik: 1.008,
tur: "Ametal",
grup: 1,
periyot: 1,
kullanim: "Yakıt hücreleri"
},
He: {
ad: "Helyum",
atomNo: 2,
agirlik: 4.0026,
tur: "Soygaz",
grup: 18,
periyot: 1,
kullanim: "Balonlar, MR"
},
O: {
ad: "Oksijen",
atomNo: 8,
agirlik: 15.999,
tur: "Ametal",
grup: 16,
periyot: 2,
kullanim: "Solunum"
},
Na: {
ad: "Sodyum",
atomNo: 11,
agirlik: 22.99,
tur: "Metal",
grup: 1,
periyot: 3,
kullanim: "Tuz üretimi"
},
Cl: {
ad: "Klor",
atomNo: 17,
agirlik: 35.45,
tur: "Ametal",
grup: 17,
periyot: 3,
kullanim: "Su arıtma"
}
};

function showInfo(symbol) {
let el = elements[symbol];
document.getElementById("popup-content").innerHTML =
"<h3>" + el.ad + "</h3>" +
"Atom No: " + el.atomNo + "<br>" +
"Atom Ağırlığı: " + el.agirlik + "<br>" +
"Grup: " + el.grup + "<br>" +
"Periyot: " + el.periyot + "<br>" +
"Tür: " + el.tur + "<br>" +
"Kullanım: " + el.kullanim;
document.getElementById("popup").style.display = "block";
}

function filterElements(type) {
document.querySelectorAll('.element').forEach(el => {
el.style.display =
(type === 'all' || el.dataset.type === type)
? "block" : "none";
});
}

document.getElementById("search").addEventListener("keyup", function () {
let val = this.value.toLowerCase();
document.querySelectorAll(".element").forEach(el => {
el.style.display = el.innerText.toLowerCase().includes(val)
? "block" : "none";
});
});
