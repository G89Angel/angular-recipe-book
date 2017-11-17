import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Data } from '@angular/router';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;

  constructor(private recipeService: RecipeService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params
        .subscribe((params) => {
          this.id = +params['id'];
          this.editMode = !!params['id'];
        });
  }

}
