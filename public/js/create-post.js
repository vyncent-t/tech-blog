async function newFormHandler(event) {
    debugger
    event.preventDefault();

    const post_title = document.querySelector('#post_title').value;
    const post_body = document.querySelector('#post_body').value;
    let newDate = new Date();
    const post_date = newDate
    const user_id = 1

    const response = await fetch(`/api/post`, {
        method: 'POST',
        body: JSON.stringify({
            user_id,
            post_date,
            post_title,
            post_body,

        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/');
    } else {
        alert(response.statusText);
    }
};

document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);