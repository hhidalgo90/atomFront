import { Routes } from "@angular/router";
import { tasksGuard } from "./guard/tasks.guard";

export const routes: Routes = [
    {
        path: "",
        redirectTo: "/login",
        pathMatch: "full"
    },
    {
        path: "home",
        loadComponent: () => import("./modules/example-page/example-page.component").then((m) => m.ExamplePageComponent)
    }
    ,
    {
        path: "login",
        loadComponent: () => import("./modules/login/login.component").then((m) => m.LoginComponent)
    }
    ,
    {
        path: "tasks",
        loadComponent: () => import("./modules/tasks/tasks.component").then((m) => m.TasksComponent),
        canActivate: [tasksGuard]
    }
];
