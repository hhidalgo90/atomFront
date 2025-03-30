import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Task } from '../../model/task';
import { TaskService } from '../../services/task.service';
import { showAlertDeleteUser, showAlertSignOut, showSuccesAlert } from '../../components/dialog/dialog';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { spinner } from '../../components/spinner/spinner';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule, ReactiveFormsModule],
  providers: [TaskService, LoginService],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent {
  tasks: Task[] = [];
  showForm: boolean = false;
  email: any;
  taskForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),
  });
  statusOptions = [{
    description: 'Pending'
  }, { description: 'Completed' }, { description: 'In Progress' }];


  constructor(private route: ActivatedRoute, private router: Router, private taskService: TaskService, @Inject(ToastrService) private toastr: ToastrService) {
  }

  ngOnInit() {
    console.log("Tasks component initialized");
    this.route.queryParams.subscribe(params => {
      console.log("Email parameter:", params['email']);
      this.email = params['email'];
      this.getTasks();
    });
  }

  getTasks() {
    spinner();
    this.taskService.getTasks(this.email).then((response) => {
      console.log(response);
      if (response) {
        this.tasks = response as Task[];
        Swal.close();
      }
    },
      (error) => {
        Swal.close();
        console.error("Error al obtener las tareas:", error);
        this.toastr.error('Error!', error.error.mensaje);
      });
  }

  deleteTask(task: Task) {
    spinner();
    this.taskService.deleteTask(this.email, task.id).then((response) => {
      console.log(response);
      if (response) {
        showSuccesAlert();
        setTimeout(() => {
          this.getTasks();
          this.showForm = false;
          this.taskForm.reset();
          Swal.close();
        }, 3000);
      }
      this.taskForm.reset();

    },
      (error) => {
        Swal.close();
        console.error("Error al agregar la tarea:", error);
        this.toastr.error('Error!', error.error.mensaje);
      });
  }

  addTask() {
    if (this.taskForm.valid) {
      spinner();
      let newTask = new Task(this.taskForm.value.title!, this.taskForm.value.description!, this.taskForm.value.status!);
      this.taskService.addTask(newTask, this.email).then((response) => {
        console.log(response);
        if (response) {
          showSuccesAlert();
          setTimeout(() => {
            this.getTasks();
            this.showForm = false;
            this.taskForm.reset();
            Swal.close();
          }, 3000);
        }
        this.taskForm.reset();

      },
        (error) => {
          Swal.close();
          console.error("Error al agregar la tarea:", error);
          this.toastr.error('Error!', error.error.mensaje);
        });
    }
  }

  showAlertDeleteUser(task: Task){
    showAlertDeleteUser().then((result: any) => {
      if (result.isConfirmed) {
        this.deleteTask(task);
      }
    });
  }

  updateTask(task: Task) {
      spinner();
      let updatedTask = new Task(task.title!, task.description!, task.status!);
      this.taskService.updateTask(this.email, task.id, updatedTask).then((response) => {
        console.log(response);
        if (response) {
          task.editing = false;
          showSuccesAlert();
          setTimeout(() => {
            this.getTasks();
            this.showForm = false;
            this.taskForm.reset();
            Swal.close();
          }, 3000);
        }
        this.taskForm.reset();

      },
        (error) => {
          Swal.close();
          console.error("Error al agregar la tarea:", error);
          this.toastr.error('Error!', error.error.mensaje);
        });
  }

  toggleStatus(task: Task): void {
    this.taskService.updateTask(this.email, task.id, task);
  }

  showTaskForm() {
    this.showForm = !this.showForm;
  }

  enableEdit(task: Task) {
    task.editing = true;
  }

  cancelEdit(task: Task) {
    // Aquí puedes reiniciar los cambios si es necesario
    task.editing = false;
  }

  signOut() {
    showAlertSignOut().then((result: any) => {
      if (result.isConfirmed) {
        sessionStorage.removeItem('email');
        this.router.navigate(['/login']);
      }
    });
  }
}
