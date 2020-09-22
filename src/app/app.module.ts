import { AuthGuard } from './guards/auth-guard.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';
import { MatTableModule } from '@angular/material/table';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableComponent } from './table/table.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatGridListModule } from '@angular/material/grid-list';
import { TailsComponent } from './tails/tails.component';
import { MatButtonModule } from '@angular/material/button';
import { AddMovieComponent } from './add-movie/add-movie.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { MatCardModule } from '@angular/material/card';

export function tokenGetter() {
  return localStorage.getItem('jwt');
}

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    HomeComponent,
    LoginComponent,
    TailsComponent,
    AddMovieComponent,
    MovieDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatGridListModule,
    FontAwesomeModule,
    RouterModule.forRoot([
      { path: 'home', component: HomeComponent },
      { path: '', component: LoginComponent },
      { path: 'table', component: TableComponent, canActivate: [AuthGuard] },
      { path: 'tails', component: TailsComponent, canActivate: [AuthGuard] },
      {
        path: 'details/:id',
        component: MovieDetailsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'add-movie',
        component: AddMovieComponent,
        canActivate: [AuthGuard],
      },
    ]),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:44374'],
        disallowedRoutes: [],
      },
    }),
    BrowserAnimationsModule,
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
