import { Component, inject, Input, signal, WritableSignal } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-list-recipes',
  standalone: true,
  imports: [NgClass],
  templateUrl: './list-recipes.component.html',
  styleUrl: './list-recipes.component.css'
})
export class ListRecipesComponent {
  api = inject(ApiService);
  router = inject(Router);

  @Input()
  type:string='';

  @Input()
  subtype:string='';

  $state:WritableSignal<any> = signal({
    loading:false,
    error:false,
    data:[]
  });

  ngOnInit(){
    //Al inicio del componente
    this.fetchData();
  }

  fetchData(){
    //Llama al servicio
    this.$state.update(state => (
      {...state, loading:true}
    ));

    let request;
    switch(this.type){
      case 'category':
        request = this.api.getRecipesByCategory(this.subtype);
        break;
      case 'nationality':
        request = this.api.getRecipesByNationality(this.subtype);
        break;
      default:
        request = null;
    }
    if(request){
      //Subscribo al observable
      request.subscribe({
        next: (data) => {
          this.$state.update(state => (
            {...state, loading:false, error:false, data:data}
          ));
        },
        error:(err) => {
          this.$state.update(state => (
            {...state, loading:false, error:err, data:[]}
          ));
        }
      })
    
    }else{
      //Error
      this.$state.update(state => (
        {...state, loading:false, error: 'Categoría incorrecta'}
      ));
    }
  }

  goToRecipe(idMeal:string){
    //Navega a recipe/:id
    this.router.navigate(['recipe', idMeal]);
  }
}
