// SAVE USERNAME 
const historiaUser = document.getElementById('historiaUser');
const saveUserBtn = document.getElementById('saveUserBtn');
const userBox = document.querySelector('.container-username');

saveUserBtn.addEventListener('click', () => {
    const usernameStudent = document.getElementById('username').value.trim();
    if (!usernameStudent) {
        alert('escribe un nombre de usuario');
    } else {
        localStorage.setItem('usernameStudent', usernameStudent);
        window.location.reload();
    }
});