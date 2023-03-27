const nav = document.querySelector("nav");
const toggleMenu = document.querySelector(".nav__menu");
const urlError = document.querySelector(".url__error");

toggleMenu.addEventListener("click", () => {
    nav.classList.toggle("active");
});

const urlForm = document.querySelector(".url__form");
const urlInput = document.querySelector(".url__input");
const urlSubmit = document.querySelector(".url__submit");

urlForm.addEventListener("submit", (e) => {
    e.preventDefault();
    fetch(`https://api.shrtco.de/v2/shorten?url=${urlInput.value}`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            if (!data.ok) {
                urlError.textContent = data.error;
            }
        });
});
