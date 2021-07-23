const postSelector = async (event) => {
    event.preventDefault();
    const postId = document.getElementById('postRef').innerText;
    const postID = parseInt(postId)

    const post_title = document.querySelector('#post_title').value;
    const post_body = document.querySelector('#post_body').value;
    let newDate = new Date();
    const post_date = newDate


    const response = await fetch(`/api/post/${postID}`, {
        method: 'PUT',
        body: JSON.stringify({
            post_date,
            post_title,
            post_body,
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        console.log('not sure this work')
        alert(`post deleted`)
        document.location.replace('/dashboard');
    } else {
        alert('Failed to travel');
    }
}

document.querySelector('.deletePost').addEventListener('click', postSelector);