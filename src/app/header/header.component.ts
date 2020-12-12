import { AuthService } from '../auth/auth.service';
import { RecipeService } from '../recipes/recipe.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
  collapsed = true;
  isAuthenticated = false;
  private userSub: Subscription;

  constructor(
    private recipeService: RecipeService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => this.isAuthenticated = !!user);
  }

  onSaveData(): void {
    this.recipeService.storeRecipes();
  }

  onFetchData(): void {
    this.recipeService.fetchRecipes().subscribe();
  }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
}
