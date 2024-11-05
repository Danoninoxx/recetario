import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { map, Observable } from 'rxjs';
import { Meal } from '../model/meal';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  http = inject(HttpClient);

  constructor() { }

  /**
   * Petición GET a la API para obtener las nacionalidades
   * @returns Observable de un array de las nacionalidades de tipo {strArea:"nationality"}
   */
  getNationalities():Observable<{strArea:string}[]> {
    return this.http.get(environment.api.nationalities).pipe(map((data: any) => data.meals));
  }

  /**
   * Petición GET a la API para obtener las categorias
   * @returns Observable de un array de las categorias de tipo {strCategory:"category"}
   */
  getCategories():Observable<{strCategory:string}[]> {
    return this.http.get(environment.api.categories).pipe(map((data: any) => data.meals));
  }

  getRecipesByCategory(category: string):Observable<{strMeal:string,strMealThumb:string,idMeal:string}[]> {
    return this.http.get(`${environment.api.listByCategory}${category}`).pipe(map((data: any) => data.meals));
  }

  getRecipesByNationality(nationality: string):Observable<{strMeal:string,strMealThumb:string,idMeal:string}[]> {
    return this.http.get(`${environment.api.listByNationality}${nationality}`).pipe(map((data: any) => data.meals));
  }

  getRecipeById(id: string):Observable<Meal | undefined> {
    return this.http.get(`${environment.api.viewRecipe}${id}`)
    .pipe(map((data: any) => {
      if(data.meals && data.meals.length > 0) 
        return data.meals[0];
      else
        return undefined;
    }));
  }
}
