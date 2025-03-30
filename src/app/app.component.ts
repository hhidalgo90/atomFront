import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { firebaseApp } from "./util/firebase-config";

@Component({
    selector: "app-root",
    standalone: true,
    imports: [RouterOutlet],
    providers: [
        {
            provide: 'FirebaseApp',
            useFactory: () => firebaseApp
        }
    ],
    templateUrl: "./app.component.html",
    styleUrl: "./app.component.scss"
})
export class AppComponent {
    title = "atom-challenge-fe-template";
}

