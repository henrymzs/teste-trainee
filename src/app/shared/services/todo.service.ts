import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Todo } from '../models/todo.model';
import { jsPDF } from "jspdf";
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todos!: Todo[];

  constructor() {
    this.loadFromLocalStorage();
  }

  private saveToLocalStorage(): void {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  generatePDF(todos: Todo[]): void {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.text("Lista de Tarefas", 10, 10);

    let posY = 20;
    todos.forEach((todo, index) => {
      const status = todo.completed ? "[v]" : "[]";
      doc.text(`${index + 1}. ${status} ${todo.title}`, 10, posY);
      posY += 10;
    })
    doc.save("Tarefas.pdf");
  }

  private loadFromLocalStorage(): void {
    const todosJson = localStorage.getItem('todos');
    this.todos = todosJson ? JSON.parse(todosJson) : [
      { id: 1, title: 'make an awesome angular todo-list', completed: true },
      { id: 2, title: 'deploy my awesome angular todo-list project on github.io', completed: true },
      { id: 3, title: 'think about tasks I can example on my to do list project', completed: false },
      { id: 4, title: 'give up about the exemples (you already have them)', completed: false },
      { id: 5, title: "what can I do next? Let's do a new project! :)", completed: false }
    ];
    this.sortTodos();
  }

  getTodos(): Observable<Todo[]> {
    return of(this.todos);
  }

  private updateLocalStorageAndSave(): void {
    this.saveToLocalStorage();
  }

  addTodo(newTodo: Todo): void {
    this.todos.push(newTodo);
    this.sortTodos();
    this.updateLocalStorageAndSave();
  }

  updateTodo(updatedTodo: Todo): void {
    const index = this.todos.findIndex(todo => todo.id === updatedTodo.id);
    if (index !== -1) {
      this.todos[index] = updatedTodo;
      this.sortTodos();
      this.updateLocalStorageAndSave();
    }
  }

  deleteTodo(todoId: number): void {
    const index = this.todos.findIndex(todo => todo.id === todoId);
    if (index !== -1) {
      this.todos.splice(index, 1);
      this.sortTodos();
      this.updateLocalStorageAndSave();
    }
  }

  getTodoNewId(): number {
    return this.todos.reduce((maxId, todo) => Math.max(maxId, todo.id), 0) + 1;
  }

  sortTodos() {
    this.todos.sort((a, b) => {
      if (a.completed && !b.completed) {
        return 1;
      } else if (!a.completed && b.completed) {
        return -1;
      } else {
        return 0;
      }
    });
  }

  sortTasksAZ() {
    this.todos.sort((a, b) => a.title.localeCompare(b.title));
  }

  clearAll() {
    this.todos = [];
    this.updateLocalStorageAndSave();
  }

  clearCompletedTasks() {
    Swal.fire({
      title: 'Sucesso!',
      text: 'Sua ação foi concluída.',
      icon: 'success',
      confirmButtonText: 'OK'
    });
    this.todos = this.todos.filter(({ completed }) => completed === false);
    this.updateLocalStorageAndSave();
  }
}
