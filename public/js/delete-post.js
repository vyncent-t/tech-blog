const postSelector = async (event) => {
    event.preventDefault();
    const postId = document.getElementById('postRef').innerText;
    const postID = parseInt(postId)

    const response = await fetch(`/api/post/${postID}`, {
        method: 'DELETE',
        body: JSON.stringify({
            id: postID
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

// const signupFormHandler = async (event) => {
//     event.preventDefault();

//     const updateTitle = document.getElementById('post_title').value.trim();
//     const updateContent = document.getElementById('post_body').value.trim();

//     if (username && password) {
//         const response = await fetch('/api/post/:id', {
//             method: 'GET',
//             body: JSON.stringify({ username, password }),
//             headers: { 'Content-Type': 'application/json' },
//         });

//         if (response.ok) {

//             console.log('button')
//         } else {
//             alert('Failed to sign up.');
//         }
//     }
// };

document.querySelector('.deletePost').addEventListener('click', postSelector);