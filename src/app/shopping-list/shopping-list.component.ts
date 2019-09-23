import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { LoggingService } from '../logging.service';
import * as fromShoppingList from './store/shopping-list.reducer';
import * as ShoppingListActions from './store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit,OnDestroy {

  ingredients: Observable<{ ingredients: Ingredient[] }>;
  private igChangeSub: Subscription;

  constructor(
    private shoppingListService: ShoppingListService, 
    private loggingService: LoggingService,
    private store: Store<fromShoppingList.AppState>
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
