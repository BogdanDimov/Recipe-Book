import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  // private recipes: Recipe[] = [
  //   new Recipe(
  //     `Spaghetti puttanesca`,
  //     `Cook up this classic sauce in one pan, then toss with spaghetti for a simple midweek meal.`,
  //     `https://images.immediate.co.uk/production/volatile/sites/30/2020/08/puttanesca-cfb4e42.jpg`,
  //     [
  //       new Ingredient('Garlic cloves', 2),
  //       new Ingredient('Capers', 2)
  //     ]),
  //   new Recipe(
  //     `Lasagne`,
  //     `Little is more satisfying than cooking a classic to perfection`,
  //     `https://images.immediate.co.uk/production/volatile/sites/30/2020/08/recipe-image-legacy-id-1273588_8-8139dd6.jpg`,
  //     [
  //       new Ingredient('Olive oil', 3),
  //       new Ingredient('Onion', 1)
  //     ])
  // ];

  private recipes: Recipe[] = [];

  constructor(
    private http: HttpClient,
    private slService: ShoppingListService) { }

  storeRecipes(): void {
    this.http
      .put(
        'https://recipe-book-3e419-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
        this.recipes
      )
      .subscribe(response =>
        console.log(response)
      );
  }

  fetchRecipes(): Observable<Recipe[]> {
    return this.http
      .get<Recipe[]>('https://recipe-book-3e419-default-rtdb.europe-west1.firebasedatabase.app/recipes.json')
      .pipe(
        map(recipes => {
          return recipes.map(recipe => {
            return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] }
          });
        }),
        tap(
          recipes => this.setRecipes(recipes)
        )
      );
  }

  setRecipes(recipes: Recipe[]): void {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe): void {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe): void {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
