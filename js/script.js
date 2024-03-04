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
    function exibirPersonagens(personagens) {
        const elementoPersonagens = document.getElementById('personagens');
        elementoPersonagens.innerHTML = ''; 

        for (let i = startIndex; i < startIndex + 10 && i < personagens.length; i++) {
            const personagem = personagens[i];
            const novoPersonagem = document.createElement('div');
            novoPersonagem.classList.add('personagem-box');

            const imagem = document.createElement('img');
            if (personagem.image) {
                imagem.src = personagem.image;
            } else {
                // Se o personagem não tiver uma imagem
                imagem.src = "../img/lowprofile.png";
            }
            imagem.alt = personagem.name;

            const nome = document.createElement('h2');
            nome.textContent = personagem.name;

            const detalhes = document.createElement('div');
            detalhes.classList.add('detalhes');
            detalhes.innerHTML = `
                <p><strong>Apelidos:</strong> ${personagem.alternate_names.join(', ')}</p>
                <p><strong>Espécie:</strong> ${personagem.species}</p>
                <p><strong>Gênero:</strong> ${personagem.gender}</p>
                <p><strong>Casa:</strong> ${personagem.house}</p>
                <p><strong>Data de Nascimento:</strong> ${personagem.dateOfBirth}</p>
                <p><strong>Ancestralidade:</strong> ${personagem.ancestry}</p>
                <p><strong>Cor dos Olhos:</strong> ${personagem.eyeColour}</p>
                <p><strong>Cor do Cabelo:</strong> ${personagem.hairColour}</p>
                <p><strong>Ator/Atriz:</strong> ${personagem.actor}</p>
                <p><strong>Vivo:</strong> ${personagem.alive ? 'Sim' : 'Não'}</p>
            `;

            novoPersonagem.appendChild(imagem);
            novoPersonagem.appendChild(nome);
            novoPersonagem.appendChild(detalhes);

            elementoPersonagens.appendChild(novoPersonagem);
        }
    }

    let startIndex = 0;

    const proximaPaginaBtn = document.getElementById('proxima-pagina');
    if (proximaPaginaBtn) {
        proximaPaginaBtn.addEventListener('click', () => {
            startIndex += 10; 
            exibirPersonagens(personagens); 
        });
    } else {
        console.error('Elemento com ID "proxima-pagina" não encontrado.');
    }


    const paginaAnteriorBtn = document.getElementById('pagina-anterior');
    if (paginaAnteriorBtn) {
        paginaAnteriorBtn.addEventListener('click', () => {
            startIndex -= 10;
            if (startIndex < 0) {
                startIndex = 0; 
            }
            exibirPersonagens(personagens); 
        });
    } else {
        console.error('Elemento com ID "pagina-anterior" não encontrado.');
    }


    fetch('https://hp-api.onrender.com/api/characters')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao acessar a API: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            personagens = data; // Armazenar a lista de personagens
            exibirPersonagens(personagens); // Exibir os primeiros personagens
        })
        .catch(error => {
            console.error('Erro:', error);
        });

});
