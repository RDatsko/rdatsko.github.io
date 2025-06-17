const regions = ["NorthAmerica", "SouthAmerica", "Asia", "Australia", "Antartica", "Europe", "Africa"];

regions.forEach(selector => {
    const el = document.getElementById(selector);
    if (!el) return;

    el.addEventListener("mouseenter", () => el.classList.add("hovered"));
    el.addEventListener("mouseleave", () => el.classList.remove("hovered"));

    el.addEventListener("click", () => {
        // Add "selected" class to clicked element
        el.classList.add("selected");

        // Show the related div
        const activeDiv = document.getElementById("S" + selector);
        if (activeDiv) {
            activeDiv.style.opacity = 1;
            activeDiv.style.pointerEvents = "auto";
        }

        // Remove "selected" and hide other regions
        regions.filter(id => id !== selector).forEach(id => {
            const regionEl = document.getElementById(id);
            regionEl?.classList.remove("selected");

            const regionDiv = document.getElementById("S" + id);
            if (regionDiv) {
                regionDiv.style.opacity = 0;
                regionDiv.style.pointerEvents = "none"; // ✅ Important fix
            }
        });
    });
});

function dlgClose(selector) {
    const mapEl = document.getElementById(selector);
    const activeDiv = document.getElementById("S" + selector);

    if (mapEl) {
        mapEl.classList.remove("selected");
    }

    if (activeDiv) {
        activeDiv.style.opacity = 0;
        activeDiv.style.pointerEvents = "none"; // ✅ Ensure the overlay no longer blocks clicks
    }
}