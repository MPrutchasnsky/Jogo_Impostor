// Dados do jogo
const listaJogadores = [];
const temas = ["Lugares", "Animais", "Adjetivos", "Comida", "Profissão", "Objeto", "Esportes", "Transporte", "Jogos", "Cores", "Eventos"];
const palavrasPorTema = {
  Lugares: ["Praia","Montanha","Floresta","Museu","Cidade","País","Parque","Rio","Ilha","Deserto","Caverna","Castelo","Aeroporto","Estádio","Mercado","Praça","Biblioteca","Escola","Hospital","Estação"],
  Animais: ["Leão","Golfinho","Coruja","Elefante","Canguru","Gato","Cachorro","Tigre","Coelho","Pinguim","Cobra","Girafa","Urso","Rinoceronte","Cavalo","Peixe","Tartaruga","Macaco","Falcão","Polvo"],
  Adjetivos: ["Rápido","Inteligente","Feliz","Corajoso","Grande","Pequeno","Brilhante","Silencioso","Forte","Gentil","Curioso","Leve","Pesado","Amigável","Alegre","Triste","Engraçado","Calmo","Determinado","Valente"],
  Comida: ["Pizza","Sushi","Chocolate","Hambúrguer","Salada","Macarrão","Sorvete","Bolo","Pão","Queijo","Arroz","Feijão","Lasanha","Café","Chá","Frango","Peixe","Batata","Hambúrguer vegetariano","Smoothie"],
  Profissão: ["Médico","Engenheiro","Professor","Piloto","Artista","Advogado","Cozinheiro","Arquiteto","Jornalista","Dentista","Músico","Ator","Policial","Astronauta","Bombeiro","Designer","Programador","Cientista","Enfermeiro","Motorista"],
  Objeto: ["Chave","Computador","Caderno","Telefone","Bicicleta","Caneta","Relógio","Carteira","Mochila","Copo","Livro","Mesa","Cadeira","Óculos","Fone de ouvido","Câmera","Controle","Lanterna","Guarda-chuva","Cartão"],
  Esportes: ["Futebol","Basquete","Natação","Tênis","Corrida","Vôlei","Boxe","Ciclismo","Skate","Surf","Ginástica","Handebol","Golfe","Hóquei","Escalada","Judô","Karate","Remo","Arco e flecha","Esgrima"],
  Transporte: ["Carro","Bicicleta","Avião","Navio","Trem","Ônibus","Moto","Barco","Caminhão","Patinete","Metrô","Helicóptero","Trator","Teleférico","Skate","Carro elétrico","Carrinho de mão","Balão","Submarino","Triciclo","Carrinho de supermercado"],
  Jogos: ["Xadrez","Dama","Minecraft","Pôquer","Dominó","Uno","Monopoly","Cartas","Banco Imobiliário","League of Legends","Among Us","Fortnite","Mario Kart","Solitaire","Bingo","Quebra-cabeça","RPG","Jenga","Twister","Catan"],
  Cores: ["Azul","Vermelho","Verde","Amarelo","Roxo","Laranja","Preto","Branco","Cinza","Rosa","Marrom","Bege","Turquesa","Vinho","Dourado","Prata","Lilás","Azul claro","Verde escuro","Ciano","Esmeralda","Gelo"],
  Eventos: ["Natal","Aniversário","Carnaval","Réveillon","Halloween","Casamento","Formatura","Páscoa","Dia das Mães","Dia dos Pais","Festival de Música","Festa Junina","Lual","Oktoberfest","Chá de bebê","Conferência","Encontro de motoqueiros","Feira","Jogo no Maracanã","Cerimônia","Jogo no Maracanãzinho"]
};

// Elementos da tela
const listaTela = document.getElementById("listaJogadoresTela");
const lerJogador = document.getElementById("lerJogador");
const adicionarJogador = document.getElementById("adicionarJogador");
const iniciarJogo = document.getElementById("iniciarJogo");
const reiniciarTudo = document.getElementById("reiniciarTudo");
const proximaRodada = document.getElementById("proximaRodada");
const cartoesJogadores = document.getElementById("cartoesJogadores");
const selecionarTemas = document.getElementById("temas");

// Preenche select de temas
temas.forEach(function(tema) {
    const option = document.createElement("option");
    option.value = tema;
    option.textContent = tema;
    selecionarTemas.appendChild(option);
});

// Variáveis globais
let impostor = null;
let temaEscolhido = null;
let palavraSorteada = null;

// Atualiza lista de jogadores
function atualizarListaNaTela() {
    listaTela.innerHTML = "";
    listaJogadores.forEach(function(jogador) {
        const li = document.createElement("li");
        li.textContent = jogador;
        listaTela.appendChild(li);
    });
}

// Adicionar jogador
adicionarJogador.addEventListener("click", function () {
    if (lerJogador.value !== "") {
        listaJogadores.push(lerJogador.value);
        lerJogador.value = "";
        atualizarListaNaTela();
    }
});

// Iniciar jogo
iniciarJogo.addEventListener("click", function() {
    if(listaJogadores.length < 4){
        alert("Número de jogadores insuficiente, mínimo 4");
        return;
    }

    if(!selecionarTemas.value){
        alert("Escolha um tema");
        return;
    }

    temaEscolhido = selecionarTemas.value;

    impostor = listaJogadores[Math.floor(Math.random() * listaJogadores.length)];
    const palavrasDoTema = palavrasPorTema[temaEscolhido];
    palavraSorteada = palavrasDoTema[Math.floor(Math.random() * palavrasDoTema.length)];

    lerJogador.disabled = true;
    adicionarJogador.disabled = true;

    criarCartoes();
});

// Próxima rodada (novo sorteio)
proximaRodada.addEventListener("click", function() {
    // Reseta estado da rodada
    impostor = null;
    temaEscolhido = null;
    palavraSorteada = null;

    // Limpa cartões
    cartoesJogadores.innerHTML = "";

    // Libera escolha de tema
    selecionarTemas.value = "";

    // 🔽 LIBERA ADIÇÃO DE JOGADORES
    lerJogador.disabled = false;
    adicionarJogador.disabled = false;

    alert("Rodada resetada! Escolha um novo tema, adicione mais jogadores e clique em Iniciar Jogo.");
});


// Reiniciar tudo
reiniciarTudo.addEventListener("click", function() {
    location.reload(true);
});

// Criar cartões
function criarCartoes() {
    cartoesJogadores.innerHTML = "";

    listaJogadores.forEach(function(jogador) {
        const li = document.createElement("li");
        li.style.marginBottom = "10px";

        const nome = document.createElement("span");
        nome.textContent = jogador + " ";

        const botao = document.createElement("button");
        botao.textContent = "Ver minha palavra";

        const conteudoOculto = document.createElement("span");
        conteudoOculto.style.display = "none";
        conteudoOculto.style.marginLeft = "10px";
        conteudoOculto.style.fontWeight = "bold";

        let palavraDoJogador = (jogador === impostor)
            ? "VOCÊ É O IMPOSTOR"
            : palavraSorteada;

        botao.addEventListener("click", function() {
            if(conteudoOculto.style.display === "none"){
                conteudoOculto.textContent = palavraDoJogador;
                conteudoOculto.style.display = "inline";
            } else {
                conteudoOculto.style.display = "none";
            }
        });

        li.appendChild(nome);
        li.appendChild(botao);
        li.appendChild(conteudoOculto);
        cartoesJogadores.appendChild(li);
    });
}
