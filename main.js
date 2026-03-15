const form = document.getElementById("contact-form");
const toast = document.querySelector(".toast");

let toastTimer;

function showToast() {
  clearTimeout(toastTimer);
  toast.classList.remove("show");

  // Force a reflow so the browser restarts the CSS transition
  // even if the toast is already visible
  toast.offsetHeight;

  toast.classList.add("show");
  toastTimer = setTimeout(() => toast.classList.remove("show"), 3000);
}

function updateFieldError(field, valid) {
  const wrapper = field.closest(
    ".input-wrapper, .checkbox-group-wrapper, fieldset",
  );
  wrapper.querySelector(".error-message").hidden = valid;
  field.setAttribute("aria-invalid", valid ? "false" : "true");
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  let isValid = true;
  let firstInvalidField = null;

  // Deduplicate radio groups — validate only one input per name
  const seen = new Set();
  const fields = [...form.querySelectorAll("[required]")].filter((field) => {
    if (field.type === "radio") {
      if (seen.has(field.name)) return false;
      seen.add(field.name);
    }
    return true;
  });

  fields.forEach((field) => {
    const valid = field.checkValidity();
    updateFieldError(field, valid);
    if (!valid) {
      isValid = false;
      if (!firstInvalidField) firstInvalidField = field;
    }
  });

  if (!isValid) {
    firstInvalidField.focus();
    return;
  }

  showToast();
  form.reset();
});

form.querySelectorAll("[required]").forEach((field) => {
  const event =
    field.type === "checkbox" || field.type === "radio" ? "change" : "input";
  field.addEventListener(event, () =>
    updateFieldError(field, field.checkValidity()),
  );
});
