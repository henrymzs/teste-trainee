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

1. primeiro erro que encontrei foi que nesse arquivo header.component.ts
estava dando erro nessa linha 'export class HeadeComponent implements OnInit'
HeadeComponent estava sendo importado de forma incorreta apos faltava um erro, apos corrigir isso o erro não voltou aparecer no terminal 

2. Proximo erro abordado no projeto foi esse: 
Error: src/app/todo/new-task/new-task.component.ts:12:23 - error NG2003: No suitable injection token for parameter 'todoService' of class 'NewTaskComponent'.
  Consider using the @Inject decorator to specify an injection token.

12   constructor(private todoService: TodoService) { }

para esse erro apenas estava faltando a importação do arquivo import { TodoService } from 'src/app/shared/services/todo.service';
ao passar mouse em cima de 'TodoService' com o comando quickfix importei de forma rapida e resolveu o erro

3. Proximo erro que me deparei foi esse
Error: Can't resolve 'node_modules/@fortawesome/fontawesome-free/css/all.min.css' in '/home/henrypc/Documentos/henry.com/frontend/angular/trainee-dev'

apesar da fonte estar no angular.json ainda sim dava esse erro, entao pensei em instalar a fonte com npm, e apos baixar a fonte com npm install @fortawesome/fontawesome-free

o projeto rodou e com isso entrei comecei a corrigir os bugs do projeto

bug 1  Ao clicar no botão “Salvar”, a tarefa está sendo adicionada duas vezes.
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

bug 03: 3.  O texto do botão de limpar todas as tarefas não está em português.
para resolver esse problema inicialmente procurei o componente do botao onde provalvelmente iria estar o nome do botao, mas esse diferente dos demais não estava diretamente no botao e sim vindo de outro lugar, dessa forma utilizei a ferremanta de pesquisa do vscode e procurei ate achar de onde vinha o texto e de forma facil achei
get labelClearAll(){
    return 'Clear All'
  }
bastou mudar para Limpar Tudo

bug 04: 
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

bug 05: 6.  Ao clicar em “Limpar Tarefas Concluídas”, a ação é executada sem pedir uma confirmação ao usuário.
7.  O botão “Limpar Tarefas Concluídas” está removendo as tarefas não concluídas em vez das concluídas.
para resolver esse bug pesquisei no codigo por “Limpar Tarefas Concluídas” nisso eu cai no botao que estava com esse nome
"<button (click)="clearCompletedTasks()">Limpar Tarefas Concluídas</button>" apos isso bastou copiar o nome da função que esta no butao caindo na função original 
clearCompletedTasks() {
    this.todos = this.todos.filter(({ completed }) => completed === true);
    this.updateLocalStorageAndSave();
  }
  nesse codigo como final estava com true esta mantendo as tarefas concluidas e removendo o resto, comparando se completed é igual a true, nesse caso apenas mudei para false de forma que ira manter as tarefas pendentes e excluir as concluidas e apenas inclui um alert no começo do codigo 

