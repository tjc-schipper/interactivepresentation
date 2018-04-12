import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { LobbyService } from './lobby/lobby.service';

import { AppComponent } from './app.component';
import { ConnectPageComponent } from './login/connect-page/connect-page.component';
import { ConnectFormComponent } from './login/connect-form/connect-form.component';
import { LobbyPageComponent } from './lobby/lobbypage/lobbypage.component';
import { LobbyHeaderComponent } from './lobby/lobbyheader/lobbyheader.component';
import { WaitscreenComponent } from './lobby/waitscreen/waitscreen.component';


const appRoutes: Routes = [
//{ path: 'manage', component: ManageOverviewComponent },
//{ path: 'manage/:code', component: ManageLoginComponent },
{ path: 'participate', component: ConnectPageComponent },
{ path: 'participate/:code', component: LobbyPageComponent},
{ path: '', redirectTo: '/participate', pathMatch: 'full'},
{ path: '**', redirectTo: '/participate'}
];


@NgModule({
  declarations: [
    AppComponent,
    ConnectFormComponent,
    LobbyHeaderComponent,
    WaitscreenComponent,
    LobbyPageComponent,
    ConnectPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [LobbyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
