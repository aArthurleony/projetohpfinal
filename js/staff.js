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
    function exibirStaffs(staffs) {
        const elementoStaffs = document.getElementById('staffs');
        elementoStaffs.innerHTML = ''; 


        for (let i = startIndex; i < startIndex + 10 && i < staffs.length; i++) {
            const staff = staffs[i];
            const novoStaff = document.createElement('div');
            novoStaff.classList.add('staff-box');

            const imagem = document.createElement('img');
            if (staff.image) {
                imagem.src = staff.image;
            } else {

                imagem.src = "../img/lowprofile.png"; 
            }
            imagem.alt = staff.name;

            const nome = document.createElement('h2');
            nome.textContent = staff.name;
            // "id": "ca3827f0-375a-4891-aaa5-f5e8a5bad225",
            // "name": "Minerva McGonagall",
            // "alternate_names": [ ],
            // "species": "human",
            // "gender": "female",
            // "house": "Gryffindor",
            // "dateOfBirth": "04-10-1925",
            // "yearOfBirth": 1925,
            // "wizard": true,
            // "ancestry": "half-blood",
            // "eyeColour": "",
            // "hairColour": "black",
            // "wand": {
            //   "wood": "fir",
            //   "core": "dragon heartstring",
            //   "length": 9.5
            // },
            // "patronus": "tabby cat",
            // "hogwartsStudent": false,
            // "hogwartsStaff": true,
            // "actor": "Dame Maggie Smith",
            // "alternate_actors": [ ],
            // "alive": true,
            const detalhes = document.createElement('div');
            detalhes.classList.add('detalhes');
            detalhes.innerHTML = `
            <p><strong>Nome:</strong> ${staff.name}</p>
            <p><strong>Nomes alternativos:</strong> ${staff.alternate_names.join(', ')}</p>
            <p><strong>Espécie:</strong> ${staff.species}</p>
            <p><strong>Gênero:</strong> ${staff.gender}</p>
            <p><strong>Casa:</strong> ${staff.house}</p>
            <p><strong>Data de Nascimento:</strong> ${staff.dateOfBirth}</p>
            <p><strong>Ano de Nascimento:</strong> ${staff.yearOfBirth}</p>
            <p><strong>É bruxo/bruxa:</strong> ${staff.wizard ? 'Sim' : 'Não'}</p>
            <p><strong>Ascendência:</strong> ${staff.ancestry}</p>
            <p><strong>Cor dos Olhos:</strong> ${staff.eyeColour}</p>
            <p><strong>Cor do Cabelo:</strong> ${staff.hairColour}</p>
            <p><strong>Varinha:</strong> ${staff.wand.wood} - ${staff.wand.core} (${staff.wand.length}" polegadas)</p>
            <p><strong>Patrono:</strong> ${staff.patronus}</p>
            <p><strong>Estudante de Hogwarts:</strong> ${staff.hogwartsStudent ? 'Sim' : 'Não'}</p>
            <p><strong>Funcionário de Hogwarts:</strong> ${staff.hogwartsStaff ? 'Sim' : 'Não'}</p>
            <p><strong>Ator/Atriz:</strong> ${staff.actor}</p>
            <p><strong>Atores alternativos:</strong> ${staff.alternate_actors.join(', ')}</p>
            <p><strong>Vivo:</strong> ${staff.alive ? 'Sim' : 'Não'}</p>
            
            `;
            novoStaff.appendChild(imagem);
            novoStaff.appendChild(nome);
            novoStaff.appendChild(detalhes);


            elementoStaffs.appendChild(novoStaff);
        }
    }

    // Variável para rastrear o índice do primeiro personagem a ser exibido
    let startIndex = 0;

    const proximaPaginaBtn = document.getElementById('proxima-pagina');
    if (proximaPaginaBtn) {
        proximaPaginaBtn.addEventListener('click', () => {
            startIndex += 10; 
            exibirStaffs(staffs); // Exibe os proximo personagens
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
            exibirStaffs(staffs); 
        });
    } else {
        console.error('Elemento com ID "pagina-anterior" não encontrado.');
    }

    fetch('https://hp-api.onrender.com/api/characters/staff')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao acessar a API: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            staffs = data; 
            exibirStaffs(staffs); 
        })
        .catch(error => {
            console.error('Erro:', error);
        });

});