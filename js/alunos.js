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

document.addEventListener('DOMContentLoaded', function () {
    let alunos; 


    function exibirAlunos(alunos, classeSelecionada) {
        const elementoAlunos = document.getElementById('alunos');
        elementoAlunos.innerHTML = ''; // Limpa os alunos anteriores

        // Filtra os alunos de acordo com a classe
        const alunosFiltrados = classeSelecionada !== 'all' ? alunos.filter(aluno => aluno.house === classeSelecionada) : alunos;

        for (let i = startIndex; i < startIndex + 10 && i < alunosFiltrados.length; i++) {
            const aluno = alunosFiltrados[i];
            const novoAluno = document.createElement('div');
            novoAluno.classList.add('alunos-box');

            const imagem = document.createElement('img');
            if (aluno.image) {
                imagem.src = aluno.image;
            } else {
                // se aluno não tiver imagem
                imagem.src = "../img/lowprofile.png";
            }
            imagem.alt = aluno.name;

            const nome = document.createElement('h2');
            nome.textContent = aluno.name;

            const detalhes = document.createElement('div');
            detalhes.classList.add('detalhes');
            detalhes.innerHTML = `
            <p><strong>Casa:</strong> ${aluno.house}</p>
            <p><strong>Ano de Nascimento:</strong> ${aluno.yearOfBirth}</p>
            <p><strong>É bruxo/bruxa:</strong> ${aluno.wizard ? 'Sim' : 'Não'}</p>
            <p><strong>Varinha:</strong> ${aluno.wand.wood} - ${aluno.wand.core} (${aluno.wand.length}" polegadas)</p>
            <p><strong>Patrono:</strong> ${aluno.patronus}</p>
            <p><strong>Estudante de Hogwarts:</strong> ${aluno.hogwartsStudent ? 'Sim' : 'Não'}</p>
            <p><strong>Funcionário de Hogwarts:</strong> ${aluno.hogwartsStaff ? 'Sim' : 'Não'}</p>
            <p><strong>Vivo:</strong> ${aluno.alive ? 'Sim' : 'Não'}</p>
            `;
            novoAluno.appendChild(imagem);
            novoAluno.appendChild(nome);
            novoAluno.appendChild(detalhes);

            elementoAlunos.appendChild(novoAluno);
        }
    }

    // Variável para rastrear o indice do primeiro aluno a ser exibido
    let startIndex = 0;

    const proximaPaginaBtn = document.getElementById('proxima-pagina');
    if (proximaPaginaBtn) {
        proximaPaginaBtn.addEventListener('click', () => {
            startIndex += 10; 
            exibirAlunos(alunos, document.getElementById('classe').value); 
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
            exibirAlunos(alunos, document.getElementById('classe').value);
        });
    } else {
        console.error('Elemento com ID "pagina-anterior" não encontrado.');
    }


    const selectClasse = document.getElementById('classe');
    if (selectClasse) {
        selectClasse.addEventListener('change', () => {
            startIndex = 0; 
            exibirAlunos(alunos, selectClasse.value); 
        });
    } else {
        console.error('Elemento com ID "classe" não encontrado.');
    }

    fetch('https://hp-api.onrender.com/api/characters/students')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao acessar a API: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            alunos = data; // Armazenar a lista de alunos
            exibirAlunos(alunos, 'all'); // Exibir os primeiros alunos
        })
        .catch(error => {
            console.error('Erro:', error);
        });
});
