import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { Ingredient } from '../shared/ingredient.model';
import { LoggingService } from '../logging.service';
import * as ShoppingListActions from './store/shopping-list.actions';
import * as fromApp from '../store/app.reducer';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit,OnDestroy {

  ingredients: Observable<{ ingredients: Ingredient[] }>;
  private igChangeSub: Subscription;

  constructor(
    private loggingService: LoggingService,
    private store: Store<fromApp.AppState>
    ) { }

  ngOnInit() {
    this.ingredients = this.store.select('shoppingList');
    //this.ingredients = this.shoppingListService.getIngredients();
    //this.igChangeSub = this.shoppingListService.ingredientsChanged
    //  .subscribe(
    //    (ingredientsEl: Ingredient[]) =>{
    //    this.ingredients = ingredientsEl;
    //});

    this.loggingService.printLog('Hello from ShoppingListComponent ngOnit');
  }

  onEditItem(index : number){
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
    //this.shoppingListService.startedEditing.next(index);
  }

  ngOnDestroy(){
    //this.igChangeSub.unsubscribe();
  }
}
