import firebase from 'firebase';

const firebaseRegister = (email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
        // Handle Errors here.
        console.log(error.message);
        return "Email in use"
        // ...
    })
}

export default firebaseRegister;