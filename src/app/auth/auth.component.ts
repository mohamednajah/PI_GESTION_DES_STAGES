import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit{
  username: string = '';
  password: string = '';
  isAuthRoute!: boolean;
  constructor(private router: Router) {}


  login() {
    // Vérification des informations d'identification
    if (this.username === 'admin' && this.password === 'password') {
      // Authentification réussie
      console.log('Authentification réussie');
      // Effectuer les actions nécessaires (par exemple, redirection vers une page sécurisée)
    } else {
      // Authentification échouée
      console.log('Nom d\'utilisateur ou mot de passe incorrect');
      // Afficher un message d'erreur à l'utilisateur ou effectuer d'autres actions nécessaires
    }
  }

  ngOnInit(): void {
    this.isAuthRoute = this.router.url === '/auth';

  }

}
