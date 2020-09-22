import React, { useContext, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { UserContext } from '../../App';
// import { useHistory, useLocation } from 'react-router-dom';
import { handleGoogleSignIn, handleFbSignIn, handleSignOut, initializedLogInFramework, createUserWithEmailAndPassword, signInWithEmailAndPassword } from './LoginManager';

const Login = () => {

    const [newUser, setNewUser] = useState(false)
    const [user, setUser] = useState({
        isSignIn:false,
        name:'',
        email:'',
        password:'',
        photoURL:'',
        error:'',
        success: false,
    })
    
    initializedLogInFramework();
 

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
     const history = useHistory();
     const location = useLocation();
     let { from } = location.state || { from: { pathname: "/" } };

     const handleResponse = (res, redirect) =>{
        setUser(res);
        setLoggedInUser(res);
       if(redirect){
        history.replace(from);
       }
    }

    const googleSignIn = () => {
        handleGoogleSignIn()
        .then(res => {
            handleResponse(res, true)
        })
    }

    const fbSignIn = () => {
        handleFbSignIn()
        .then(res => {
            handleResponse(res, true)
        })
    }


    const signOut = () => {
        handleSignOut()
            .then(res =>{
                handleResponse(res, false)
        })
    }




    const handleBlur = (e) =>{
        let isFieldValid = true;
        if(e.target.name === 'email'){
            isFieldValid = /\S+@\S+\.\S+/.test(e.target.value); 
        }
        if(e.target.name === 'password'){
            const isPasswordValid = e.target.value.length >= 6;
            const passwordHasValid = /\d{1}/.test(e.target.value);
            isFieldValid= isPasswordValid && passwordHasValid;
        }

        if(isFieldValid){
            const newUserInfo = {...user};
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
        }
        
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(newUser && user.email && user.password){
            createUserWithEmailAndPassword(user.name, user.email, user.password)
            .then(res => {
                handleResponse(res, true)
            })
        };
        if(!newUser && user.email && user.password){
            signInWithEmailAndPassword(user.email, user.password)
            .then( res => {
                handleResponse(res, true);
            })
        }

    }



    return (
        <div style={{textAlign:'center'}}>
            <br/>
             <button onClick={fbSignIn}>Sign in with Facebook</button>
            {
                user.isSignIn ?
                <button onClick={signOut}>Sign Out</button>:
                <button onClick={googleSignIn}>Sign In With Google</button>
            }
            {
                user.isSignIn && 
                <div className='signIn_user_details'>
                    <h2>Name: {user.name}</h2>
                    <h4>Email: {user.email}</h4>
                    <img src={user.photoURL} alt=""/>
                </div>
            }
            <div>
                <form onSubmit={handleSubmit}>
                    <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id=""/>
                    <label htmlFor='newUser'>New User</label>
                    <br/>
                    {
                        newUser && 
                        <div>
                        <input type="text"  onBlur={handleBlur} name="name" placeholder='Your Name' id="" required/>
                        <br/><br/>
                        </div>
                     }
                    <input type="email"  onBlur={handleBlur} name="email" placeholder='Your Email' id="" required/>
                    <br/><br/>
                    <input type="password" onBlur={handleBlur}  name="password" placeholder='Password'  id="" required/>
                    <br/><br/>
                    <input type="submit" value={newUser ? 'Sign Up' : 'Sign In'}/>
                </form>
                { user.error && <p style={{color:'red'}}>{user.error}</p>}
                { user.success && <p style={{color:'green'}}>User {newUser ?'Created': 'Logged In'} Successfully</p>}
                
            </div>
        </div>
    );
};

export default Login;