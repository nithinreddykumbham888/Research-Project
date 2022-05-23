import { initializeApp } from "firebase/app";
import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
} from "firebase/auth";
import {
    getFirestore,
    query,
    getDocs,
    collection,
    where,
    addDoc,
} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBOhJ-eTlBwijGoEGfBLnhNnvvvD-shUVk",
    authDomain: "researchproject-31160.firebaseapp.com",
    projectId: "researchproject-31160",
    storageBucket: "researchproject-31160.appspot.com",
    messagingSenderId: "448332537378",
    appId: "1:448332537378:web:a4566afb99de295775347b"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
    try {
        const res = await signInWithPopup(auth, googleProvider);
        const user = res.user;
        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        const docs = await getDocs(q);
        if (docs.docs.length === 0) {
            await addDoc(collection(db, "users"), {
                uid: user.uid,
                name: user.displayName,
                authProvider: "google",
                email: user.email,
            });
        }
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const getUserData = async (uid) => {
    const q = query(collection(db, "Papers"), where("User", "==", uid));
    const result = await getDocs(q);
    let response = []
    result.forEach(doc => {
        response.push(doc.data());
    });
    // console.log(response)
    // response.map( (data) => {
    //     console.log(data)
    // })
    return response;
}

const getComments = async (url) => {
    const q = query(collection(db, "comments"), where("url", "==", url));
    const result = await getDocs(q);
    let response = []
    // console.log(url)
    result.forEach(doc => {
        const dat = doc.data() 
        response.push({date:dat.date,body:dat.body});
    });
    console.log(response)
    return response;
}

const addCommentToDatabase = async (url, date, body) => {
    addDoc(collection(db, "comments"), {
        url: url,
        date: date,
        body: body,
    })
        .then(() => {
            console.log("Data added in DB comment")
        })
        .catch(() => {
            console.log("Error data not saved")
        });
};

const addDataToDatabase = async (pdf_url, title, year, topic, tech, uid) => {
    addDoc(collection(db, "Papers"), {
        Pdf: pdf_url,
        Title: title,
        Year: year,
        Topic: topic,
        Technique: tech,
        User: uid,
    })
        .then(() => {
            console.log("Data added in DB")
        })
        .catch(() => {
            console.log("Error data not saved")
        });
};

const logInWithEmailAndPassword = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const registerWithEmailAndPassword = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "users"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const sendPasswordReset = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        alert("Password reset link sent!");
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const logout = () => {
    signOut(auth);
};

export {
    auth,
    db,
    signInWithGoogle,
    logInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordReset,
    logout,
    addDataToDatabase,
    getUserData,
    getComments,
    addCommentToDatabase,
};