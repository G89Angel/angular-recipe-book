import { Recipe } from './../recipe.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('Dummy recipe', 'This is just a dummy recipe',
    'http://maxpixel.freegreatpicture.com/static/photo/1x/Chicken-Avocado-Heart-Salad-1735138.jpg')
  ];

  constructor() { }

  ngOnInit() {
  }

}
