import { Component } from '@angular/core';
import { Todo } from '../../shared/models/todo.model';
import { TodoService } from 'src/app/shared/services/todo.service';
import { Filter } from 'bad-words';
const filter = new Filter();
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent {
  newTaskTitle: string = '';
  localList = { words: ['fortaleza maior do estado', 'caralho', 'fi da peste', 'ze ruela', 'corno'] };

  constructor(private todoService: TodoService) { }

  containsBadWord(text: string): boolean {
    return this.localList.words.some(word => text.toLowerCase().includes(word));
  }

  addTask() {
    if (!this.newTaskTitle.trim()) {
      Swal.fire({
        title: 'Erro!',
        text: 'O título da tarefa não pode estar vazio!',
        icon: 'error',
        confirmButtonText: 'OK'
      }); return;
    }

    const textoFiltrado = filter.clean(this.newTaskTitle);
    if (textoFiltrado !== this.newTaskTitle || this.containsBadWord(this.newTaskTitle)) {
      Swal.fire({
        title: 'Erro!',
        text: 'Esse título contém palavras não permitidas ou mentirosas!',
        icon: 'error',
        confirmButtonText: 'OK'
      }); return;
    }

    const tarefasSeparadas = this.newTaskTitle.split('|').map(tarefa => tarefa.trim());

    tarefasSeparadas.forEach(title => {
      if (title) {
        const newTodo: Todo = {
          id: this.todoService.getTodoNewId(),
          title: title,
          completed: false
        };
        this.todoService.addTodo(newTodo);
      }
    });
    this.newTaskTitle = '';
  }
}
