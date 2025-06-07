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
