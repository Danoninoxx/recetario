import { Component, EventEmitter, HostListener, inject, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FireService } from '../../services/fire.service';
import { CameraComponent } from '../../camera/camera.component';


@Component({
  selector: 'app-form-modal',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule,CameraComponent],
  templateUrl: './form-modal.component.html',
  styleUrl: './form-modal.component.css'
})
export class FormModalComponent {
  @Input() isOpen = false;
  @Output() onClose = new EventEmitter<any>();

  fb = inject(FormBuilder); //injecta la libreria que permite crear formularios
  recipeForm!:FormGroup; //donde almacenamos el puntero al formulario
  fire = inject(FireService);

  file: File | null = null;
  fileBase64:any;

  constructor(){
    this.recipeForm = this.fb.group({
      strMeal: new FormControl('',[Validators.required,Validators.minLength(3)]),
      strMealThumb: new FormControl(''),
      strInstructions: new FormControl(''),
      strYoutube: new FormControl(''),
      strIngredients: new FormControl('')
    });
  }

  closeModal(){
    history.back();
  }

  @HostListener('window:popstate', ['$event'])
  onPopState(event: PopStateEvent) {
    this.onClose.emit("Me cierro");
  }

  @HostListener('document:keydown',['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.closeModal();
    }
  }

  async createRecipe(){
    if(this.recipeForm.invalid){
      return;
    }
    try{
      console.log({...this.recipeForm.value,
        strMealThumb: this.fileBase64
      })
      let recipe = await this.fire.createRecipe(
        {...this.recipeForm.value,
        strMealThumb: this.fileBase64
      });
      this.recipeForm.reset();
      this.closeModal();
    }catch(err){
      alert("Error al crear la receta: "+err);
    }
  }


  handleUpload(event:any) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      // Validar el archivo antes de procesarlo
      if (!file.type.startsWith('image/')) {
        alert('Por favor, selecciona un archivo de imagen.');
        return;
      }

      const maxSize = 50 * 1024 ; // Máximo 50 KB
      if (file.size > maxSize) {
        alert('El archivo debe ser menor a 2 MB.');
        return;
      }

      // Convertir el archivo a Base64
      const reader = new FileReader();
      reader.onload = () => {
        this.fileBase64 = reader.result as string;
      };
      reader.readAsDataURL(file); // Leer el archivo como DataURL
    }
}

    handleFileLoaded(event: any) {
      console.log(event)
      this.fileBase64 = event;  
    }
}
