import { Component } from '@angular/core';
import { CameraComponent } from '../../camera/camera.component';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [CameraComponent],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent {

}
