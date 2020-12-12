import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class RecipesResolverService implements Resolve<Recipe[]> {

  constructor(private recipeService: RecipeService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const recipes = this.recipeService.getRecipes();

    if (recipes.length === 0) {
      return this.recipeService.fetchRecipes();
    } {
      return recipes;
    }
  }
}
