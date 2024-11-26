import { Component, inject, input, signal, WritableSignal, ɵunwrapWritableSignal } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { FireService } from '../../services/fire.service';

@Component({
  selector: 'app-view-favs',
  standalone: true,
  imports: [JsonPipe, CommonModule],
  templateUrl: './view-favs.component.html',
  styleUrl: './view-favs.component.css'
})
export class ViewFavsComponent {
  fire = inject(FireService);

  id = input.required<string>();

  $state: WritableSignal<any> = signal({
    data: null,
    loading: true,
    error: null
  })
  ngOnInit() {
    this.fetchData();
  }
  fetchData() {
    this.$state.update(state => {
      return { ...state, loading: true }
    });
    let request = this.fire.getRecipesById(this.id());
    request?.subscribe({
      next: (data: any) => {
        this.$state.update(state => {
          return { ...state, loading: false, data: data}
        });
      },
      error: (error: any) => {
        console.error(error)
        this.$state.update(state => {
          return { ...state, loading: false, data: [], error: error }
        });
      }
    })
  }
}