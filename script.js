// script.js (Login Page Script)
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const messageElement = document.getElementById('message');
    const forgotPasswordLink = document.getElementById('forgotPassword');

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        try {
            const response = await simulateBackendRequest(username, password);
            if (response.success) {
                showMessage(response.message, 'success');
                // Redirect to library page after successful login
                setTimeout(() => {
                    window.location.href = 'library.html';
                }, 1500);
            } else {
                showMessage(response.message, 'error');
            }
        } catch (error) {
            showMessage('An error occurred. Please try again later.', 'error');
        }
    });

    forgotPasswordLink.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Password reset functionality would be implemented here.');
    });

    function showMessage(message, type) {
        const messageElement = document.getElementById('message');
        messageElement.textContent = message;
        messageElement.className = `message ${type}`;
        messageElement.style.display = 'block';
    }

    // Simulated backend request
    function simulateBackendRequest(username, password) {
        return new Promise((resolve) => {
            setTimeout(() => {
                if (username === 'test' && password === 'test') {
                    resolve({ success: true, message: 'Login successful!' });
                } else {
                    resolve({ success: false, message: 'Invalid username or password. Please try again.' });
                }
            }, 1000); // Simulate network delay
        });
    }
});