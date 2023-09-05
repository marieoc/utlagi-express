const Contact = require('../model/Contact');

module.exports.get = (req, res) => {
    const session = req.session;
    
    res.status(200).render('../views/contact.ejs', { session, title: 'Útlagi - Contact' });
};



module.exports.post = async (req, res) => {
    
    try {
        // Create new ressource
        const contact = new Contact({
            name: req.body.name,
            email: req.body.email,
            subject: req.body.subject,
            message: req.body.msg,
            cookieConsent: req.body.cookie === 'on' ? true : false,
        }); 
        
        console.log(contact);
        await contact.save();
        
        res.json(contact);
    }
    
    catch (err) {
        console.log(err);
    }
};