function menuShow() {
    let menuMobile = document.querySelector('.mobile-menu');
    if (menuMobile.classList.contains('open')) {
        menuMobile.classList.remove('open');
        document.querySelector('.icon').src = "./img/menu_white_36dp.svg";
    } else {
        menuMobile.classList.add('open');
        document.querySelector('.icon').src = "./img/close_white_36dp.svg";
    }
}

document.addEventListener('DOMContentLoaded', function() {
    function login(event) {
        event.preventDefault(); // Evita o envio do formulário
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
    
        // Validação das credenciais de login
        if (username === 'usuario' && password === 'senha') {
            window.location.href = './pages/person.html';
        } else {
            alert('Usuário ou senha incorretos');
        }
    }
document.getElementById('login-form').addEventListener('submit', login);

});
