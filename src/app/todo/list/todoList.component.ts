import { AuthService } from './../../services/auth.service';
import {
  ToDoService,
  ToDoListViewModel,
  AddDto,
  EditDto
} from "./../../services/todo.service";
import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-todoList",
  templateUrl: "./todoList.component.html",
  styleUrls: ["./todoList.component.scss"]
})
export class TodoListComponent implements OnInit {

  @ViewChild('titleInput', { static: false }) titleInput: ElementRef;
  title = "todo";
  isEditing = false;
  toDoList: ToDoListViewModel[];
  selectedIndex;

  constructor(
    private toDoService: ToDoService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const path = this.activatedRoute.snapshot.url[0].path;
    if (path === "active") {
      this.getActiveList();
    } else if (path === "completed") {
      this.getCompletedList();
    } else {
      this.getToDoList();
    }
  }

  getToDoList() {
    this.toDoService.getToDoList().subscribe((list: ToDoListViewModel[]) => {
      this.toDoList = list;
    });
  }
  getActiveList() {
    this.toDoService.getToDoList().subscribe((list: ToDoListViewModel[]) => {
      this.toDoList = list.filter(a => a.done === false);
    });
  }
  getCompletedList() {
    this.toDoService.getToDoList().subscribe((list: ToDoListViewModel[]) => {
      this.toDoList = list.filter(a => a.done === true);
    });
  }
  add(event) {
    const addDto: AddDto = {
      title: event.target.value,
      done: false,
      date: new Date().toString()
      // date: "2019-11-21T15:06:20.133Z"
    };
    this.toDoService.addToDo(addDto).subscribe(
      _ => {
        this.titleInput.nativeElement.value = '';
        this.getToDoList();
      },
      err => {
        console.log("err", err);
      }
    );
  }
  delete(id) {
    this.toDoService.deleteToDoItem(id).subscribe(
      _ => {
        this.getToDoList();
      },
      err => {
        console.log("err", err);
      }
    );
  }
  setDone(item: ToDoListViewModel) {
    let dto: EditDto;
    if (item.done === true) {
      dto = {
        id: item.id,
        title: item.title,
        done: false,
        date: new Date().toString()
      };
    } else {
      dto = {
        id: item.id,
        title: item.title,
        done: true,
        date: new Date().toString()
      };
    }
    this.toDoService.doneToDoItem(item.id, dto).subscribe(
      _ => {
        this.getToDoList();
      },
      err => {
        console.log("err", err);
      }
    );
  }

  active() {
    this.router.navigate(["../active"], { relativeTo: this.activatedRoute });
  }
  completed() {
    this.router.navigate(["../completed"], { relativeTo: this.activatedRoute });
  }
  all() {
    this.router.navigate(["../todoList"], { relativeTo: this.activatedRoute });
  }

  enableEdit(index){
    this.isEditing = true;
    this.selectedIndex = index;
  }
  editTitle(event, item: ToDoListViewModel) {

    if (event) {
      const dto: EditDto = {
        id: item.id,
        title: event.target.value,
        done: item.done,
        date: new Date().toString()
      };
      this.toDoService.editToDoItem(item.id, dto).subscribe(
        _ => {
          this.isEditing = false;
          this.getToDoList();
        },
        err => {
          this.isEditing = false;
          console.log("err", err);
        }
      );
    }
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
