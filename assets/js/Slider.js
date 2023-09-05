import { useState, useEffect } from 'react';

// function for href in Reac component
function slugify(str) {
	return str
		.toLowerCase()
		.trim()
		.replace(/['.]/g, "")
		.replace(/[:;]/g, "")
		.replace(/[\s_-]+/g, "")
		.replace(/[éèê]/g, "e")
		.replace(/[ùüú]/g, "u")
		.replace(/^-+|-+$/g, "");
};



const Slider = () => {
    
    // faire un fetch des articles dans le slider ???
    
    const articleArray = document.getElementById('sliderWrapper').getAttribute('data-articles');
    const parsedArray = JSON.parse(articleArray);
    
    // State
    const [pictureIndex, setPictureIndex] = useState(2);
    
    
    setTimeout(() => {
        
        if ((parsedArray.length - 1) === pictureIndex ) {
            setPictureIndex(0);
            
        } else {
            setPictureIndex(pictureIndex + 1);
        }
        
    }, 7000);
    
    
    
    // Render
    return (
        <>
            <div className="slider">
                <div className="slide">
                <img src={"/img/articles/" + parsedArray[pictureIndex].image} />
                    <div className="card">
                        <p>{parsedArray[pictureIndex].title}</p>
                        <p className="mobile-txt">{parsedArray[pictureIndex].content.substring(0, 80) + '...'}</p>
                        <p className="desktop-txt">{parsedArray[pictureIndex].content.substring(0, 200) + '...'}</p>
                        <div>
                            <a className="primary-btn" href={"/actualites/" + slugify(parsedArray[pictureIndex].title)}>Lire la suite</a>
                        </div>
                    </div>
                </div>
                
            </div>
        </>
    )
    
    
};

export default Slider;