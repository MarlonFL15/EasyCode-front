
const conteudo = [
    {
        nome: 'sequencia',
        aulas: [
            {
                tipo: 'Texto',
                titulo: 'Definição de algoritmo',
                conteudo: 'Um algoritmo é formalmente uma sequência finita de passos que levam à execução de uma tarefa. <br><br> Um exemplo de algoritmo é cada uma das operações básicas (adição, multiplicação, divisão e subtração). Outro exemplo seria o manual de um aparelho eletrônico, como o de um gravador de DVD, que explica passo a passo como realizar uma gravação. <br><br>Mas afinal, por que é importante aprender algoritmos? A resposta é simples: aprender a criar algoritmos é a base de conhecimento para as linguagens de programação'
            },
            {
                tipo: 'Texto',
                titulo: 'Estrutura de um algoritmo',
                conteudo: 'Antes de se utilizar uma linguagem de programação real, é necessário organizar as ações a serem tomadas pela máquina, de forma sequencial e lógica, sem se ater às regras rígidas da sintaxe da linguagem, ou seja: precisamos aprender a organizar nossos pensamentos para então os repassar para o computador de maneira lógica e ordenada. Podemos chamar este agrupamento de pensamentos ordenados para a resolução de um problema de algoritmo. Um algoritmo consiste em um conjunto lógico e finito de ações (instruções) que resolvem determinado problema. Se o conjunto de instruções é finito, ele possui uma estrutura bem definida e possui um começo e fim.<br></br>Podemos pensar num algoritmo como um "mecanismo" de transformação de entradas e saídas. Dessa maneira, um algoritmo ao ser "executado" receberá algumas entradas, que serão processadas, e devolverá algumas saídas. Veja este exemplo:<br><br><img src="https://d2v0x26thbzlwf.cloudfront.net/prod/14/img/rId12rifooqia.p7t.png"><br>Temos então três partes principais em nossos algoritmos:<br><ul><li>Entrada: dados de entrada do algoritmo;</li><li>Processamento: são os procedimentos executados para se chegar ao resultado final;</li><li>Saída: são os dados já processados.</li></ul>'
            },
            {
                tipo: 'Texto',
                titulo: 'Definição de variável',
                conteudo: 'Variáveis são espaços reservados na memória RAM do computador para guardar informações que serão utilizadas durante o código do programa. Elas podem ter valores de diversos tamanhos e tipos, como números inteiros, números reais (números com ponto flutuante - decimais), caracteres, frases etc. O valor pode variar a qualquer momento durante a execução do programa.<br><br>Para compreendê-las, imagine que você tenha uma estante para guardar livros, onde livro adquirido é guardado nela. Quando você quiser ler um deles, basta pegá-lo na estante. Com o computador é a mesma coisa: a memória RAM é a estante e as variáveis são os livros: você as cria (compra) e as joga na memória (estante).'
            },
            {
                tipo: 'Texto',
                titulo: 'Tipos de dados',
                conteudo: "Para armazenar as variáveis na memória do computador, é preciso informar o tipo delas para que seja reservado o espaço de memória adequado. Podem ser informados os tipos básicos de dados<br>Basicamente e também para todas as linguagens de maneira geral, nós temos alguns tipos básicos de variáveis:<ul><li>Inteiros: qualquer número inteiro, negativo, nulo ou positivo. (Ex: -4, 6, 0)</li><li>Decimais: qualquer número real, negativo, nulo ou positivo. (Ex: -4.0, 6.7, 0.3)</li><li>Caracteres: a representação de um único caractere. (Ex: 'a', 'b', '3')</li></ul>"
            },
            {
                tipo: 'Texto',
                titulo: 'Como usar variáveis no Blockly',
                conteudo: 'O processo de criação de variáveis no Blockly é muito simples<br><ul><li>Clique na aba "variáveis"</li><li>Arreste um dos blocos para a área de trabalho (área em branco)</li><li>Clique no dropdown do bloco</li><li>Selecione "nova variável"</li><li>Digite o nome de sua variável</li></ul><br><br><img width="720" src="/imgs/criar_variavel.gif"></img><br><br>E pronto! Sua variável foi criada. Caso queira usa-la novamente, é só ir na aba "variáveis" e elaestará pronta para uso<br><br><img width="720" src="/imgs/usar_variavel.gif"></img>'
            },
            {
                tipo: 'Texto',
                titulo: 'Blocos de atribuição e principais tipos',
                conteudo: 'Para atribuir valores as variáveis, também é muito simples. <br><br>Para atribuir constantes (números fixos ou caracteres simples), siga os seguintes passos: <br><br>Para atribuir um número (ou decimal): <ul><li>Vá na aba "Matemáticos"</li><li>Arraste o bloco que simboliza um número</li><li>Atribua a sua variável</li><li>Para atribuir números decimais, basta colocar um ponto e em seguida colocar as casas decimais</li></ul><br><img width="720" src="/imgs/variavel_inteira.gif"></img><br>O mesmo processo vale para caracteres:  <ul><li>Vá na aba "Textuais"</li><li>Arraste o bloco que simboliza um caracter</li><li>Atribua a sua variável</li></ul><br><img width="720" src="/imgs/varivael_char.gif"></img><br><br>Uma coisa que é importante ser levada em consideração são os blocos de conversão. <br><br>Eles servem para converter o bloco em questão no tipo desejado. No exemplo abaixo, o número inteiro é convertido para um caracter.<br><br><img width="720" src="/imgs/variavel_tipo.gif"></img>'
            },
            {
                tipo: 'Texto',
                titulo: 'Blocos de entrada e saída',
                conteudo: 'O computador não é uma máquina isolada: é preciso que ele se comunique com o mundo exterior, através da saída de vídeo, impressora, teclado, discos etc. Para tal, existem comandos que permitem que informações sejam exibidas em vídeo, assim como comandos que permitem que informações sejam colocadas na memória do computador através do teclado.<br>Para impressão no Blockly, temos 2 opções: Ou imprimimos um texto, ou uma variável.<br><br>Para imprimir um texto é bem simples, apenas arraste o bloco de imprimir e digite o texto desejado<br><br><img width="720" src="/imgs/imprimir_texto.gif"></img><br><br>E para imprimir uma variável, basta arrastar o bloco de imprimir, escolher a variável e o tipo dela: <br><br><img width="720" src="/imgs/imprimir_variavel.gif"></img><br><br>Para a leitura de varíavel, o processo também é o mesmo: <br><br><img width="720" src="/imgs/leia.gif"></img><br><br>                '
            },
            {
                tipo: 'Texto',
                titulo: 'Operadores aritméticos',
                conteudo: 'Operadores aritméticos, responsáveis pela execução de operações matemáticas como soma, subtração, multiplicação e divisão;<br><br><table><tr><th>Operador</th><th>Descrição</th></tr><tr><td>+</td><td>Operador de adição</td>  </tr><tr><td>-</td><td>Operador de subtração</td>  </tr><tr><td>*</td><td>Operador de multiplicação</td>  </tr><tr><td>/</td><td>Operador de divisão</td>  </tr><tr><td>%</td><td>Operador de módulo</td>  </tr></table>Para usar os operadores aritméticos no blockly é muito simples: <ul><li>Arraste o bloco de operadores aritméticos</li><li>Encaixe os 2 números que vão ser operados</li><li>Escolha a operação matemática</li></ul><img width="720" src="/imgs/operadores_aritmeticos.gif"></img>'
            },
            {
                tipo: 'Texto',
                titulo: 'Operadores relacionais',
                conteudo: 'Os operadores relacionais são utilizados para a comparação de caracteres e números e sempre retornam os valores lógicos TRUE (caso a comparação seja verdadeira) ou FALSE (caso a comparação seja falsa)<table><tr><th>Operador</th><th>Descrição</th></tr><tr><td>=</td><td>Igual a</td>  </tr><tr><td>≠</td><td>Diferente de</td>  </tr><tr><td>></td><td>Maior que</td>  </tr><tr><td><</td><td>Menor que</td>  </tr><tr><td>>=</td><td>Maior ou igual que</td>  </tr><tr><td><=</td><td>Menor ou igual que</td>  </tr></table><br>    Para usar os operadores relacionais no blockly é muito simples: <ul><li>Arraste o bloco de operadores relacionais/li><li>Encaixe os 2 números que vão ser comparados</li><li>Escolha o operador relacional</li></ul><img width="720" src="imgs/operadores_relacionais.gif"></img>'
            },
            {
                tipo: 'Texto',
                titulo: 'Operadores lógicos',
                conteudo: 'Os operadores lógicos combinam duas ou mais expressões relacionais para criar uma lógica verdadeira ou falsa. Os operadores lógicos são:<table><tr><th>Operador</th><th>Descrição</th></tr><tr><td>E</td><td>Operador de conjunção</td>  </tr><tr><td>OU</td> <td>Operador de disjunção</td>  </tr><tr><td>NÃO</td><td>Operador de negação</td>  </tr></table><br><h2>Operador lógico "E"</h2>O operador lógico E retornará verdadeiro somente se todas as expressões relacionais retornarem verdadeiro também. A tabela abaixo representa seu funcionamento<br><br><img width=520 src="https://dkrn4sk0rn31v.cloudfront.net/2020/01/15112656/operador-logico-e.png"><h2>Operador lógico "OU"</h2>O operador lógico OU retornará verdadeiro se pelo menos uma das expressões relacionais retornarem verdadeiro. A tabela abaixo representa seu funcionamento.<br><br><img width=520 src="https://dkrn4sk0rn31v.cloudfront.net/2020/01/15112711/operador-logico-ou.png"><h2>Operador lógico "NÃO"</h2>Esse operador, diferente dos demais que vimos até agora, realiza uma operação sobre um único valor. Se o valor for verdadeiro ele retorna falso e se o valor for falso ele retorna verdadeiro. Ele também é chamado de operador de negação.<br><br><img width=520 src="https://dkrn4sk0rn31v.cloudfront.net/2020/01/15112711/operador-logico-ou.png"><br>Para usar os operadores lógicos no blockly é muito simples: <ul><li>Arraste o bloco de operadores lógicos/li><li>Encaixe as duas expressões que vão ser comparadas</li><li>Escolha o operador lógico</li></ul><img width="720" src="imgs/operadores_logicos.gif"></img>'
            },
            {
                tipo: 'Quiz'
            },
            {
                tipo: 'Blocos',
                id: 1,
                titulo: 'Ola mundo'
            }
        ]
    },
    {
        nome: 'selecao',
        aulas: [
            {
                tipo: 'Texto',
                titulo: 'Definição',
                conteudo: 'fjksdfksdj'
            },
            {
                tipo: 'Quiz',
            },
            {
                tipo: 'Blocos',
                id: 0,
                nomeDaQuestao: 'Ola mundo'
            }
        ]
    },
    {
        nome: 'repeticao',
        aulas: [
            {
                tipo: 'Texto',
                titulo: 'Definição',
                conteudo: 'fjksdfksdj'
            },
            {
                tipo: 'Quiz',
            },
            {
                tipo: 'Blocos',
                id: 0,
                nomeDaQuestao: 'Ola mundo'
            }
        ]
    }
]
export default conteudo