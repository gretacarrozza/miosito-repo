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