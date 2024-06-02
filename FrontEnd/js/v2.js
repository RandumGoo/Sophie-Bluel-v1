let works = []; // Tableau pour stocker les données de la galerie
let currentCategory = "Tous"; // Catégorie actuellement sélectionnée

const allButton = document.getElementById("all");
const objetButton = document.querySelector(".btn.objet");
const appartementsButton = document.getElementById("Appartements");
const hrButton = document.getElementById("H&r");
const gallery = document.querySelector(".gallery");
const form = document.querySelector(".form-login");
const modifierMod = document.querySelector(".modification");
const backMod = document.querySelector(".modal-back");
const xMark = document.querySelectorAll(".fa-xmark");
const imageModal = document.getElementById("file");
const titreModal = document.getElementById("title-modal");
const categorieModal = document.getElementById("categorie-modal");
const displayModal = document.querySelector(".display-works-modal");

async function fetcher() {
  await fetch(`http://localhost:5678/api/works`)
    .then((res) => res.json())
    .then((data) => (works = data));

  filterWorksByCategory(currentCategory);
  galeriesDisplayModal(works);
}

function galeriesDisplay(filteredWorks) {
  gallery.innerHTML = filteredWorks
    .map(
      (work) =>
        `
        <figure id=${work.id}>
          <img src=${work.imageUrl}>
          <figcaption>${work.title}</figcaption>
        </figure>
      `
    )
    .join("");
}

function filterWorksByCategory(category) {
  const filteredWorks =
    category === "Tous"
      ? works
      : works.filter((work) => work.category.name === category);
  console.log(filteredWorks);
  galeriesDisplay(filteredWorks);
  currentCategory = category; // Mettre à jour la catégorie actuelle
}

allButton.addEventListener("click", () => {
  filterWorksByCategory("Tous");
});

objetButton.addEventListener("click", () => {
  filterWorksByCategory("Objets");
});

appartementsButton.addEventListener("click", () => {
  filterWorksByCategory("Appartements");
});

hrButton.addEventListener("click", () => {
  filterWorksByCategory("Hotels & restaurants");
});

// window.addEventListener("load", fetcher);

modifierMod.addEventListener("click", () => {
  document.getElementById("modal").style.display = "block";
});

backMod.addEventListener("click", () => {
  document.getElementById("modal").style.display = "none";
});

xMark.forEach((mark) =>
  mark.addEventListener("click", () => {
    document.getElementById("modal").style.display = "none";
  })
);

/* modal */

/* navigation modal */

const modalAdding = document.querySelector(".modal-adding");
const modalDelete = document.querySelector(".modal-delete");
const addImages = document.querySelector(".add-images");
const arrowLeft = document.querySelector(".back-modal");

addImages.addEventListener("click", () => {
  modalAdding.style.display = "block";
  modalDelete.style.display = "none";
});

arrowLeft.addEventListener("click", () => {
  modalAdding.style.display = "none";
  modalDelete.style.display = "block";
});

/* Ajout images */

const selectedImage = document.getElementById("selected-image");
const imgChoose = document.querySelector(".before-selected");
const SelecImage = document.querySelector(".after-selected");
const myForm = document.getElementById("submit-modal");

imageModal.addEventListener("change", function (event) {
  const file = event.target.files[0];
  if (file) {
    selectedImage.src = URL.createObjectURL(file);
    imgChoose.style.display = "none";
    selectedImage.style.display = "block";
  } else {
    selectedImage.src = "";
  }
});

myForm.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log("form submitted");
  const file = imageModal.files[0];

  if (file) {
    alert("salut");
    const formData = new FormData();
    formData.append("image", file);
    formData.append("title", `${titreModal.value}`);
    formData.append("category", `${categorieModal.value}`);
    // const requestOptions = {
    //   method: "POST",
    //   body: formData,
    //   headers: {
    //     accept: "application/json",
    //     Authorization: `Bearer ${localStorage.getItem("token de connexion")}`,
    //   },
//     };

//     fetch("http://localhost:5678/api/works", requestOptions)
//       .then((response) => response.json())
//       .then((data) => {
//         console.log(data);
//       })
//       .catch((error) => {
//         console.error("Erreur lors de l'envoi de la requête:", error);
//       });
//   } else {
//     event.preventDefault();
//     console.error("Aucun fichier sélectionné.");
  }
});

/* DELETE SECTION */

function galeriesDisplayModal(worksModal) {
  displayModal.innerHTML = worksModal
    .map(
      (work) =>
        `
        <figure class="works">
          <i id=${work.id} class="fa-solid fa-trash-can"></i>
          <img src=${work.imageUrl}>
        </figure>
        `
    )
    .join("");

  const trashCan = document.querySelectorAll(".fa-trash-can");

  trashCan.forEach(function (trash) {
    trash.addEventListener("click", function (event) {
      event.preventDefault();
      const elementId = event.currentTarget.id;
      const requestOptionsDelete = {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token de connexion")}`,
        },
      };

      fetch(
        `http://localhost:5678/api/works/${elementId}`,
        requestOptionsDelete
      );
    });
  });
}

/* gestion login-side of the site */

const modifieBtn = document.querySelector(".modification");
const tri = document.querySelector(".tri");
const editVersion = document.querySelector(".edit-mod");
const loginOut = document.querySelector(".login-logout");

const connected = localStorage.getItem("token de connexion") ? true : false;

if (connected) {
  modifieBtn.style.display = "flex";
  tri.style.display = "none";
  editVersion.style.display = "flex";
  loginOut.innerText = "Logout";
}

// //LOG OUT!! a la fermeture onglet / redirection & Rechargement pour la sécurité
// function removeToken() {
//   // Supprime le token du localStorage
//   localStorage.removeItem("token de connexion");
// }

// //événement fermeture onglet ou redirection vers un autre site
// window.addEventListener("unload", removeToken);

window.addEventListener("load", fetcher);
