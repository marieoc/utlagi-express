const toggleSections = () => {
    // TABS ON ADMIN AND USER DASHBOARD
    const links = document.querySelectorAll('.dashboard-tab');
    const sections = document.querySelectorAll('.sections-wrapper .section');
    
    if (links) {
        
        if (sections[0]) {
            sections[0].style.display = 'block';
        }
        
        
        for (let i=0; i < links.length; i++) {
            
          links[i].addEventListener("click", (e) => {
                
            links.forEach(tab => tab.classList.remove('active-sections-tab'));
            
            
            // select all children in links that gets targeted
            for (let child of links[i].children) {
                
                // if child of button is targeted, parent (button) takes active class.
                if (e.target === child) {
                links[i].classList.add('active-sections-tab');
                }
            }
            
            for (let x=0; x < sections.length; x++) {
                sections[x].style.display = 'none'
            }
                
            sections[i].style.display = 'block';
          });
        }
    }
    
    
    
    // TABS ON PRODUCT PAGE
    
    const productPageTabs = document.querySelectorAll('.product-section__tab');
    const productPageSections = document.querySelectorAll('.product-details .section');
    
    if (productPageTabs) {
        
        if (productPageSections[0]) {
            productPageSections[0].style.display = 'block';
        }
        for (let i=0; i < productPageTabs.length; i++) {
            
          productPageTabs[i].addEventListener("click", (e) => {
              
              productPageTabs.forEach(tab => tab.classList.remove('active-product-tab'));
              
              let selectedTab = e.target;
              selectedTab.classList.add('active-product-tab');
              
                for (let x=0; x < productPageSections.length; x++) {
                    productPageSections[x].style.display = 'none'
                }
                
            productPageSections[i].style.display = 'block';
          });
        }
    }
       
};

export default toggleSections;