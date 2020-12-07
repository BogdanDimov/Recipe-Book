import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Oranges', 3),
    new Ingredient('Lemons', 5)
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onIngredientAdded(ingToAdd: Ingredient) {
    this.ingredients.push(ingToAdd);
  }
}
