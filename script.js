let username = '';

document.getElementById('profile-form').addEventListener('submit', function(e) {
    e.preventDefault();
    username = document.getElementById('username').value;
    document.getElementById('profile').classList.add('hidden');
    document.getElementById('post-section').classList.remove('hidden');
});

document.getElementById('post-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const content = document.getElementById('post-content').value;
    addPost(username, content);
    document.getElementById('post-content').value = '';
});

function addPost(username, content) {
    const postsContainer = document.getElementById('posts');
    const postElement = document.createElement('div');
    postElement.classList.add('post');
    postElement.innerHTML = `
        <div class="username">${username}</div>
        <div class="content">${content}</div>
        <div class="actions">
            <button onclick="likePost(this)">Like</button>
            <button onclick="toggleCommentSection(this)">Comment</button>
        </div>
        <div class="comment-section hidden">
            <form class="comment-form" onsubmit="addComment(event, this)">
                <input type="text" placeholder="Add a comment">
                <button type="submit">Post</button>
            </form>
            <div class="comments"></div>
        </div>
    `;
    postsContainer.prepend(postElement);
}

function likePost(button) {
    button.innerText = 'Liked';
    button.disabled = true;
}

function toggleCommentSection(button) {
    const commentSection = button.parentElement.nextElementSibling;
    commentSection.classList.toggle('hidden');
}

function addComment(event, form) {
    event.preventDefault();
    const commentInput = form.querySelector('input');
    const commentText = commentInput.value;
    if (commentText.trim()) {
        const commentsContainer = form.nextElementSibling;
        const commentElement = document.createElement('div');
        commentElement.classList.add('comment');
        commentElement.innerText = commentText;
        commentsContainer.appendChild(commentElement);
        commentInput.value = '';
    }
}