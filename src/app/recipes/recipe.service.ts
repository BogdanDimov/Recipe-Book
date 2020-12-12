import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Injectable } from '@angular/core';

@Injectable()
export class RecipeService {

  private recipes: Recipe[] = [
    new Recipe(
      `Spaghetti puttanesca`,
      `Cook up this classic sauce in one pan, then toss with spaghetti for a simple midweek meal.`,
      `https://images.immediate.co.uk/production/volatile/sites/30/2020/08/puttanesca-cfb4e42.jpg`,
      [
        new Ingredient('Garlic cloves', 2),
        new Ingredient('Capers', 2)
      ]),
    new Recipe(
      `Lasagne`,
      `Little is more satisfying than cooking a classic to perfection`,
      `https://images.immediate.co.uk/production/volatile/sites/30/2020/08/recipe-image-legacy-id-1273588_8-8139dd6.jpg`,
      [
        new Ingredient('Olive oil', 3),
        new Ingredient('Onion', 1)
      ])
  ];

  constructor(private slService: ShoppingListService) { }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }
}
