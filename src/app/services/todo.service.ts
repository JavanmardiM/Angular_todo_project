import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

const API_URL = "http://localhost:3000";

@Injectable()
export class ToDoService {
  constructor(private http: HttpClient) {}

  login(loginDto: LoginDto): Observable<any> {
    return this.http.post(`${API_URL}/users/login`, loginDto);
  }
  register(loginDto: LoginDto): Observable<any> {
    return this.http.post(`${API_URL}/users`, loginDto);
  }

  getToDoList(): Observable<ToDoListViewModel[]> {
    return this.http.get<ToDoListViewModel[]>(`${API_URL}/todo`);
  }
  addToDo(addDto: AddDto): Observable<any> {
    return this.http.post(`${API_URL}/todo`, addDto);
  }
  deleteToDoItem(id: string): Observable<any> {
    return this.http.delete<any>(`${API_URL}/todo/${id}`);
  }
  doneToDoItem(id: string, Dto: EditDto): Observable<any> {
    return this.http.put<any>(`${API_URL}/todo/${id}`, Dto);
  }
  editToDoItem(id: string, Dto: EditDto): Observable<any> {
    return this.http.put<any>(`${API_URL}/todo/${id}`, Dto);
  }
}

export interface ToDoListViewModel {
  id: string;
  title: string;
  done: boolean;
  date: string;
}
export interface AddDto {
  title: string;
  done: boolean;
  date: string;
}
export interface EditDto {
  id: string;
  title: string;
  done: boolean;
  date: string;
}
export interface LoginDto {
  email: string;
  password: string;
}
export interface LoginViewModel {
  token: string;
}
