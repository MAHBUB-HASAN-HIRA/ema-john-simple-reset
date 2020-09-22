import * as firebase from "firebase/app";
import firebaseConfig from '../../firebase.config'
import "firebase/auth";

export const initializedLogInFramework = () =>{
    if(firebase.apps.length === 0){
        firebase.initializeApp(firebaseConfig);
    }
}
export const handleGoogleSignIn = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
        return firebase.auth().signInWithPopup(googleProvider)
        .then(result => {
            const {displayName, email, photoURL} = result.user;
            const signInUser ={
                isSignIn: true,
                name: displayName,
                email: email,
                photoURL: photoURL,
                success: true,
        };
        return signInUser;
    })
    .catch(error =>{ error && alert(error.message)});
}

export const handleFbSignIn = ()=> {
    const fbProvider = new firebase.auth.FacebookAuthProvider();
     return  firebase.auth().signInWithPopup(fbProvider)
        .then(res => {
            const {displayName, email, photoURL} = res.user;
            const signInUser ={
                isSignIn: true,
                name: displayName,
                email: email,
                photoURL: photoURL,
                success: true,
        }; console.log(res)
        return signInUser;

        })
        .catch(error => {
            console.log(error);
          });
    };

    export const handleSignOut = () => {
        return firebase.auth().signOut()
        .then(res =>  {
            const signInUser ={
                isSignIn:false,
                success:false,
            };
            return signInUser;
        })
    }

export const createUserWithEmailAndPassword = (name, email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(res => {
        const newUserInfo = res.user;
        newUserInfo.error = '';
        newUserInfo.success = true;
        updateUser(name, res.photoURL);
        return newUserInfo;
    })
    .catch(error => {
        const newUserInfo = {};
        newUserInfo.error = error.message;
        newUserInfo.success = false;
        return newUserInfo;
    });
}
export const signInWithEmailAndPassword = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
            .then(res => {
                const newUserInfo = res.user;
                newUserInfo.name = '';
                newUserInfo.password = '';
                newUserInfo.error = '';
                newUserInfo.success = true;
                return newUserInfo;
                
            })
            .catch(error => {
                const newUserInfo = {};
                newUserInfo.error = error.message;
                newUserInfo.success = false;
                return newUserInfo;
            });
}

export const updateUser = (name, photoURL) => {
            var user = firebase.auth().currentUser;
            user.updateProfile({
            displayName: name,
            photoURL: photoURL,
            }).then(res => {
            console.log('updated success');
            }).catch(error => {
            
            });
    }