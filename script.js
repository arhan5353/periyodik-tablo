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

function turkceIsim(ingilizce){

const ceviri = {

Hydrogen:"Hidrojen",
Helium:"Helyum",
Lithium:"Lityum",
Beryllium:"Berilyum",
Boron:"Bor",
Carbon:"Karbon",
Nitrogen:"Azot",
Oxygen:"Oksijen",
Fluorine:"Flor",
Neon:"Neon",

Sodium:"Sodyum",
Magnesium:"Magnezyum",
Aluminum:"Alüminyum",
Silicon:"Silisyum",
Phosphorus:"Fosfor",
Sulfur:"Kükürt",
Chlorine:"Klor",
Argon:"Argon",

Potassium:"Potasyum",
Calcium:"Kalsiyum",
Scandium:"Skandiyum",
Titanium:"Titanyum",
Vanadium:"Vanadyum",
Chromium:"Krom",
Manganese:"Manganez",
Iron:"Demir",
Cobalt:"Kobalt",
Nickel:"Nikel",
Copper:"Bakır",
Zinc:"Çinko",
Gallium:"Galyum",
Germanium:"Germanyum",
Arsenic:"Arsenik",
Selenium:"Selenyum",
Bromine:"Brom",
Krypton:"Kripton",

Rubidium:"Rubidyum",
Strontium:"Stronsiyum",
Yttrium:"İtriyum",
Zirconium:"Zirkonyum",
Niobium:"Niyobyum",
Molybdenum:"Molibden",
Technetium:"Teknesyum",
Ruthenium:"Rutenyum",
Rhodium:"Rodyum",
Palladium:"Paladyum",
Silver:"Gümüş",
Cadmium:"Kadmiyum",
Indium:"İndiyum",
Tin:"Kalay",
Antimony:"Antimon",
Tellurium:"Tellür",
Iodine:"İyot",
Xenon:"Ksenon",

Cesium:"Sezyum",
Barium:"Baryum",
Lanthanum:"Lantan",
Cerium:"Seryum",
Praseodymium:"Praseodimyum",
Neodymium:"Neodimyum",
Promethium:"Prometyum",
Samarium:"Samaryum",
Europium:"Evropiyum",
Gadolinium:"Gadolinyum",
Terbium:"Terbiyum",
Dysprosium:"Disprosyum",
Holmium:"Holmiyum",
Erbium:"Erbiyum",
Thulium:"Tulyum",
Ytterbium:"İterbiyum",
Lutetium:"Lutesyum",

Hafnium:"Hafniyum",
Tantalum:"Tantal",
Tungsten:"Tungsten",
Rhenium:"Reniyum",
Osmium:"Osmiyum",
Iridium:"İridyum",
Platinum:"Platin",
Gold:"Altın",
Mercury:"Cıva",
Thallium:"Talyum",
Lead:"Kurşun",
Bismuth:"Bizmut",
Polonium:"Polonyum",
Astatine:"Astatin",
Radon:"Radon",

Francium:"Fransiyum",
Radium:"Radyum",
Actinium:"Aktinyum",
Thorium:"Toryum",
Protactinium:"Protaktinyum",
Uranium:"Uranyum",
Neptunium:"Neptünyum",
Plutonium:"Plütonyum",
Americium:"Amerikyum",
Curium:"Küriyum",
Berkelium:"Berkelyum",
Californium:"Kaliforniyum",
Einsteinium:"Einsteinyum",
Fermium:"Fermiyum",
Mendelevium:"Mendelevyum",
Nobelium:"Nobelyum",
Lawrencium:"Lavrensiyum",

Rutherfordium:"Rutherfordyum",
Dubnium:"Dubniyum",
Seaborgium:"Seaborgiyum",
Bohrium:"Bohriyum",
Hassium:"Hasyum",
Meitnerium:"Meitneryum",
Darmstadtium:"Darmstadtiyum",
Roentgenium:"Röntgenyum",
Copernicium:"Kopernikyum",
Nihonium:"Nihonyum",
Flerovium:"Flerovyum",
Moscovium:"Moskovyum",
Livermorium:"Livermoryum",
Tennessine:"Tennesin",
Oganesson:"Oganesson"

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
