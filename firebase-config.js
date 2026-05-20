const firebaseConfig = {
  apiKey: "AIzaSyCEjzzkckQijRy6a2c9-PN14ruXbh6UHZg",
  authDomain: "ririchu-14b81.firebaseapp.com",
  projectId: "ririchu-14b81",
  storageBucket: "ririchu-14b81.firebasestorage.app",
  messagingSenderId: "953374002219",
  appId: "1:953374002219:web:547d2abd4bb86dd4c8ee6e"
};

firebase.initializeApp(firebaseConfig);
const db   = firebase.firestore();
const auth = firebase.auth();
