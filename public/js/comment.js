async function commentForm(event) {
    debugger
    event.preventDefault();

    const user_comment = document.querySelector('#comment_body').value.trim();
    const postId = document.getElementById('postRef').innerText;
    const postID = postId

    const response = await fetch(`/api/comment/`, {
        method: 'POST',
        body: JSON.stringify({
            comment_body: user_comment,
            post_id: postID,
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        alert(`comment made`)
        document.location.replace('/');
    } else {
        alert(response.statusText);
    }
};

document.querySelector('#new-comment').addEventListener('click', commentForm);