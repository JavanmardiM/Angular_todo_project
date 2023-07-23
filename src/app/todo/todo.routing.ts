import { Routes } from '@angular/router';
import { TodoListComponent } from './list/todoList.component';

export const TodoRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'todoList'
      },
      {
        path: 'todoList',
        component: TodoListComponent
      },
      {
        path: 'active',
        component: TodoListComponent
      },
      {
        path: 'completed',
        component: TodoListComponent
      }

    ]
  }
];
