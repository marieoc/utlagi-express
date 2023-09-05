import { useState, useEffect } from 'react';

const DeleteComment = () => {
    const [comments, setComments] = useState([]);
    const [session, setSession] = useState('');
    
    
    const productDataString = document.getElementById('commentsWrapperRoot').getAttribute('data-product');
    const productData = JSON.parse(productDataString);
    
    
    const jsonFetch = async () => {
        try {
            const response = await fetch(`/produit/${productData.slug}/comments`, { method: 'GET', headers: {
                'Content-Type' : 'application/json'
            } });
            // get the user and product infos
            const { session, product } = await response.json();
            setComments(product.comments);
            
            // set the session role, so we can determine if user can see the "delete button" or not.
            setSession(session.role);
        }
        catch (err) {
            console.log(err);
        }
    };
    
    
    useEffect(() => {
        // call the fetch each time comments section is mounted
        jsonFetch();
        
        console.log(comments);
    }, []);
    
    
    
    // events
    const deleteComment = async (comment) => {
      try {
          
        // find index in product's comments list
        const index = comments.findIndex((el) => el._id === comment._id);
    
        // Create new array without the deleted comment
        const updatedComments = [...comments];
        updatedComments.splice(index, 1);
    
        // Optimistic update: update the UI immediately
        setComments(updatedComments);
    
        // Send the request to delete the comment
        const response = await fetch(`/produit/${productData.slug}/supprimer/${comment._id}`, { method: 'DELETE' });
    
        if (response === 200) {
          console.log(response);
        }
      }
        catch (err) {
            console.log(err);
        }
};

    
    // render
    return (
    <div className="comments-section">
        {comments.map((comment, index) => (
            <div key={index} className="comment-wrapper">
                <ul>
                    <li className="username">{comment.pseudo}</li>
                    <li className="comment">{comment.comment}</li>
                    <li className="comment-date">Le {comment.date}</li>
                </ul>
                <div className="delete-comment-btn-wrapper">
                    {session === 'admin' &&
                        <button
                            className="delete-btn"
                            onClick={() => deleteComment(comment)}
                        >X</button>
                    }
                </div>
            </div>
        ))}
    </div>
    );
};

export default DeleteComment;


/**
    const deleteComment = async (comment) => {
        try {
            const index = comments.findIndex((el) => el._id === comment._id);
            const response = await fetch(`/produit/${productData.slug}/supprimer/${comment._id}`, { method: 'DELETE' });
            if (response === 200) {
                // Create new array
                const updatedComments = [...comments];
                updatedComments.splice(index, 1);
                
                // Update state
                setComments(updatedComments);
                
                console.log(response);
            }
        }
        catch (err) {
            console.log(err);
        }
        
    }*/