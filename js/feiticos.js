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
    function exibirSpells(spells) {
        const elementoSpells = document.getElementById('spells');
        if (!elementoSpells) {
            console.error('Elemento com ID "spells" não encontrado.');
            return;
        }
        elementoSpells.innerHTML = ''; 

        for (let i = startIndex; i < startIndex + 10 && i < spells.length; i++) {
            const spell = spells[i];
            const novoSpell = document.createElement('div');
            novoSpell.classList.add('spell-box');

            const imagem = document.createElement('img');
            if (spell.image) {
                imagem.src = spell.image;
            } else {
                imagem.src = "../img/feitico.png";
            }
            imagem.alt = spell.name;

            const nome = document.createElement('h2');
            nome.textContent = spell.name;

            const descricao = document.createElement('p');
            descricao.textContent = spell.description; // Adicionando a descrição do feitiço

            novoSpell.appendChild(imagem);
            novoSpell.appendChild(nome);
            novoSpell.appendChild(descricao);

            elementoSpells.appendChild(novoSpell);
        }
    }

    let startIndex = 0;

    const proximaPaginaBtn = document.getElementById('proxima-pagina');
    if (proximaPaginaBtn) {
        proximaPaginaBtn.addEventListener('click', () => {
            startIndex += 10;
            exibirSpells(spells);
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
            exibirSpells(spells);
        });
    } else {
        console.error('Elemento com ID "pagina-anterior" não encontrado.');
    }

    fetch('https://hp-api.onrender.com/api/spells')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao acessar a API: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            spells = data;
            exibirSpells(spells);
        })
        .catch(error => {
            console.error('Erro:', error);
        });
});
