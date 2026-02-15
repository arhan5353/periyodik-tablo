const tablo = document.getElementById("periodicTable");
const arama = document.getElementById("searchInput");

let elementler = [];

/* 118 ELEMENT VERİSİ */
fetch("https://raw.githubusercontent.com/Bowserinator/Periodic-Table-JSON/master/PeriodicTableJSON.json")
.then(res => res.json())
.then(veri => {

    elementler = veri.elements.map(e => ({
        atomNo: e.number,
        sembol: e.symbol,
        ad: turkceIsim(e.name),
        tur: turCevir(e.category),
        atomAgirligi: e.atomic_mass,
        elektron: e.electron_configuration,
        erime: e.melt ? e.melt + " K" : "Bilinmiyor",
        kaynama: e.boil ? e.boil + " K" : "Bilinmiyor",
        gorsel: `https://images-of-elements.com/${e.name.toLowerCase()}.jpg`,
        satir: e.ypos,
        sutun: e.xpos
    }));

    tabloyuCiz(elementler);
});

/* İSİMLERİ TÜRKÇEYE ÇEVİR */
function turkceIsim(ingilizce){

    const ceviri = {
        Hydrogen:"Hidrojen", Helium:"Helyum", Lithium:"Lityum",
        Beryllium:"Berilyum", Boron:"Bor", Carbon:"Karbon",
        Nitrogen:"Azot", Oxygen:"Oksijen", Fluorine:"Flor",
        Neon:"Neon", Sodium:"Sodyum", Magnesium:"Magnezyum",
        Aluminum:"Alüminyum", Silicon:"Silisyum", Phosphorus:"Fosfor",
        Sulfur:"Kükürt", Chlorine:"Klor", Argon:"Argon",
        Potassium:"Potasyum", Calcium:"Kalsiyum", Iron:"Demir",
        Copper:"Bakır", Zinc:"Çinko", Silver:"Gümüş",
        Gold:"Altın", Mercury:"Cıva", Lead:"Kurşun"
    };

    return ceviri[ingilizce] || ingilizce;
}

/* TÜRÜ TÜRKÇEYE ÇEVİR */
function turCevir(kategori){
    if(kategori.includes("metal") && !kategori.includes("metalloid"))
        return "Metal";
    if(kategori.includes("metalloid"))
        return "YarıMetal";
    if(kategori.includes("noble"))
        return "Soygaz";
    return "Ametal";
}

/* TABLOYU ÇİZ */
function tabloyuCiz(liste){

    tablo.innerHTML = "";

    liste.forEach(e => {

        const kutu = document.createElement("div");
        kutu.className = `element ${e.tur}`;
        kutu.style.gridRow = e.satir;
        kutu.style.gridColumn = e.sutun;

        kutu.innerHTML = `
            <div class="number">${e.atomNo}</div>
            <div class="symbol">${e.sembol}</div>
            <div class="name">${e.ad}</div>
        `;

        kutu.onclick = () => modalAc(e);

        tablo.appendChild(kutu);
    });
}

/* MODAL */
function modalAc(e){

    document.getElementById("modal").style.display = "flex";
    document.getElementById("modalName").innerText =
        `${e.ad} (${e.sembol})`;

    document.getElementById("modalImage").src = e.gorsel;

    document.getElementById("modalDetails").innerHTML = `
        <p><b>Atom Numarası:</b> ${e.atomNo}</p>
        <p><b>Atom Ağırlığı:</b> ${e.atomAgirligi}</p>
        <p><b>Elektron Dizilimi:</b> ${e.elektron}</p>
        <p><b>Erime Noktası:</b> ${e.erime}</p>
        <p><b>Kaynama Noktası:</b> ${e.kaynama}</p>
        <p><b>Tür:</b> ${e.tur}</p>
    `;
}

function closeModal(){
    document.getElementById("modal").style.display = "none";
}

/* FİLTRE */
function filterElements(tur){

    if(tur === "all"){
        tabloyuCiz(elementler);
    } else {
        tabloyuCiz(elementler.filter(e => e.tur === tur));
    }
}

/* ARAMA */
arama.addEventListener("input", () => {

    const deger = arama.value.toLowerCase();

    tabloyuCiz(
        elementler.filter(e =>
            e.ad.toLowerCase().includes(deger) ||
            e.sembol.toLowerCase().includes(deger) ||
            e.atomNo.toString().includes(deger)
        )
    );
});
