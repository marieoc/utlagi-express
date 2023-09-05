const User = require('../model/User');
const bcrypt = require('bcrypt');
const { slugify } = require('../model/helpers/slugify');
const { handleErrors } = require('../model/helpers/handleErrors');

const ROLE = {
    ADMIN: 'admin',
    USER: 'user'
};


module.exports.get = (req, res) => {
    const session = req.session;
    console.log(session.role)
    
    res.status(200).render('../views/login.ejs', { session, errors: '', validationMsg: '', message: '', title: 'Útlagi - Connexion' });
};

module.exports.signup_post = async (req, res) => {
    console.log('signup');
    const { name, email, password } = req.body;
    const session = req.session;
    
    try {
        await User.create({
            fname: name,
            slug: slugify(name),
            email,
            password,
            role: ROLE.USER
            
        }); // asynchronous function, require "async" and "await"
        res.render('../views/login.ejs', { session: session, errors: '', validationMsg: 'Votre compte a bien été créé', message: '', title: 'Útlagi - Connexion' });  // send a response
    }
    
    catch (err) { // if one of fields is missing, then send an error
        const errors = handleErrors(err);
        res.render('../views/login.ejs', { session, errors, validationMsg: '', message: '', title: 'Útlagi - Connexion' });
    }
    
};



module.exports.login_post = async (req, res) => {
    console.log('login');
    
    // create custom error messsages
    const message = 'Mauvais mot de passe ou adresse mail';
    
    // define session
    const session = req.session;
    
    try {
        // Find user in database
        const user = await User.findOne({ email: req.body.email });
        
        if (user) {
            console.log('utilisateur trouvé');
            
            const compare = await bcrypt.compare(req.body.password, user.password);
            console.log(compare);
            
            if (compare === true) {
                
                session.role = user.role;
                
                session.username = user.fname; // store user in session
                session.slug = user.slug;
                session.email = user.email;
                
                console.log('req.session ' + req.session);
                console.log('session ' + session);
                console.log('session slug ' + session.slug);
                
                // redirect to admin page if role is admin
                if (session.role === ROLE.ADMIN) {
                    console.log('message admin');
                    return res.redirect('/admin');
                }
                
                console.log('authentification approuvée');
                // redirect to user account if role is user
                return res.redirect('/moncompte');
            }
            // if password is invalid
            else {
                console.log('message pwd invalide');
                
                return res.render('../views/login.ejs', { session, message, errors: '', validationMsg: '', title: 'Útlagi - Connexion'});
            }
        }
        
        // if email is invalid
        else {
            console.log('message email invalide');
            
            return res.render('../views/login.ejs', { session, message, errors: '', validationMsg: '', title: 'Útlagi - Connexion'});
        }
    }
    catch (error) {
        console.log(error);
        return res.render('../views/login.ejs', { session, error, validationMsg: '', message, errors: '', title: 'Útlagi - Connexion'});
    }
    
};


module.exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect('/');
};

