import { AuthService } from './../services/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { NgModule } from '@angular/core';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TodoListComponent } from './list/todoList.component';
import { TodoRoutes } from './todo.routing';
import { ToDoService } from '../services/todo.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    TodoListComponent
  ],
  imports: [
    // BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,

    RouterModule.forChild(TodoRoutes)
  ],
  providers: [
    ToDoService,
    AuthService
  ]
})
export class TodoModule { }
