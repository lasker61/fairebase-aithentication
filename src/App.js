import logo from './logo.svg';
import './App.css';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useState } from 'react';
firebase.initializeApp(firebaseConfig);

function App() {
  const [user,setUser] =useState({
    isSignedIn :false,
    name:'',
    email:'',
    photo:''
  })


  const provider = new firebase.auth.GoogleAuthProvider();
  const handleSignIn=()=>{
    console.log('clicked');
    firebase.auth().signInWithPopup(provider)
    .then(res=>{
      const{photoURL,displayName,email} =res.user;
      const signedInUser ={
        isSignedIn:true,
        name:displayName,
        email:email,
        photo:photoURL
      }
      setUser(signedInUser);
      console.log(photoURL,displayName,email);
    })
    .catch(err =>{
      console.log(err);
      console.log(err.message);
    })

  }
  const handleSignedOut=()=>{
    firebase.auth().signOut().then(() => {
      // Sign-out successful.
      const signedOutUser={
        isSignedIn :false,
        name:'',
        email:'',
        photo:''
      } 
      setUser(signedOutUser);    
    }).catch((error) => {
      // An error happened.
    });

    console.log("signed out");
  }

  return (
    <div className="App">
      {
        user.isSignedIn ? <button onClick={handleSignedOut}>sign out</button> :
        <button onClick={handleSignIn}>sign in</button>
      }
     
     {
       user.isSignedIn && <div>
          <p>welcome,{user.name}</p>
          <p>your email: {user.email}</p>
          <img src={user.photo} alt="" />
       </div>
     }
    </div>
  );
}

export default App;
