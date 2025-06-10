# Desafio de Código: Gerenciador de Tarefas (Angular)
**Relatório Técnico - Henry Kauã**

**1. Visão Geral da Solução:** Um breve resumo do que foi feito.

..............................

**2. Como Executar a Aplicação:** Instruções claras para clonar, instalar e rodar o projeto (`npm install`, `npm start`).

Copie a URl do projeto:
https://github.com/henrymzs/teste-trainee.git

Crie uma pasta para o projeto, abra essa pasta com o editor de código sua preferencia e apos isso abra o terminal e utilize o comando
git clone juntamente com a URL do projeto copiada acima
git clone https://github.com/henrymzs/teste-trainee.git

Se não tiver o git instalado na sua maquina utilize esse comando para baixa
Linux:
sudo apt-get install git -y
Windows
basta entrar no site e seguir o passo a passo seguindo a especificação da sua maquina seja ela arm64 ou x64
apos isso tente novamente o comando git clone

- Irei utilizar esse markdown para explicar como pensei e oque fiz para resolver o erro do projeto, irei apenas escrever rapido e ao final irei revisar tudo e corrigir para melhor entendimento.

* **3. Correção dos Erros Iniciais (`npm start`):** Descreva quais eram os erros que impediam a aplicação de rodar e como você os solucionou.

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

**4. Relatório de Correção de Bugs:** Para cada bug da lista, explique a causa raiz e a solução que você implementou.
### Bugs antes de rodar o projeto

1. Erro no arquivo header.component.ts 

primeiro erro que encontrei foi que nesse arquivo header.component.ts
estava dando erro nessa linha 'export class HeadeComponent implements OnInit'
HeadeComponent estava sendo importado de forma incorreta apos faltava um erro, apos corrigir isso o erro não voltou aparecer no terminal 

2. Erro no new-task-component.ts 
Proximo erro abordado no projeto foi esse: 
Error: src/app/todo/new-task/new-task.component.ts:12:23 - error NG2003: No suitable injection token for parameter 'todoService' of class 'NewTaskComponent'.
  Consider using the @Inject decorator to specify an injection token.

12   constructor(private todoService: TodoService) { }

para esse erro apenas estava faltando a importação do arquivo import { TodoService } from 'src/app/shared/services/todo.service';
ao passar mouse em cima de 'TodoService' com o comando quickfix importei de forma rapida e resolveu o erro

3. Faltando fonte necessária para inicializar o projeto 
Proximo erro que me deparei foi esse
Error: Can't resolve 'node_modules/@fortawesome/fontawesome-free/css/all.min.css' in '/home/henrypc/Documentos/henry.com/frontend/angular/trainee-dev'

apesar da fonte estar no angular.json ainda sim dava esse erro, entao pensei em instalar a fonte com npm, e apos baixar a fonte com npm install @fortawesome/fontawesome-free

o projeto rodou e com isso entrei comecei a corrigir os bugs do projeto

### Bugs a Corrigir
1. Bug 01 e 02:  Ao clicar no botão “Salvar”, a tarefa está sendo adicionada duas vezes.

encontrei o erro na função addTask,na linha this.todoService.addTodo(newTodo) onde na mesma adicionava a tarefa duas vezes 
  count = 0;
addTask() {
    if(this.count > 0) return
    const newTodo: Todo = {
      id: this.todoService.getTodoNewId(),
      title: this.newTaskTitle,
      completed: false
    };

    this.todoService.addTodo(newTodo); // apenas removi essa linha e ao salvar o sistema salva apenas uma tarefa
    this.todoService.addTodo(newTodo);
    this.newTaskTitle = '';
    this.count++
  }
e com a remoção da condição ja nao é mais necessario count e nem this.count++

2. Bug 03: O texto do botão de limpar todas as tarefas não está em português.
para resolver esse problema inicialmente procurei o componente do botao onde provalvelmente iria estar o nome do botao, mas esse diferente dos demais não estava diretamente no botao e sim vindo de outro lugar, dessa forma utilizei a ferremanta de pesquisa do vscode e procurei ate achar de onde vinha o texto e de forma facil achei
get labelClearAll(){
    return 'Clear All'
  }
bastou mudar para Limpar Tudo

3. Bug 04 e 05: 
4.  O botão “Exibir Tarefas Concluídas” está, na verdade, ocultando as tarefas concluídas.
5.  O botão “Ocultar Tarefas Concluídas” tem o comportamento invertido, exibindo as tarefas concluídas.

