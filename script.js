// ====== 1. FIREBASE SETUP (CDN Links ke sath) ======
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-analytics.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";

// Teri web app ki Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBAaT_azWjcmKyTnjr7lSPr9mHQgw2g6tw",
  authDomain: "photon-classes-559ba.firebaseapp.com",
  projectId: "photon-classes-559ba",
  storageBucket: "photon-classes-559ba.firebasestorage.app",
  messagingSenderId: "456311948669",
  appId: "1:456311948669:web:e3f6aab3b3b82de1cdb814",
  measurementId: "G-813Z96BLRC"
};

// Initialize Firebase & Firestore
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// ====== 2. TERA UI LOGIC ======
const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");
const admissionForm = document.getElementById("admissionForm");
const formNote = document.getElementById("formNote");
const offerPopup = document.getElementById("offerPopup");
const chatPopup = document.getElementById("chatPopup");

if (menuBtn && navMenu) {
  menuBtn.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    const isOpen = navMenu.classList.contains("active");
    menuBtn.setAttribute("aria-expanded", String(isOpen));
  });

  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
      menuBtn.setAttribute("aria-expanded", "false");
    });
  });

  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!navMenu.contains(target) && !menuBtn.contains(target)) {
      navMenu.classList.remove("active");
      menuBtn.setAttribute("aria-expanded", "false");
    }
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
    if(offerPopup) offerPopup.classList.add("active");
  }, 1200);

  setTimeout(() => {
    if(chatPopup) chatPopup.classList.add("active");
  }, 5500);
});

// ====== 3. ASLI FIREBASE DATABASE LOGIC ======
if (admissionForm) {
  admissionForm.addEventListener("submit", async (event) => {
    event.preventDefault(); // Page refresh hone se rokega
    
    const name = admissionForm.name.value.trim();
    const phone = admissionForm.phone.value.trim();
    const studentClass = admissionForm.class.value.trim();

    if (!name || !phone || !studentClass) {
      formNote.style.color = "red";
      formNote.textContent = "Please fill all details before submitting.";
      return;
    }

    // Button ko "Submitting..." dikhana
    const submitBtn = admissionForm.querySelector('button[type="submit"]');
    submitBtn.textContent = "Submitting...";
    submitBtn.disabled = true;

    try {
      // Firestore ke 'enquiries' naam ke collection me data save karna
      await addDoc(collection(db, "enquiries"), {
        name: name,
        phone: phone,
        class: studentClass,
        timestamp: serverTimestamp() // Form submit hone ka time
      });

      // Agar data save ho gaya toh Success message
      formNote.style.color = "green";
      formNote.textContent = "Thank you! Our team will call you shortly for admission support.";
      admissionForm.reset();
      
    } catch (error) {
      // Agar koi error aaya toh
      console.error("Firebase Error: ", error);
      formNote.style.color = "red";
      formNote.textContent = "Error saving details. Please try again.";
    } finally {
      // Button ko wapas normal karna
      submitBtn.textContent = "Submit Enquiry";
      submitBtn.disabled = false;
    }
  });
}