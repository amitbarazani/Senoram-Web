const login = document.querySelector('#modalLRForm')
login.addEventListener('click', (e)=>{
    e.preventDefault();
    
    const email = login('login-email').value;
    const password = login('login-password').value;
    auth.signInWithEmailAndPassword(email,password).then(cred => {
        console.log("cred.user")
    })
    
})