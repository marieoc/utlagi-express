
    <% if (product.comments) { %>
        <% for (let userComment of product.comments) { %>
            <div class="comment-wrapper">
                <ul>
                    <li class="username"><%= userComment.pseudo %></li>
                    <li class="comment"><%= userComment.comment %></li>
                    <li class="comment-date">Le <%= userComment.date %></li>
                </ul>
                <div class="delete-comment-btn-wrapper">
                    <button class="delete-btn">X</button>
                </div>
            </div>
        <% } %>
    <% } else { %>
    <div>
        <p>Il n'y a pour l'instant aucun commentaire dans cette section.</p>
    </div>
    <% } %>