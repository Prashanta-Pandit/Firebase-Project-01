import {auth} from './initializeFirebase.js';  // importing these items from the initializeFirebase.js file.
import { signInWithEmailAndPassword  } from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js';
import { getUsersEmailsFromFireStoreDb } from './firestoreDbUsers.js';

const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const email = loginForm.email.value;
    const password = loginForm.password.value;

    //determine the email input match or not.
    if(getUsersEmailsFromFireStoreDb(email)){
        alert('Your email does not match the database.');
    }else{
        // firebase function to sign in to email and passoword. 
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            //console.log('User signed in: ', user.email);
            // Redirect to another page or show success message
            window.location.href = "/src/loadingPage.html"; // redirecting the dashboard.html file from index.html file. 
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error('Error signing in: ', errorCode, errorMessage);
            // Display error message to user
        });
    }
});