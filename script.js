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
