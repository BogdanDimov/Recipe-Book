import { RecipeService } from '../recipes/recipe.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  collapsed = true;

  constructor(private recipeService: RecipeService) { }

  onSaveData(): void {
    this.recipeService.storeRecipes();
  }

  onFetchData(): void {
    this.recipeService.fetchRecipes().subscribe();
  }
}