apos resolver o problema anterior esse foi o proximo e a função que invertia o problema descrito estava logo acima
 filteredTodos() {
    return this.showCompletedTasks ? this.todos : this.todos.filter(todo => !todo.completed);
  }
  por causa do nome da função imaginei que seria isso, e apos entender a função vi que ela era mesmo a responsavel pela confusao que estava acontecendo, como foi descrito que estava invertido a logica, apenas inverti a função ternaria, dessa forma
  se for false vai exibir todas as tarefas mas se for true aplica o filtro e nao exibir as tarefas concluidas

  filteredTodos() {
    return this.showCompletedTasks ? this.todos.filter(todo => !todo.completed) : this.todos;
  }

6. Bug 06 e 07: 
- Ao clicar em “Limpar Tarefas Concluídas”, a ação é executada sem pedir uma confirmação ao usuário.
- O botão “Limpar Tarefas Concluídas” está removendo as tarefas não concluídas em vez das concluídas.

para resolver esse bug pesquisei no codigo por “Limpar Tarefas Concluídas” nisso eu cai no botao que estava com esse nome
"<button (click)="clearCompletedTasks()">Limpar Tarefas Concluídas</button>" apos isso bastou copiar o nome da função que esta no butao caindo na função original 
clearCompletedTasks() {
    this.todos = this.todos.filter(({ completed }) => completed === true);
    this.updateLocalStorageAndSave();
  }
  nesse codigo como final estava com true esta mantendo as tarefas concluidas e removendo o resto, comparando se completed é igual a true, nesse caso apenas mudei para false de forma que ira manter as tarefas pendentes e excluir as concluidas e apenas inclui um alert no começo do codigo 

7. Bug 08: 
- O botão “Editar” não está funcional. O comportamento esperado é: ao clicar, o campo “Título da Tarefa” deve ser preenchido com o texto da tarefa selecionada. Ao salvar, o item na lista deve ser atualizado e o campo de texto limpo.

Primeiramente não entendi essa tarefa, achei um pouco confusa, mas apos reler algumas vezes entendi que o input do onde esta para salvar a tarefa iria servir para ao clickar no botão de editar ele iria pegar o nome da tarefa e iria ficar naquele input, possibilitando ao usuário modificar o nome e ao clickar no botão 'salvar a tarefa seria modificada' após tentar não consegui solucionar esse problema e optei por resolver de outra forma, ao inves de ser um label da tarefa, alterei para ser um input, dessa forma o usuário podendo fazer alteração diretamente na tarefa. Dessa forma abaixo:
   <input
      id="task-title-{{ todo.id }}" class="todo-item_input"
      type="text"
      [(ngModel)]="todo.title"
    />

8. Bug 09:
- O botão “Editar” está desalinhado e deve ser posicionado ao lado do botão “Remover”.

Para resolver este problema primeirameira identifiquei onde estava os botões e apos achar eles percebi que eles estavam 'soltos' então decidi deixar eles dentro de uma div, oque já fez com que eles se alinhassem um ao lado do outro, mas eles ficaram colado oque na era o desejado, para resolver este problemas pensei em colocar um gap entre eles mas para utilizar o gap precisei dar display flex a div e assim fiz oque deu o resultado que eu esperava, no fim ficou dessa forma:
.todo-item-btn {
  display: flex;
  gap: 20px;
}

9. Bug 10:
- O botão “Remover” deve ter a cor vermelha para indicar uma ação destrutiva.
O botão não estava com a cor vermelha como deveria por causa da ordem de precedencia do CSS no botão tinha um style=color:red
<button class="todo-item_delete" style="color: black" (click)="deleteTodo()">

oque tinha precedencia em relação ao arquivo externo que estava dessa forma:
.todo-item_delete {
  width: 10px;
  width: fit-content;
  color: red;
  background: none;
  border: none;
  cursor: pointer;
}
Então uma maneira simples de resolver este problema foi remover a estilização dentro do próprio componente que estava causando esse problema, dessa forma deixando toda a estilização da sua classe e funcionando como deveria e deixando mais organizado.

10. Bug 11:
- A lista de tarefas não apresenta uma barra de rolagem quando o número de itens ultrapassa a altura do painel, impedindo a visualização de todas as tarefas.

