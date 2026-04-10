const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");
const admissionForm = document.getElementById("admissionForm");
const formNote = document.getElementById("formNote");
const offerPopup = document.getElementById("offerPopup");
const chatPopup = document.getElementById("chatPopup");

if (menuBtn && navMenu) {
  menuBtn.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  });

  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => navMenu.classList.remove("active"));
  });
}

document.querySelectorAll("[data-close]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const popupId = btn.getAttribute("data-close");
    const popup = document.getElementById(popupId);
    if (popup) popup.classList.remove("active");
  });
});

window.addEventListener("click", (event) => {
  if (event.target === offerPopup) offerPopup.classList.remove("active");
  if (event.target === chatPopup) chatPopup.classList.remove("active");
});

window.addEventListener("load", () => {
  setTimeout(() => {
    offerPopup.classList.add("active");
  }, 1200);

  setTimeout(() => {
    chatPopup.classList.add("active");
  }, 5500);
});

if (admissionForm) {
  admissionForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = admissionForm.name.value.trim();
    const phone = admissionForm.phone.value.trim();
    const studentClass = admissionForm.class.value.trim();

    if (!name || !phone || !studentClass) {
      formNote.textContent = "Please fill all details before submitting.";
      return;
    }

    formNote.textContent = "Thank you! Our team will call you shortly for admission support.";
    admissionForm.reset();
  });
}
