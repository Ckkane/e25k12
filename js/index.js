const form = document.getElementById("form");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const squareInput = document.getElementById("square");
const phoneNumberInput = document.getElementById("phoneNumber");
const cityInput = document.getElementById("city");
const selectObject = document.getElementById("selectObject");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const squareError = document.getElementById("squareError");
const phoneNumberError = document.getElementById("phoneNumberError");
const cityError = document.getElementById("cityError");

// Regex for email
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Regex for phone
const phonePattern = /^\d{10}$/;

function showError(input, errorEl) {
  input.classList.add("is-danger");
  errorEl.classList.remove("is-hidden");
}

function clearError(input, errorEl) {
  input.classList.remove("is-danger");
  input.classList.add("is-success");
  errorEl.classList.add("is-hidden");
}

function validateName() {
  if (nameInput.value.trim() === "") {
    showError(nameInput, nameError);
    return false;
  }
  clearError(nameInput, nameError);
  return true;
}

function validateCity() {
  if (cityInput.value.trim() === "") {
    showError(cityInput, cityError);
    return false;
  }
  clearError(cityInput, cityError);
  return true;
}

function validateEmail() {
  if (!emailPattern.test(emailInput.value)) {
    showError(emailInput, emailError);
    return false;
  }
  clearError(emailInput, emailError);
  return true;
}

function validateSquare() {
  if (squareInput.value == "") {
    showError(squareInput, squareError);
    return false;
  }
  clearError(squareInput, squareError);
  return true;
}

function validatePhoneNumber() {
  const value = phoneNumberInput.value.replace(/\s+/g, "");

  if (!phonePattern.test(value)) {
    showError(phoneNumberInput, phoneNumberError);
    return false;
  }
  clearError(phoneNumberInput, phoneNumberError);
  return true;
}

// Live validation
nameInput.addEventListener("input", validateName);
emailInput.addEventListener("input", validateEmail);
squareInput.addEventListener("input", validateSquare);
phoneNumberInput.addEventListener("input", validatePhoneNumber);
cityInput.addEventListener("input", validateCity);

// On submit
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const isNameValid = validateName();
  const isEmailValid = validateEmail();
  const isSquareValid = validateSquare();
  const isPhoneNumberValid = validatePhoneNumber();
  const isCityValid = validateCity();

  if (
    isNameValid &&
    isEmailValid &&
    isSquareValid &&
    isPhoneNumberValid &&
    isCityValid
  ) {
    sendForm();
    form.reset();
    
    document.querySelectorAll(".input").forEach((i) => {
      i.classList.remove("is-success");
    });
  }
});

async function sendForm() {
  let response;
  try {
    response = await fetch("/api/sendForm", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: nameInput.value,
        email: emailInput.value,
        square: squareInput.value,
        phone: phoneNumberInput.value,
        type: selectObject.options[selectObject.selectedIndex].text,
      }),
    });
  } catch (error) {
    alert(error)
  }finally {
    if(response.ok){
      alert('Форма отправлена')
    }
  }
}