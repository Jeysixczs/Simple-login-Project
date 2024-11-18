document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    const currentTheme = localStorage.getItem('theme') || 'light';

    if (currentTheme === 'dark') {
        document.body.classList.add('dark-mode');
        if (themeToggle) themeToggle.checked = true;
    }

    if (themeToggle) {
        themeToggle.addEventListener('change', () => {
            const newTheme = themeToggle.checked ? 'dark' : 'light';
            document.body.classList.toggle('dark-mode', themeToggle.checked);
            localStorage.setItem('theme', newTheme);
        });
    }

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const username = document.getElementById('loginUsername').value;
            const password = document.getElementById('loginPassword').value;

            const storedUsername = localStorage.getItem('username');
            const storedPassword = localStorage.getItem('password');

            if (username === storedUsername && password === storedPassword) {
                alert('Logged in successfully!');
                window.location.href = 'home.html';
            } else {
                alert('Invalid username or password!');
            }
        });
    }

    const createAccountForm = document.getElementById('createAccountForm');
    if (createAccountForm) {
        createAccountForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const username = document.getElementById('createUsername').value;
            const email = document.getElementById('createEmail').value;
            const password = document.getElementById('createPassword').value;
            const confirmPassword = document.getElementById('createConfirmPassword').value;

            if (password === confirmPassword) {
                localStorage.setItem('username', username);
                localStorage.setItem('email', email);
                localStorage.setItem('password', password);
                alert('Account created successfully!');
                window.location.href = 'login.html';
            } else {
                alert('Passwords do not match!');
            }
        });
    }

    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            ['username', 'password', 'email', 'bio', 'age', 'profileImage'].forEach(item => localStorage.removeItem(item));
            window.location.href = 'login.html';
        });
    }

    const welcomeMessage = document.getElementById('welcomeMessage');
    if (welcomeMessage) {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            welcomeMessage.textContent = `Welcome, ${storedUsername}!`;
        }
    }

    const profileDisplay = document.getElementById('profileDisplay');
    const profileForm = document.getElementById('profileForm');
    const editProfileButton = document.getElementById('editProfileButton');
    const cancelEditButton = document.getElementById('cancelEditButton');

    if (profileForm && profileDisplay && editProfileButton && cancelEditButton) {
        const profileUsername = document.getElementById('profileUsername');
        const profileBio = document.getElementById('profileBio');
        const profileAge = document.getElementById('profileAge');
        const profileEmail = document.getElementById('profileEmail');
        const profileImage = document.getElementById('profileImage');
        const profileImageEdit = document.getElementById('profileImageEdit');
        const profileImageInput = document.getElementById('profileImageInput');

        const displayUsername = document.getElementById('displayUsername');
        const displayBio = document.getElementById('displayBio');
        const displayAge = document.getElementById('displayAge');
        const displayEmail = document.getElementById('displayEmail');

        function loadProfileData() {
            const username = localStorage.getItem('username') || '';
            const bio = localStorage.getItem('bio') || '';
            const age = localStorage.getItem('age') || '';
            const email = localStorage.getItem('email') || '';
            const storedImage = localStorage.getItem('profileImage');

            displayUsername.textContent = username;
            displayBio.textContent = bio;
            displayAge.textContent = age;
            displayEmail.textContent = email;

            profileUsername.value = username;
            profileBio.value = bio;
            profileAge.value = age;
            profileEmail.value = email;

            const profileImgSrc = storedImage || 'default-profile.png';
            profileImage.src = profileImgSrc;
            profileImageEdit.src = profileImgSrc;
        }

        loadProfileData();

        editProfileButton.addEventListener('click', () => {
            profileDisplay.style.display = 'none';
            profileForm.style.display = 'block';
        });

        cancelEditButton.addEventListener('click', () => {
            profileForm.style.display = 'none';
            profileDisplay.style.display = 'block';
        });

        profileForm.addEventListener('submit', (event) => {
            event.preventDefault();
            localStorage.setItem('username', profileUsername.value);
            localStorage.setItem('bio', profileBio.value);
            localStorage.setItem('age', profileAge.value);
            localStorage.setItem('email', profileEmail.value);
            loadProfileData();
            profileForm.style.display = 'none';
            profileDisplay.style.display = 'block';
            alert('Profile updated successfully!');
        });

        profileImageInput.addEventListener('change', (event) => {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                profileImageEdit.src = e.target.result;
                localStorage.setItem('profileImage', e.target.result);
                loadProfileData();
            };
            reader.readAsDataURL(file);
        });
    }
});
