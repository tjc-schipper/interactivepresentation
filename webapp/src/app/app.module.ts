import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { LobbyService } from './lobby/lobby.service';
import { SocketService } from './socket.service';
import { ActivityService } from './viewer/activity.service';

import { AppComponent } from './app.component';
import { ConnectPageComponent } from './login/connect-page/connect-page.component';
import { ConnectFormComponent } from './login/connect-form/connect-form.component';
import { LobbyPageComponent } from './lobby/lobbypage/lobbypage.component';
import { LobbyHeaderComponent } from './lobby/lobbyheader/lobbyheader.component';
import { WaitscreenComponent } from './activities/waitscreen/waitscreen.component';
import { ExampleActivityComponent } from './activities/example-activity/example-activity.component';
import { AdminDebugPanelComponent } from './admin/admin-debug-panel/admin-debug-panel.component';
import { ViewExampleComponent } from './viewer/view-example/view-example.component';
import { ManagePageComponent } from './admin/manage-page/manage-page.component';
import { ViewPageComponent } from './viewer/view-page/view-page.component';

import { MaxCharsDirective } from './utils/max-chars.directive';
import { OnlyAlphaCharsDirective } from './utils/only-alpha-chars.directive';
import { ViewConnectPageComponent } from './viewer/view-connect-page/view-connect-page.component';

const appRoutes: Routes = [
{ path: '', redirectTo: 'participate', pathMatch: 'full'},
{ path: 'participate', component: ConnectPageComponent },
{ path: 'participate/:code', component: LobbyPageComponent, children: [
  { path: 'wait', component: WaitscreenComponent },
  { path: ':actID', component: ExampleActivityComponent },
  { path: '**', redirectTo: 'wait' }
  ]
},
{ path: 'manage', component: ManagePageComponent },
{ path: 'view', component: ViewConnectPageComponent },
{ path: 'view/:code', component: ViewPageComponent },
{ path: '**', redirectTo: '/participate'}
];


@NgModule({
  declarations: [
  AppComponent,
  ConnectFormComponent,
  LobbyHeaderComponent,
  WaitscreenComponent,
  LobbyPageComponent,
  ConnectPageComponent,
  OnlyAlphaCharsDirective,
  MaxCharsDirective,
  ExampleActivityComponent,
  AdminDebugPanelComponent,
  ViewExampleComponent,
  ManagePageComponent,
  ViewPageComponent,
  ViewConnectPageComponent
  ],
  imports: [
  BrowserModule,
  FormsModule,
  RouterModule.forRoot(appRoutes)
  ],
  providers: [LobbyService, SocketService, ActivityService],
  bootstrap: [AppComponent]
})
export class AppModule { }
