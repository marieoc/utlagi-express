const Contact = require('../../model/Contact');


module.exports.get = async (req, res) => {
    const session = req.session;
    const name = req.params.name;
    
    try {
        const contact = await Contact.findOne({ _id: name });
    
        res.render('admin/handleContactForm', { session, contact, title: "Útlagi - Répondre à l'email de contact" });
    }
    
    catch (err) {
        console.log(err);
    }
    
};

module.exports.answer_form = async (req, res) => {
    const session = req.session;
    const name = req.params.name;
    
    const contact = await Contact.findOne({ _id: name });
    
    res.render('admin/handleContactForm', { session, contact, title: "Útlagi - Répondre à l'email de contact" });
}