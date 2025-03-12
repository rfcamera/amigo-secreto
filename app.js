//O principal objetivo deste desafio é fortalecer suas habilidades em lógica de programação. Aqui você deverá desenvolver a lógica para resolver o problema.

let listaDeAmigos = [];

function adicionarAmigo() {
    const inputNome = document.getElementById('amigo');
    const nome = inputNome.value.trim();

    if (nome === "") {
        alert("Por favor, insira um nome.");
        return;
    }

    // Ao adicionar um amigo, marcamos como não sorteado (selecionado: false)
    listaDeAmigos.push({ nome: nome, selecionado: false });
    inputNome.value = "";
    atualizarListaDeAmigos();
    // Habilita o botão de sorteio se ainda estiver desabilitado
    if (document.getElementById('btnSortear').disabled = true) {
        document.getElementById('btnSortear').disabled = false;
    }
}

function atualizarListaDeAmigos() {
    const lista = document.getElementById('listaAmigos');
    lista.innerHTML = "";

    listaDeAmigos.forEach(amigo => {
        const li = document.createElement('li');
        // Se o amigo já foi sorteado, adicionamos uma marcação visual
        if (amigo.selecionado) {
            li.textContent = amigo.nome + " (Selecionado)";
        } else {
            li.textContent = amigo.nome;
            // Cria o botão "Remover" somente para amigos não sorteados
            const btnRemover = document.createElement('button');
            btnRemover.innerHTML = `<span class="blink-text-remover">Remover</span>`;
            btnRemover.classList.add('button-remove');
            btnRemover.addEventListener('click', function() {
                removerAmigo(amigo.nome);
                atualizarListaDeAmigos();
            });
            li.appendChild(btnRemover);
        }
        lista.appendChild(li);
    });
}

function listaVazia() {
    if (listaDeAmigos.length === 0) {
      alert("A lista de amigos está vazia.");
      console.log('Lista vazia');
      return true;
    }
    return false;
}
  
function sortearAmigo() {
    // Se a lista inteira estiver vazia
    if (listaVazia()) return;
    //if (listaDeAmigos.length === 0) {
    //    alert("A lista está vazia!");
    //    return;
    //}
  
    // Filtra apenas os amigos que ainda não foram sorteados
    const naoSelecionados = listaDeAmigos.filter(amigo => !amigo.selecionado);
  
    if (naoSelecionados.length === 0) {
        alert("Todos os amigos já foram selecionados!");
        document.getElementById('btnSortear').disabled = true;
        return;
    }
  
    const indiceAleatorio = Math.floor(Math.random() * naoSelecionados.length);
    const amigoSorteado = naoSelecionados[indiceAleatorio];
  
    // Marca o amigo como sorteado
    amigoSorteado.selecionado = true;
  
    atualizarListaDeAmigos();
  
    const resultado = document.getElementById('resultado');
    resultado.textContent = `Amigo sorteado: ${amigoSorteado.nome}`;
  
    // Se todos já foram sorteados, desabilita o botão
    if (listaDeAmigos.every(amigo => amigo.selecionado)) {
        document.getElementById('btnSortear').disabled = true;
    }
}


function limparLista() {
    if (listaVazia()) return;

    listaDeAmigos = [];
    atualizarListaDeAmigos();
    document.getElementById('amigo').value = "";
    document.getElementById('resultado').textContent = "";
    // Habilita o botão de sorteio se estiver desabilitado
    if (document.getElementById('btnSortear').disabled = true) {
        document.getElementById('btnSortear').disabled = false;
    }
}

function removerAmigo(nome) {
    // Remove o amigo apenas se ele ainda não tiver sido sorteado
    for (let i = 0; i < listaDeAmigos.length; i++) {
        if (listaDeAmigos[i].nome === nome && listaDeAmigos[i].selecionado === false) {
            listaDeAmigos.splice(i, 1);
            break;
        }
    }
    return listaDeAmigos;
}

// Event listeners para os botões
document.getElementById('btnAdicionar').addEventListener('click', adicionarAmigo);
document.getElementById('btnSortear').addEventListener('click', sortearAmigo);
document.getElementById('btnLimpar').addEventListener('click', limparLista);

// Event listener para a tecla Enter no campo de entrada
document.getElementById('amigo').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        console.log('Enter pressionado');
        event.preventDefault();
        adicionarAmigo();
    }
});
