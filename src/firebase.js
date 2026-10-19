import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAyDh8vOmpiUsG01BxiJTOKrqPfuXlQLFk",
    authDomain: "fms-bgk.firebaseapp.com",
    projectId: "fms-bgk",
    storageBucket: "fms-bgk.firebasestorage.app",
    messagingSenderId: "973386375343",
    appId: "1:973386375343:web:35e47726fda98dd106b45a"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
