const nav = document.querySelector("nav");
const toggleMenu = document.querySelector(".nav__menu");
const urlError = document.querySelector(".url__error");
const listContainer = document.querySelector(".url__list-container");

toggleMenu.addEventListener("click", () => {
    nav.classList.toggle("active");
});

const urlForm = document.querySelector(".url__form");
const urlInput = document.querySelector(".url__input");
const urlSubmit = document.querySelector(".url__submit");

const errorMessages = {
    1: "No URL specified. Please enter a valid URL.",
    2: "Invalid URL submitted. Please enter a valid URL.",
    3: "Rate limit reached. Please wait and try again.",
    4: "Your IP address has been blocked. Please contact support.",
    5: "The short code is already taken. Please try a different URL.",
    6: "Unknown error. Please try again later.",
    7: "No code specified. Please enter a valid short code.",
    8: "Invalid code submitted. Please enter a valid short code.",
    9: "Missing required parameters. Please try again.",
    10: "The URL cannot be shortened. Please try a different URL.",
};

function deleteListItem(deleteBtn) {
    const listItem = deleteBtn.parentElement;
    listItem.remove();
    console.log(listItem);
}

listContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn")) {
        deleteListItem(e.target);
    }
});

urlForm.addEventListener("submit", (e) => {
    e.preventDefault();
    fetch(`https://api.shrtco.de/v2/shorten?url=${urlInput.value}`)
        .then((res) => res.json())
        .then((data) => {
            if (!data.ok) {
                //style change
                urlInput.style.border = "2px solid hsl(0, 87%, 67%)";
                urlError.style.display = "block";

                const errorCode = data.error_code;
                const errorMessage =
                    errorMessages[errorCode] ||
                    "An unknown error occurred. Please try again later.";
                urlError.textContent = errorMessage;
            } else {
                //style change
                urlInput.style.border = "none";
                urlError.style.display = "none";

                listContainer.innerHTML += `<li class="url__list">
                <p class="old-link">${urlInput.value}</p>
                <hr />
                <div class="url__list-short">
                    <a href="${data.result.full_short_link}" class="short-link"
                        >${data.result.full_short_link}</a
                    >
                    <button type="button" class="copy-btn" onclick="navigator.clipboard.writeText('${data.result.full_short_link}')">Copy</button>
                </div>
                <button type="button" class="delete-btn">❌</button>
            </li>`;
                urlInput.value = "";
            }
        });
});
