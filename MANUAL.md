# Nota Importante 
- Irei utilizar esse markdown para explicar como pensei e oque fiz para resolver o erro do projeto, irei apenas escrever rapido e ao final irei revisar tudo e corrigir para melhor entendimento.

***---------------------------***

Comecei clonando o projeto para a minha maquina e instalei as dependencias 
logo apos dar npm start deu erro 

erro no terminal:
Erro npm Script ausente: "start"

oque me deu a entender que nao existia esse script para rodar o projeto, apos isso entrei no package.json onde fica registrado os script e nao tinha esse script, adicionei ao final
"start": "ng start"

mas novamente deu erro, apos isso fui pesquisar sobre como dar rodar um projeto com npm com angular e cai no stack overflow 
https://stackoverflow.com/questions/40190538/when-to-use-npm-start-and-when-to-use-ng-serve

apos utilizar o exemplo que foi dado 
"scripts": {
  "start": "ng serve"
}

apos isso rodou o projeto e ai que tive acesso aos erros do projeto e comecei realmente e debugar o projeto