import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginPageComponent } from './login-page/login-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { CommentsListComponent } from './comments-list/comments-list.component';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { CommentComponent } from './comment/comment.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { DayComponent } from './day/day.component';
import { SanitizerPipe } from './shared/pipes/sanitizer.pipe';
import { DatePickerComponent } from './shared/ui/components/date-picker/date-picker.component';
import { DropdownComponent } from './shared/ui/components/dropdown/dropdown/dropdown.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PopupComponent } from './shared/ui/components/popup/popup.component';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { TextInputComponent } from './shared/ui/components/text-input/text-input.component';

@NgModule({
    declarations: [
        AppComponent,
        HomePageComponent,
        LoginPageComponent,
        HeaderComponent,
        CommentsListComponent,
        SignupPageComponent,
        CommentComponent,
        ProfilePageComponent,
        DayComponent,
        SanitizerPipe,
        DatePickerComponent,
        DropdownComponent,
        PopupComponent,
        TextInputComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        LazyLoadImageModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
