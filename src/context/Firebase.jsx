import { createContext, useContext, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { addDoc, collection, getDocs, getFirestore, doc, getDoc, query, where } from "firebase/firestore";
import { getStorage, ref, getBytes, uploadBytes, getDownloadURL } from "firebase/storage";

const FirebaseContext = createContext(null);

const firebaseConfig = {
  apiKey: "AIzaSyBpEoUmmtYFXf0QXNnDI7z-ntXSl0s-lxY",
  authDomain: "bookify-be3c8.firebaseapp.com",
  projectId: "bookify-be3c8",
  storageBucket: "bookify-be3c8.appspot.com",
  messagingSenderId: "475465476103",
  appId: "1:475465476103:web:fa1fdd096dca79e22fe2a2",
};

const firebaseApp = initializeApp(firebaseConfig);
const FirebaseAuth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp)

const googleProvider = new GoogleAuthProvider();

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = ({ children }) => {
  
  const [user, setUser] = useState(null);
  
  useEffect(()=>{
    onAuthStateChanged(FirebaseAuth, (user)=>{
      if(user) setUser(user)
      else setUser(null);
      console.log("User", user);
    })
  },[])
  // Sign Up with Email & Password
  const signupUserWithEmailAndPassword = (email, pass) =>
    createUserWithEmailAndPassword(FirebaseAuth, email, pass);

  // Sign In with Email & Password
  const signinWithEmailAndPassword = (email, pass) =>
    signInWithEmailAndPassword(FirebaseAuth, email, pass);

  // Sign In with Google
  const signinWithGoogle = () => signInWithPopup(FirebaseAuth, googleProvider);

  const handleCreateNewListing = async (name, isbn, price, cover) => {
    const imageRef = ref(storage, `uploads/image/${Date.now()}-${cover.name}`);
    const uploadResult = await uploadBytes(imageRef, cover);
    await addDoc(collection(firestore, "books"), {
      name,
      isbn,
      price,
      imageURL: uploadResult.ref.fullPath,
      userID: user.uid,
      userEmail: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    })
  }

  const listAllBooks = () =>{
    return getDocs(collection(firestore, "books"));
  }

  const getImageURL = async (path) => {
    return await getDownloadURL(ref(storage, path));
  };

  const getBookById = (id) => {
    const docRef = doc(firestore, "books", id);
    const result = getDoc(docRef);
    return result;
  }

  const placeOrder = async (bookId, qty) => {
    const collectionRef = collection(firestore, 'books', bookId, "orders");
    const result = await addDoc(collectionRef, {
      userID: user.uid,
      userEmail: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      qty: Number(qty),
    });
    console.log("result", result);
    return result;
  }

  const fetchMyBooks = async (userID) => {
    if (user) { // Check if user is logged in
      const collectionRef = collection(firestore, "books");
      const q = query(collectionRef, where("userID", "==", userID));
      const result = await getDocs(q);
      return result;
    } else {
      console.log("User not logged in");
    }
  }

  const getOrders = async (bookId) => {
    const collectionRef = collection(firestore, "books", bookId, "orders");
    const result = await getDocs(collectionRef);
    return result;
  }

  // Check user loggdIn or Not
  const isLoggedIn = user ? true : false;

  return (
    <FirebaseContext.Provider
      value={{
        user,
        signupUserWithEmailAndPassword,
        signinWithEmailAndPassword,
        signinWithGoogle,
        isLoggedIn,
        handleCreateNewListing,
        listAllBooks,
        getImageURL,
        getBookById,
        placeOrder,
        fetchMyBooks,
        user,
        getOrders
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};
