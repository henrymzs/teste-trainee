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

7. Bug 07: 
- O botão “Editar” não está funcional. O comportamento esperado é: ao clicar, o campo “Título da Tarefa” deve ser preenchido com o texto da tarefa selecionada. Ao salvar, o item na lista deve ser atualizado e o campo de texto limpo.

Primeiramente não entendi essa tarefa, achei um pouco confusa, mas apos reler algumas vezes entendi que o input do onde esta para salvar a tarefa iria servir para ao clickar no botão de editar ele iria pegar o nome da tarefa e iria ficar naquele input, possibilitando ao usuário modificar o nome e ao clickar no botão 'salvar a tarefa seria modificada' após tentar não consegui solucionar esse problema e optei por resolver de outra forma, ao inves de ser um label da tarefa, alterei para ser um input, dessa forma o usuário podendo fazer alteração diretamente na tarefa. Dessa forma abaixo:
   <input
      id="task-title-{{ todo.id }}" class="todo-item_input"
      type="text"
      [(ngModel)]="todo.title"
    />

