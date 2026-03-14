const form = document.getElementById("contact-form");
const toast = document.querySelector(".toast");

let toastTimer;

function showToast() {
  clearTimeout(toastTimer);
  toast.classList.remove("show");

  toast.offsetHeight;

  toast.classList.add("show");
  toastTimer = setTimeout(() => toast.classList.remove("show"), 3000);
}

function toggle(field, valid) {
  const wrapper = field.closest(
    ".input-wrapper, .checkbox-group-wrapper, fieldset",
  );
  wrapper.querySelector(".error-message").hidden = valid;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  let isValid = true;

  form.querySelectorAll("[required]").forEach((field) => {
    const valid = field.checkValidity();
    toggle(field, valid);
    if (!valid) isValid = false;
  });

  if (!isValid) return;

  showToast();
  form.reset();
});

form.querySelectorAll("[required]").forEach((field) => {
  field.addEventListener("input", () => toggle(field, field.checkValidity()));
});
