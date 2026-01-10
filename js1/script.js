// ===================================
// MENU TENDINA
// ===================================
const menuButton = document.getElementById("menuButton");
const menuTendina = document.getElementById("menuTendina");

menuButton.addEventListener("click", () => {
    menuTendina.classList.toggle("aperto");
});

// Chiudi menu quando clicchi su un link
const menuLinks = menuTendina.querySelectorAll("a");
menuLinks.forEach(link => {
    link.addEventListener("click", () => {
        menuTendina.classList.remove("aperto");
    });
});

// Chiudi menu quando clicchi fuori (sull'overlay)
menuTendina.addEventListener("click", (e) => {
    if (e.target === menuTendina) {
        menuTendina.classList.remove("aperto");
    }
});


// ===================================
// GALLERY SCORREVOLE
// ===================================
const galleryContainer = document.querySelector("#gallery .row.g-4");
const nextButton = document.getElementById("galleryNext");
const arrow = document.getElementById("galleryArrow");

// ARRAY SET PROGETTI
const gallerySets = [
    [
        { img: "img/immagine_sacro.png", title: "Workshop di Prodotto - Sacro", desc: "Alzatina in carta sul tema della pace." },
        { img: "img/immagine_vortiga.png", title: "Vortiga", desc: "Trasformazione geometrica." },
        { img: "img/immagine_astoria.png", title: "Identità visiva", desc: "Identità per l'ex cinema Astoria." },
        { img: "img/immagine_bestiario.png", title: "Workshop Serigrafia - Bestiario", desc: "Booklet realizzato a mano." }
    ],
    [
        { img: "img/immagine_ondalu.png", title: "Ondalù", desc: "Paralume in cartone ispirato agli anni 2010." },
        { img: "img/immagine_hatbag.png", title: "HAT-BAG", desc: "Cappello/borsa realizzato durante un laboratorio di prodotto." }
    ]
];

let currentSet = 0;
let rotation = 0;

// Render iniziale
renderGallery(currentSet);

// Funzione per mostrare il set corrente
function renderGallery(setIndex) {
    const set = gallerySets[setIndex];
    galleryContainer.innerHTML = "";

    set.forEach(item => {
        galleryContainer.innerHTML += `
            <div class="col-12 col-sm-6 col-md-6 col-lg-3">
                <div class="card-project" data-img="${item.img}" data-title="${item.title}" data-desc="${item.desc}">
                    <img src="${item.img}" alt="${item.title}" class="img-fluid">
                    <h4>${item.title}</h4>
                    <p>${item.desc}</p>
                </div>
            </div>
        `;
    });
}

// Click sul bottone NEXT
nextButton.addEventListener("click", () => {
    // Cambia set
    currentSet = (currentSet + 1) % gallerySets.length;
    renderGallery(currentSet);

    // Ruota la freccia di 180° ogni click
    rotation += 180;
    arrow.style.transform = `rotate(${rotation}deg)`;
});