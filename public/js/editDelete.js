// const postSelector = async (event) => {
//     event.preventDefault();

//     const postId = document.getElementById('postRef').value;

//     if (postId) {
//         const response = await fetch(`/api/post/:id`, {
//             method: 'GET',
//             body: JSON.stringify({`id: ${postId}`}),
//             headers: { 'Content-Type': 'application/json' },
//     });

//     if (response.ok) {
//         // document.location.replace('/dashboard');
//         console.log('not sure this works but')
//     } else {
//         alert('Failed to travel');
//     }
// }
// };

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
//             document.location.replace('/dashboard');
//             console.log('button')
//         } else {
//             alert('Failed to sign up.');
//         }
//     }
// };

document.getElementById('postPath').addEventListener('click', postSelector);