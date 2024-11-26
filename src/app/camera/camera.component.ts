import { CommonModule, NgClass } from '@angular/common';
import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Subject, Observable } from 'rxjs';


@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  imports:[NgClass],
  styleUrls: ['./camera.component.css'],
  standalone:true
})
export class CameraComponent {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  @ViewChild('canvas') canvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('video') video!: ElementRef<HTMLVideoElement>;

  isCameraSelected = false;
  fileBase64: string | null = null;  //la información

  imageSrc: string | undefined;
  isCameraActive = false;
  stream: MediaStream | null = null;

  @Output() fileLoaded = new EventEmitter();

  onFileChange(event: Event): void {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.fileBase64 = reader.result as string;
        this.drawImageOnCanvas(this.fileBase64);
        this.fileLoaded.emit(this.fileBase64);
        //listo para emitir evento al exterior con data.
      };
      reader.readAsDataURL(file);
    }
  }

  drawImageOnCanvas(data:any): void {
    if (data && this.canvas) {
      const canvas = this.canvas.nativeElement;
      const context = canvas.getContext('2d');
      if (context) {
        const image = new Image();
        image.onload = () => {
          canvas.width = image.width;
          canvas.height = image.height;
          context.drawImage(image, 0, 0);
        };
        image.src = data;
      }
    }
  }

  startCamera(event:any): void {
    event.preventDefault();
    event.stopPropagation();
    this.isCameraSelected=true;
    this.fileBase64=null;
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        this.stream = stream;
        this.isCameraActive = true;
        const videoElement = this.video.nativeElement;
        videoElement.srcObject = stream;
        videoElement.play();
      })
      .catch((err) => {
        console.error('Error accessing camera: ', err);
      });
  }

  stopCamera(event:any): void {
    event?.preventDefault();
    event?.stopPropagation();
    this.isCameraSelected=false;
    this.fileBase64=null;
 
    if (this.stream) {
      this.stream.getTracks().forEach((track) => track.stop());
      this.stream = null;
      this.isCameraActive = false;
    }
  }

  captureFromCamera(event: any): void {
    event?.preventDefault();
    event?.stopPropagation();
    
    if (this.isCameraActive && this.canvas && this.video) {
      const canvas = this.canvas.nativeElement;
      const context = canvas.getContext('2d');
      const video = this.video.nativeElement;
      
      // Obtener las dimensiones del video
      const videoWidth = video.videoWidth;
      const videoHeight = video.videoHeight;
  
      // Definir el tamaño máximo de la imagen
      const maxWidth = 300;
      const maxHeight = 300;
  
      // Calcular las proporciones para redimensionar la imagen
      let width = videoWidth;
      let height = videoHeight;
  
      if (width > maxWidth || height > maxHeight) {
        const scale = Math.min(maxWidth / width, maxHeight / height);
        width = width * scale;
        height = height * scale;
      }
  
      // Ajustar el tamaño del canvas al tamaño redimensionado
      canvas.width = width;
      canvas.height = height;
  
      if (context) {
        // Dibujar la imagen del video redimensionada en el canvas
        context.drawImage(video, 0, 0, width, height);
  
        // Generar el Data URL de la imagen redimensionada
        this.fileBase64 = canvas.toDataURL('image/png');
        this.fileLoaded.emit(this.fileBase64);
      }
    }
  }
  

  saveImage(): void {
    //emita el event
    if(this.fileBase64){

    }
  }

  ngOnDestroy(): void {
    this.stopCamera(null);
  }
}
