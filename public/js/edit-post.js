const postEditor = async (event) => {
    debugger
    event.preventDefault();
    const postId = document.getElementById('postRef').innerText;
    const postID = postId

    const edit_title = document.querySelector('#edit_title').value.trim();
    const edit_body = document.querySelector('#edit_body').value.trim();


    const response = await fetch(`/api/post/${postID}`, {
        method: 'PUT',
        body: JSON.stringify({
            post_id: postID,
            post_title: edit_title,
            post_body: edit_body,
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        console.log('not sure this work')
        alert(`post updated`)
        document.location.replace('/dashboard');
    } else {
        alert('Failed to travel');
    }
}

document.querySelector('#edit-button').addEventListener('click', postEditor);