import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import{BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotesListComponent } from './pages/notes-list/notes-list.component';
import { MainLayoutComponent } from './pages/main-layout/main-layout.component';
import { NoteCardComponent } from './note-card/note-card.component';
import { FormsModule } from '@angular/forms';
import { NoteDetailsComponent } from './pages/note-details/note-details.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    NotesListComponent,
    MainLayoutComponent,
    NoteCardComponent,
    NoteDetailsComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
