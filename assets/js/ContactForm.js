import { useRef } from 'react';

const ContactForm = () => {
    
    const msgRef = useRef(null);
    const successMsgRef = useRef(null);
    const formRef = useRef(null);
    
    
    // send data with fetch, only when recaptcha is checked on frontend
    const handleContactForm = async (e) => {
        e.preventDefault();
        
        const formData = await new FormData(e.target);
        const recaptchaResponse = formData.get('g-recaptcha-response');
  
        
        if (recaptchaResponse) {
            msgRef.current.innerText = '';
            
            // if captcha is checked, then do fetch request
            await fetch('/contact', {
                method: 'POST', 
                body: formData
            });
            
            successMsgRef.current.innerText = 'Votre formulaire a bien été envoyé'; 
            formRef.current.reset();
            
        } else {
            msgRef.current.innerText = 'Veuillez valider le CAPTCHA avant de soumettre votre formulaire';
        }
    };
    
    return (
        <form
            className="contact-form"
            action="/contact"
            method="POST"
            onSubmit={handleContactForm}
            ref={formRef}
        >
            <div>
                <p>* : champ obligatoire</p>
            </div>
            <div className="flex">
                <label>
                    <input type="text" name="name" placeholder="Nom *" required />
                </label>
                <label>
                    <input type="email" name="email" placeholder="Email *" required />
                </label>
            </div>
            <label>
                <input type="text" name="subject" placeholder="Objet *" required />
            </label>
            <label>
                <textarea name="msg" cols="30" rows="7" placeholder="Message *" required></textarea>
            </label>
            
            <div className="checkbox-wrapper">
                <input 
                    id="cookie"
                    type="checkbox"
                    name="cookie" 
                />
                <label className="cookie-text" htmlFor="cookie">
                    J'autorise Ùtlagi à enregistrer mes données
                </label>
            </div>
            
            <div className="recaptcha-wrapper">
                <div 
                    className="g-recaptcha"
                    data-sitekey="6LdoTvQlAAAAAGTiQRxAGNAwxLGu55CgbKjkZWHc"
                >
                </div>
                
            </div>
            <span className="captcha-msg" ref={msgRef} ></span>
            
            <div className="contact-button-wrapper">
                <span className="validation-msg" ref={successMsgRef} ></span>
                <button className="primary-btn" type="submit">Envoyer</button>
            </div>
            
        </form>
    );
};

export default ContactForm;