import {Component, inject} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {MatSidenav, MatSidenavContainer} from "@angular/material/sidenav";
import {MatListItem, MatNavList} from "@angular/material/list";
import {MatIcon} from "@angular/material/icon";
import {MatToolbar} from "@angular/material/toolbar";
import {MatIconButton} from "@angular/material/button";
import {LoadingIndicatorComponent} from "./loading/loading.component";
import {MessagesComponent} from "./messages/messages.component";
import { AuthService } from './services/auth.service';
import { MessagesService } from './messages/messages.service';


@Component({
    selector: 'app-root',
    imports: [
        RouterOutlet, MatSidenavContainer, MatSidenav, MatNavList, MatListItem, MatIcon, RouterLink, MatToolbar,
        MatIconButton, LoadingIndicatorComponent, MessagesComponent
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
authService= inject(AuthService);
router= inject(Router);
messagesService= inject(MessagesService);
isLoggdedIn= this.authService.isLoggedIn;

async onLogout(){
    try {
        await this.authService.logout();
        this.router.navigate(['/login']);
    } catch (error) {
        console.error("Error during logout", error); 
        this.messagesService.showMessage("error", "Error during logout");
    }
}

}