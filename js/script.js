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

// ARRAY SET PROGETTI - 3 SET DA 2 PER MOBILE, RAGGRUPPATI DA 2 A 2 PER DESKTOP
const gallerySets = [
    // Set 0: Progetti 1-2
    [
        { 
            images: ["img/immagine_sacro.webp", "img/immagine_sacro2.webp", "img/immagine_sacro3.webp"],
            title: "Workshop di Prodotto - Sacro", 
            desc: "Alzatina in carta sul tema della pace." 
        },
        { 
            images: ["img/immagine_vortiga.webp", "img/immagine_vortiga2.webp", "img/immagine_vortiga3.webp"],
            title: "Vortiga", 
            desc: "Trasformazione geometrica." 
        }
    ],
    // Set 1: Progetti 3-4 (desktop combina set 0+1 per mostrare 3)
    [
        { 
            images: ["img/immagine_astoria.webp", "img/immagine_astoria2.webp", "img/immagine_astoria3.webp"],
            title: "Identità visiva", 
            desc: "Identità per l'ex cinema Astoria." 
        },
        { 
            images: ["img/immagine_bestiario.webp", "img/immagine_bestiario2.webp", "img/immagine_bestiario3.webp"],
            title: "Workshop Serigrafia - Bestiario", 
            desc: "Booklet realizzato a mano." 
        }
    ],
    // Set 2: Progetti 5-6 (mobile solo, desktop mostra questi come set 2)
    [
        { 
            images: ["img/immagine_ondalu.webp", "img/immagine_ondalu2.webp", "img/immagine_ondalu3.webp"],
            title: "Ondalù", 
            desc: "Paralume in cartone ispirato agli anni 2010." 
        },
        { 
            images: ["img/immagine_hatbag.webp", "img/immagine_hatbag2.webp", "img/immagine_hatbag3.webp"],
            title: "HAT-BAG", 
            desc: "Cappello/borsa realizzato durante un laboratorio di prodotto." 
        }
    ]
];

let currentSet = 0;
let rotation = 0;

// Render iniziale quando il DOM è completamente caricato
function initializeGallery() {
    if (galleryContainer) {
        renderGallery(currentSet);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        // Piccolo delay per assicurare che il layout sia pronto
        setTimeout(initializeGallery, 100);
    });
} else {
    // Se lo script è caricato in defer, il DOM è già pronto
    setTimeout(initializeGallery, 100);
}

// Funzione per mostrare il set corrente
function renderGallery(setIndex) {
    const isMobile = window.innerWidth <= 768;
    const set = gallerySets[setIndex];
    galleryContainer.innerHTML = "";

    // Desktop: combina set 0+1 per mostrare 3 progetti
    let projectsToShow = set;
    if (!isMobile && setIndex === 0) {
        // Desktop set 0: combina progetti da set 0 e set 1
        projectsToShow = [...gallerySets[0], ...gallerySets[1]].slice(0, 3);
    } else if (!isMobile && setIndex === 1) {
        // Desktop set 1: mostra ultimi progetti da set 1 e set 2
        projectsToShow = [gallerySets[1][1], gallerySets[2][0], gallerySets[2][1]];
    }

    projectsToShow.forEach((item, index) => {
        const imagesHTML = item.images.map((img, imgIndex) => `
            <img src="${img}" alt="${item.title} - Immagine ${imgIndex + 1}" class="img-fluid carousel-image ${imgIndex === 0 ? 'active' : ''}" data-index="${imgIndex}">
        `).join('');

        const dotsHTML = item.images.map((_, imgIndex) => `
            <button class="carousel-dot ${imgIndex === 0 ? 'active' : ''}" data-image-index="${imgIndex}"></button>
        `).join('');

        galleryContainer.innerHTML += `
            <div class="col-12 col-sm-6 col-md-6 col-lg-4">
                <div class="card-project" data-title="${item.title}" data-desc="${item.desc}">
                    <div class="card-image-carousel">
                        <div class="carousel-container">
                            ${imagesHTML}
                        </div>
                        <div class="carousel-dots">
                            ${dotsHTML}
                        </div>
                    </div>
                    <h4>${item.title}</h4>
                    <p>${item.desc}</p>
                </div>
            </div>
        `;
    });

    // Aggiungi event listener ai pallini del carosello
    addCarouselListeners();
}

// Funzione per gestire i caroselli interni
function addCarouselListeners() {
    const dots = document.querySelectorAll(".carousel-dot");

    dots.forEach(dot => {
        dot.addEventListener("click", (e) => {
            const carousel = dot.closest(".card-image-carousel");
            const imageIndex = parseInt(dot.dataset.imageIndex);
            showCarouselImage(carousel, imageIndex);
        });
    });
}

// Funzione per mostrare un'immagine specifica nel carosello
function showCarouselImage(carousel, imageIndex) {
    const images = carousel.querySelectorAll(".carousel-image");
    const dots = carousel.querySelectorAll(".carousel-dot");

    images.forEach(img => img.classList.remove("active"));
    dots.forEach(dot => dot.classList.remove("active"));

    images[imageIndex].classList.add("active");
    dots[imageIndex].classList.add("active");
}

// Click sul bottone NEXT (solo se esiste)
if (nextButton) {
    nextButton.addEventListener("click", () => {
        const isMobile = window.innerWidth <= 768;
        
        // Desktop: 2 set totali (0, 1)
        // Mobile: 3 set totali (0, 1, 2)
        const maxSets = isMobile ? 3 : 2;
        
        // Cambia set
        currentSet = (currentSet + 1) % maxSets;
        if (galleryContainer) {
            renderGallery(currentSet);
        }

        // Aggiorna rotazione freccia in base al set
        if (isMobile) {
            // Mobile: 3 set
            rotation = currentSet === 2 ? 180 : 0;
        } else {
            // Desktop: 2 set, rotazione alternata
            rotation += 180;
        }

        if (arrow) {
            arrow.style.transform = `rotate(${rotation}deg)`;
        }
    });
}