De primeira eu achei que o elemento pai para que eu pudesse estilizar para aparecer a barra de rolagem seria esse
<div class="todo-item">
Mas apos colocar uma borda, percebi que estava me confudindo, e voltei a tela do projeto e utilizei a ferramenta de inspecionar para saber rapidamente o nome da classe responsável pelo elemento e pesquisar no projeto, facilmente achei a classe e apenas utilizei border=1px solid:red para confirmar, após ter certeza que era o elemento certo mudei apenas uma estilização e funcionou como deveria:
  overflow-y: auto;

11. Bug 12 e 13: 
- Salvar sem digitar um “Título da Tarefa” está adicionando um item em branco à lista.

Para resolver este problema coloquei um condição onde o usuário necessita colocar um titulo para a tarefa, dessa forma:
if (!this.newTaskTitle.trim()) {
      alert('O titulo da tarefa não pode estar vazio!');
      return;
    }
Utilizando this para me referir a instancia da classe newTaskComponent, utilizando o trim() para remover espaços vazios com negação '!' para verificar se algo foi digitado ou não

### Melhorias a Implementar
1.  Implementar um botão “Ordenar de A a Z” que, ao ser clicado, ordene alfabeticamente a lista de tarefas visíveis.

Para resolver esse problema utilizei como base o metodo sortTodos() que já estava presente no código e pensei que poderia fazer algo parecido, utilizando 'sort', após isso utilizei deste método juntamente com localcompare, passando dois elementos (a, b) onde eu comparava os dois elementos, mais precisamente o titulo deles, onde comparava se a vinha antes de b, se fosse retorna -1, mantendo a antes de b, se b vier antes a retorna 1, movendo b para antes de 'a' e se forem iguais retorna 0. 

2.  Permitir que o usuário adicione uma tarefa pressionando a tecla `Enter` no campo de texto, além do clique no botão “Salvar”.

Essa tarefa se tornou relativamente fácil pois no Bug 08 enquanto tentava solucionar aquele problema e pedi ajuda a IA, ela me retornou um código que tinha um input com ação do botão enter, diferente do que normalmente se faz no frontend puro que se cria um ouvinte para aquele click aqui bastava colocar a ação com a função, antes apenas reutilizei a lógica, dessa forma:
(keyup.enter)="addTask()"

3.  Permitir a adição de múltiplas tarefas de uma só vez. O usuário deverá digitar os títulos separados pelo caractere `|` (pipe).

Para essa tarefa fui diretamente na função addTask e pensei como poderia fazer isso, teria que quebrar o input do usuário ao meio com | para dividir tarefa, algo que fiz foi dividir o input com split , assim sendo um array separados por pipe, após isso utilizando novamente a função trim() para remover espaçõs e adicionando uma condição para não adicionar tarefas em branco, ficando assim:

4. Implementar um filtro de palavras obscenas. Caso o usuário tente cadastrar uma tarefa contendo um palavrão, exiba a mensagem: “Não é permitido cadastrar tarefas com palavras obscenas.” (Sugestão de biblioteca: `https://github.com/web-mech/badwords`).

Para solucionar esse problema primeiramente entrei no repositorio do plugin e pesquisei por exemplos de como fazer isso, por ser mais rapido optei por declarar localmente as palavras que deverão ser censuradas e declarei um array de palavras que não podem ser titulos de tarefas, utilizando o método some() para ver se o input do usuário é algumas das palavras proibidas, posteriormente faço um if onde coloco uma parada no código e aviso ao usuário que não é permitido

5.  Adicionar a funcionalidade de exportar a lista de tarefas atual para um arquivo PDF. (Sugestão de biblioteca: `https://github.com/parallax/jsPDF`).

Para resolver esse problema entrei no repositorio do projeto oque foi bem fácil seguindo a própria documentação, fiz a função e alterei algumas coisas para o usuário saber as tarefas realizadas e as pendentes, coloquei uma abaixa da outra e separei as responsabilidades para melhor organização do código.

6.  Substituir todos os `alert`s e `confirm`s nativos do navegador por uma experiência mais moderna, utilizando a biblioteca SweetAlert. (Sugestão: `https://sweetalert2.github.io/`).

Para resolver este problema entrei no repositorio e achei exemplos de como colocar alerts personalizados, com exemplos não achei tão dificil de implementar tão solução.




