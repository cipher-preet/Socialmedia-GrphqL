module.exports.validateRegisterInput = (username,email,password,confirmPassword) =>{
    const errors = {};
    if(username.trim() === ''){
        errors.username = 'username must not be empty'
    }

    if(email.trim() === ''){
        errors.username = 'email must not be empty'
    }else{
        const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
        if(!email.match(regEx)){
            errors.email = 'please enter valid Email address'
        }
    }

    if(password === ""){
        errors.password = "password not be empty"
    }else if(password !== confirmPassword){
        errors.confirmPassword = "password must be match"
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}   

module.exports.ValidateLoginInput = (username,password) =>{
    const errors = {};
    if(username.trim() === ''){
        errors.username = 'Username must not be empty'
    } if(password.trim() === ''){
        errors.password = 'Password not be empty must not be empty'
    }
    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}