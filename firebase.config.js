const firebase = require("firebase/compat/app");
require("firebase/compat/firestore");

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const projectCollectionRef = db.collection("project");
const skillCollectionRef = db.collection("skills");
const userCollectionRef = db.collection("users");
const resumeCollectionRef = db.collection("resume");
const moreProjectCollectionRef = db.collection("moreProject");

module.exports = {
  projectCollectionRef,
  skillCollectionRef,
  userCollectionRef,
  resumeCollectionRef,
  moreProjectCollectionRef,
};
