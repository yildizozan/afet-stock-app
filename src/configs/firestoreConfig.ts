import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyBk7JL4uDULjsUTu9RFq4ppOuS7zYUmrTU",
    authDomain: "stock-app-edc71.firebaseapp.com",
    projectId: "stock-app-edc71",
    storageBucket: "stock-app-edc71.appspot.com",
    messagingSenderId: "1013808041931",
    appId: "1:1013808041931:web:84324e5bcde7b3a56f704e"
};
const app = initializeApp(firebaseConfig);
export default app;