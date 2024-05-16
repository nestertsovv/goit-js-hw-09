const formElem = document.querySelector('.feedback-form');
const formEmail = formElem.elements.email;
const formMessage = formElem.elements.message;
const errorElem = document.querySelector(".js-form-error");
const errorElemText = errorElem.querySelector(".error-text");
const LS_KEY = "feedback-form-state";
let formData = {
    email: "",
    message: "",
}

window.addEventListener("DOMContentLoaded", renderFields);

formElem.addEventListener("input", () => {
    const formDetails = new FormData(formElem);
    
    formData.email = formDetails.get("email").trim();
    formData.message = formDetails.get("message").trim();

    setItemToLS(LS_KEY, formData);
});

formElem.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!(formEmail.value.trim() && formMessage.value.trim())) {
        showErrorMessage();
    } else {
        formEmail.value = "";
        formMessage.value = "";

        console.log(formData);

        removeFromLS(LS_KEY);
        showSuccessMessage();
    }
})

function renderFields() {
    const data = loadFromLS(LS_KEY) || {};

    formEmail.value = data.email || "";
    formMessage.value = data.message || "";
}

function showErrorMessage() {
    if (!errorElem.classList.contains("active")) {
        errorElem.classList.add("active");
        errorElemText.textContent = "Fill please all fields";
    }
}

function showSuccessMessage() {
    if (!errorElem.classList.contains("active")) {
        errorElem.classList.add("active");
    }

    errorElem.classList.add("success");
    errorElemText.textContent = "Your form has been successfully submitted";

    setTimeout(() => {
        errorElem.classList.remove("active");
        errorElem.classList.remove("success");
    }, 3000);
}

function setItemToLS(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function loadFromLS(key) {
    const data = localStorage.getItem(key);

    try {
        const result = JSON.parse(data);
        return result;
    } catch (e) {
        return data;
    }
}

function removeFromLS(key) {
    localStorage.removeItem(key);
}