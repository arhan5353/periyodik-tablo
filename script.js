const tablo = document.getElementById("periodicTable");
const arama = document.getElementById("searchInput");

let elementler = [];

/* VERİ */
fetch("https://raw.githubusercontent.com/Bowserinator/Periodic-Table-JSON/master/PeriodicTableJSON.json")
.then(res => res.json())
.then(veri => {

    elementler = veri.elements.map(e => ({
        atomNo: e.number,
        sembol: e.symbol,
        ad: e.name,
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

/* TÜR */
function turCevir(kategori){

    kategori = kategori.toLowerCase();

    if(kategori.includes("metalloid")) return "YarıMetal";
    if(kategori.includes("noble")) return "Soygaz";
    if(kategori.includes("metal")) return "Metal";

    return "Ametal";
}

/* TABLO */
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
        <p><b>Atom No:</b> ${e.atomNo}</p>
        <p><b>Ağırlık:</b> ${e.atomAgirligi}</p>
        <p><b>Elektron:</b> ${e.elektron}</p>
        <p><b>Erime:</b> ${e.erime}</p>
        <p><b>Kaynama:</b> ${e.kaynama}</p>
        <p><b>Tür:</b> ${e.tur}</p>
    `;
}

function closeModal(){
    document.getElementById("modal").style.display = "none";
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

/* FİLTRE */
function filterElements(tur){

    if(tur === "all"){
        tabloyuCiz(elementler);
    } else {
        tabloyuCiz(elementler.filter(e => e.tur === tur));
    }
}
const tablo = document.getElementById("periodicTable");
const arama = document.getElementById("searchInput");

let elementler = [];

/* TÜRKÇE İSİM LİSTESİ (118 TAM) */
const turkceListe = {
1:"Hidrojen",2:"Helyum",3:"Lityum",4:"Berilyum",5:"Bor",6:"Karbon",7:"Azot",8:"Oksijen",9:"Flor",10:"Neon",
11:"Sodyum",12:"Magnezyum",13:"Alüminyum",14:"Silisyum",15:"Fosfor",16:"Kükürt",17:"Klor",18:"Argon",
19:"Potasyum",20:"Kalsiyum",21:"Skandiyum",22:"Titanyum",23:"Vanadyum",24:"Krom",25:"Manganez",26:"Demir",27:"Kobalt",28:"Nikel",
29:"Bakır",30:"Çinko",31:"Galyum",32:"Germanyum",33:"Arsenik",34:"Selenyum",35:"Brom",36:"Kripton",
37:"Rubidyum",38:"Stronsiyum",39:"İtriyum",40:"Zirkonyum",41:"Niyobyum",42:"Molibden",43:"Teknesyum",44:"Rutenyum",
45:"Rodyum",46:"Paladyum",47:"Gümüş",48:"Kadmiyum",49:"İndiyum",50:"Kalay",51:"Antimon",52:"Tellür",53:"İyot",54:"Ksenon",
55:"Sezyum",56:"Baryum",57:"Lantan",58:"Seryum",59:"Praseodimyum",60:"Neodimyum",61:"Prometyum",62:"Samaryum",
63:"Evropiyum",64:"Gadolinyum",65:"Terbiyum",66:"Disprosyum",67:"Holmiyum",68:"Erbiyum",69:"Tulyum",70:"İterbiyum",71:"Lutesyum",
72:"Hafniyum",73:"Tantal",74:"Tungsten",75:"Reniyum",76:"Osmiyum",77:"İridyum",78:"Platin",79:"Altın",80:"Cıva",
81:"Talyum",82:"Kurşun",83:"Bizmut",84:"Polonyum",85:"Astatin",86:"Radon",
87:"Fransiyum",88:"Radyum",89:"Aktinyum",90:"Toryum",91:"Protaktinyum",92:"Uranyum",93:"Neptünyum",94:"Plütonyum",
95:"Amerikyum",96:"Küriyum",97:"Berkelyum",98:"Kaliforniyum",99:"Einsteinyum",100:"Fermiyum",
101:"Mendelevyum",102:"Nobelyum",103:"Lavrensiyum",
104:"Rutherfordyum",105:"Dubniyum",106:"Seaborgiyum",107:"Bohriyum",108:"Hasyum",109:"Meitneryum",
110:"Darmstadtiyum",111:"Röntgenyum",112:"Kopernikyum",113:"Nihonyum",114:"Flerovyum",
115:"Moskovyum",116:"Livermoryum",117:"Tennesin",118:"Oganesson"
};

/* VERİ */
fetch("https://raw.githubusercontent.com/Bowserinator/Periodic-Table-JSON/master/PeriodicTableJSON.json")
.then(res => res.json())
.then(veri => {

    elementler = veri.elements.map(e => ({
        atomNo: e.number,
        sembol: e.symbol,
        ad: turkceListe[e.number],
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

/* TÜR */
function turCevir(kategori){
    kategori = kategori.toLowerCase();
    if(kategori.includes("metalloid")) return "YarıMetal";
    if(kategori.includes("noble")) return "Soygaz";
    if(kategori.includes("metal")) return "Metal";
    return "Ametal";
}

/* TABLO */
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
    document.getElementById("modalName").innerText = `${e.ad} (${e.sembol})`;
    document.getElementById("modalImage").src = e.gorsel;

    document.getElementById("modalDetails").innerHTML = `
        <p><b>Atom No:</b> ${e.atomNo}</p>
        <p><b>Ağırlık:</b> ${e.atomAgirligi}</p>
        <p><b>Elektron:</b> ${e.elektron}</p>
        <p><b>Erime:</b> ${e.erime}</p>
        <p><b>Kaynama:</b> ${e.kaynama}</p>
        <p><b>Tür:</b> ${e.tur}</p>
    `;
}

function closeModal(){
    document.getElementById("modal").style.display = "none";
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

/* FİLTRE */
function filterElements(tur){
    if(tur === "all"){
        tabloyuCiz(elementler);
    } else {
        tabloyuCiz(elementler.filter(e => e.tur === tur));
    }
}
