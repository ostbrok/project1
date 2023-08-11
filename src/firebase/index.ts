import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAb96FROzIe5n_mFEPlobiud6LLu3_f5EI",
    authDomain: "project1-73b30.firebaseapp.com",
    databaseURL: "https://project1-73b30-default-rtdb.firebaseio.com",
    projectId: "project1-73b30",
    storageBucket: "project1-73b30.appspot.com",
    messagingSenderId: "744820412800",
    appId: "1:744820412800:web:3ec5d829670f325d783165"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
