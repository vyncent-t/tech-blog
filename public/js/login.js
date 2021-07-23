const loginFormHandler = async (event) => {
    event.preventDefault();


    const username = document.getElementById('user_name').value.trim();
    const password = document.getElementById('user_pass').value.trim();

    if (username && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to login');
        }
    }
};

const signupFormHandler = async (event) => {
    event.preventDefault();

    const username = document.getElementById('usernameNew').value.trim();
    const password = document.getElementById('passwordNew').value.trim();

    if (username && password) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
            console.log('button')
        } else {
            alert('Failed to sign up.');
        }
    }
};

document.getElementById('login-form').addEventListener('submit', loginFormHandler);

document.getElementById('signup-form').addEventListener('submit', signupFormHandler);