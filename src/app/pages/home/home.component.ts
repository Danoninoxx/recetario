import { Component, inject } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  api = inject(ApiService);

  ngOnInit() {
    let request = this.api.getNationalities();
    request.subscribe(
      (data:any)=>{
        console.log(data);
      }
    );
  }
}
