// ===================================
// MENU HAMBURGER
// ===================================
const menuButton = document.getElementById("menuButton");
const menuTendina = document.getElementById("menuTendina");

menuButton.addEventListener("click", () => {
    menuTendina.classList.toggle("aperto");
});

// Chiudi menu quando clicchi su un link
document.querySelectorAll('.menu-tendina a').forEach(link => {
    link.addEventListener('click', () => {
        menuTendina.classList.remove('aperto');
    });
});


// ===================================
// GALLERY SCORREVOLE
// ===================================
const galleryContainer = document.querySelector("#gallery .row.g-4");
const nextButton = document.getElementById("galleryNext");
const arrow = document.getElementById("galleryArrow");

// ARRAY SET PROGETTI (2 set)
const gallerySets = [
    [
        { img: "img/IMMAGINE SACRO.png", title: "Workshop di Prodotto - Sacro", desc: "Alzatina in carta sul tema della pace." },
        { img: "img/IMMAGINE VORTIGA.png", title: "Vortiga", desc: "Trasformazione geometrica." },
        { img: "img/IMMAGINE ASTORIA.png", title: "Identità visiva", desc: "Identità per l'ex cinema Astoria." },
        { img: "img/IMMAGINE BESTIARIO.png", title: "Workshop Serigrafia - Bestiario", desc: "Booklet realizzato a mano." }
    ],
    [
        { img: "img/IMMAGINE ONDALU.png", title: "Ondalù", desc: "Paralume in cartone ispirato agli anni 2010." },
        { img: "img/IMMAGINE HATBAG.png", title: "HAT-BAG", desc: "Cappello/borsa realizzato durante un laboratorio di prodotto." },
    ]
];

let currentSet = 0;
let arrowRight = true;

// Funzione per mostrare set corrente
function renderGallery(setIndex) {
    const set = gallerySets[setIndex];
    galleryContainer.innerHTML = "";

    set.forEach(item => {
        galleryContainer.innerHTML += `
            <div class="col-12 col-sm-6 col-md-6 col-lg-3">
                <div class="card-project">
                    <img src="${item.img}" alt="${item.title}" class="img-fluid">
                    <h4>${item.title}</h4>
                    <p>${item.desc}</p>
                </div>
            </div>
        `;
    });
}

// Click freccia → cambia set e ruota freccia
nextButton.addEventListener("click", () => {
    // Aggiorna set della gallery
    if (arrowRight) {
        currentSet = (currentSet + 1) % gallerySets.length;
    } else {
        currentSet = (currentSet - 1 + gallerySets.length) % gallerySets.length;
    }

    renderGallery(currentSet);

    // Inverti direzione freccia
    arrowRight = !arrowRight;

    // Rotazione animata della freccia
    arrow.classList.toggle("rotated");
});

// Render iniziale (mostra il primo set)
renderGallery(0);