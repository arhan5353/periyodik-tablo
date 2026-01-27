const elements = {
H: {
ad: "Hidrojen",
atomNo: 1,
agirlik: 1.008,
tur: "Ametal",
grup: 1,
periyot: 1,
kullanim: "Yakıt hücreleri, roket yakıtı"
},
He: {
ad: "Helyum",
atomNo: 2,
agirlik: 4.0026,
tur: "Soygaz",
grup: 18,
periyot: 1,
kullanim: "Balonlar, MR cihazları"
}
};
function showInfo(e) {
let el = elements[e];
document.getElementById("details").innerHTML =
"<b>" + el.ad + "</b><br>" +
"Atom No: " + el.atomNo + "<br>" +
"Atom Ağırlığı: " + el.agirlik + "<br>" +
"Grup: " + el.grup + "<br>" +
"Periyot: " + el.periyot + "<br>" +
"Tür: " + el.tur + "<br>" +
"Kullanım Alanı: " + el.kullanim;
}
O: {
ad: "Oksijen",
atomNo: 8,
agirlik: 15.999,
tur: "Ametal",
grup: 16,
periyot: 2,
kullanim: "Solunum, tıbbi oksijen"
},
Na: {
ad: "Sodyum",
atomNo: 11,
agirlik: 22.99,
tur: "Metal",
grup: 1,
periyot: 3,
kullanim: "Tuz üretimi, sokak lambaları"
},
Cl: {
ad: "Klor",
atomNo: 17,
agirlik: 35.45,
tur: "Ametal",
grup: 17,
periyot: 3,
kullanim: "Dezenfektan, su arıtma"
}

