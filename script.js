import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBAaT_azWjcmKyTnjr7lSPr9mHQgw2g6tw",
  authDomain: "photon-classes-559ba.firebaseapp.com",
  projectId: "photon-classes-559ba",
  storageBucket: "photon-classes-559ba.firebasestorage.app",
  messagingSenderId: "456311948669",
  appId: "1:456311948669:web:e3f6aab3b3b82de1cdb814"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const admissionForm = document.getElementById("admissionForm");
const formNote = document.getElementById("formNote");

// GOOGLE SHEETS WEB APP URL YAHAN DALEIN
const SHEETS_URL = "https://script.google.com/macros/s/AKfycbzAMfEKtIrQhNkKlG_c2yN3Inp4E_Sz2b4VJU2NbkZg4RpBWP45sqPNqeiEbh5bSomg/exec";

if (admissionForm) {
  admissionForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    
    const formData = {
      name: admissionForm.name.value.trim(),
      phone: admissionForm.phone.value.trim(),
      class: admissionForm.class.value.trim()
    };

    if (!formData.name || !formData.phone || !formData.class) {
      formNote.style.color = "red";
      formNote.textContent = "Please fill all details.";
      return;
    }

    const submitBtn = admissionForm.querySelector('button[type="submit"]');
    submitBtn.textContent = "Submitting...";
    submitBtn.disabled = true;

    try {
      // 1. Firebase mein save karna
      await addDoc(collection(db, "enquiries"), {
        ...formData,
        timestamp: serverTimestamp()
      });

      // 2. Google Sheets mein bhejna
      fetch(SHEETS_URL, {
        method: "POST",
        mode: "no-cors", // Crucial for Google Apps Script
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      formNote.style.color = "green";
      formNote.textContent = "Success! Data saved to Firebase & Sheets.";
      admissionForm.reset();
      
    } catch (error) {
      console.error("Error: ", error);
      formNote.style.color = "red";
      formNote.textContent = "Try again.";
    } finally {
      submitBtn.textContent = "Submit Enquiry";
      submitBtn.disabled = false;
    }
  });
}