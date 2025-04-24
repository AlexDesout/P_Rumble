fetch("data.json")
    .then((res) => res.json())
    .then((data) => {
        const container = document.getElementById("galerie");

        data.forEach((item) => {
            const col = document.createElement("div");
            col.className = "col-6 col-sm-4 col-md-3 col-lg-2";

            // Vérification si c'est "J-M.PECATTE"
            let modalToggle = '';
            if (item.nom === "J-M.PECATTE") {
                // Pas d'attribut data-bs-toggle pour J-M.PECATTE
                modalToggle = '';
            } else {
                // Ajoute l'attribut pour les autres personnages
                modalToggle = 'data-bs-toggle="modal" data-bs-target="#modalImage"';
            }

            col.innerHTML = `
        <div class="card h-100" ${modalToggle}>
          <img src="img/${item.nomImageLocal}" alt="${item.nom}" class="card-img-top">
          <div class="p-2">
            <p class="card-title text-white">${item.nom}</p>
          </div>
        </div>
      `;

            // Ajout de l'événement click pour chaque image
            col.querySelector('img').addEventListener('click', (event) => {
                if (item.nom === "J-M.PECATTE") {
                    // Afficher une alerte pour "J-M.PECATTE"
                    alert("On ne peut pas parier sur le patron !");
                } else {
                    // Ouvrir la modal pour les autres personnages
                    const modalImg = document.getElementById("modalImageContent");
                    const modalInput = document.getElementById("modalInput");
                    const modalTitle = document.getElementById("modalImageLabel");

                    modalImg.src = `img/${item.nomImageLocal}`;  // Définir l'image dans la modal
                    modalTitle.textContent = item.nom;  // Mettre à jour le titre avec le nom du personnage
                    modalInput.value = '';  // Reset la zone de texte à chaque clic
                }
            });

            container.appendChild(col);
        });
    })
    .catch((err) => {
        console.error("Erreur lors du chargement du JSON :", err);
    });

// Récupère l'input
const modalInput = document.getElementById("modalInput");

// Ajoute un événement pour vérifier la valeur quand l'utilisateur saisit
modalInput.addEventListener("input", () => {
    let value = parseInt(modalInput.value);

    // Vérifie si la valeur est un nombre pair et supérieur à 0
    if (value <= 0 || value % 2 !== 0) {
        modalInput.setCustomValidity("Veuillez entrer un nombre pair supérieur à 0");
        modalInput.reportValidity(); // Affiche le message d'erreur
    } else {
        modalInput.setCustomValidity(""); // Efface les erreurs si c'est valide
    }
});

