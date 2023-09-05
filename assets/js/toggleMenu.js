
const toggleMenu = () => {
    const openMenu = document.getElementById('openMenu');
    const closeMenu = document.getElementById('closeMenu');
    const mobileMenu = document.getElementById('navbarMobile');
    const headerBtns = document.querySelector('.header-btn');
    
    openMenu.addEventListener('click', () => {
        openMenu.style.display = 'none';
        closeMenu.style.display = 'block';
        mobileMenu.style.display = 'block';
    });
    
    closeMenu.addEventListener('click', () => {
        openMenu.style.display = 'block';
        closeMenu.style.display = 'none';
        mobileMenu.style.display = 'none';
    });
    
    
    // close modals if click is outside of mobileMenu/shoppingCart and btns elements
    
    document.body.addEventListener('click', (event) => {
        const modalBox = document.getElementById('modalBox-wrapper');
        const shoppingCartRoot = document.getElementById('shoppingCart');
        const deleteBtn = document.getElementById('deleteFromCart');
        
        
        if (!mobileMenu?.contains(event.target) && !headerBtns.contains(event.target)) {
            openMenu.style.display = 'block';
            closeMenu.style.display = 'none';
            mobileMenu.style.display = 'none';
        }
        
        if (!shoppingCartRoot?.contains(event.target)) {
            modalBox.classList.remove('active');
        }
    });
    
    
};

export default toggleMenu;