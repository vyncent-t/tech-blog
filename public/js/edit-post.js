const postEditor = async (event) => {
    debugger
    event.preventDefault();
    const postId = document.getElementById('postRef').innerText;
    const postID = postId

    const post_title = document.querySelector('#edit_title').value.trim();
    const post_body = document.querySelector('#edit_body').value.trim();
    let newDate = new Date();
    const newpost_date = newDate


    const response = await fetch(`/api/post/edit/${postID}`, {
        method: 'PUT',
        body: JSON.stringify({
            post_title: post_title,
            post_body: post_body,
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