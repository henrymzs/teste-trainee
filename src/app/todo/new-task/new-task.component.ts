import { Component } from '@angular/core';
import { Todo } from '../../shared/models/todo.model';
import { TodoService } from 'src/app/shared/services/todo.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent {
  newTaskTitle: string = '';

  constructor(private todoService: TodoService) { }

  addTask() {
    if (!this.newTaskTitle.trim()) {
      alert('O titulo da tarefa não pode estar vazio!');
      return;
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
