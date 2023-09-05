// handle errors
// error.message = "user validation failed"
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { name: '', email: '', password: '' };
    
    // duplicate error code
    if (err.code === 11000) {
        errors.email = 'Cet email est déjà utilisé';
        return errors;
    }
    
    // Validation errors
    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }
    return errors;
};

module.exports.handleErrors = handleErrors;