import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController,LoadingController  } from '@ionic/angular';

import { LibreriaService } from '../services/libreria.service';
import { categoriaResponse } from '../interfaces/categoriaResponse';
import { libroResponse } from '../interfaces/libroResponse';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
 categorias:categoriaResponse[]=[];
 libros:libroResponse[]=[];
categoria_id_selecionado;
  constructor(
    private libreriaService:LibreriaService,
    public loadingController: LoadingController,
    private router: Router
    ) {}
    
ngOnInit(): void {
  this.getCategorias();
  
}
    
getCategorias(){
  this.loadingController.create({
    message: 'Aguarde por favor...',
  }).then((res)=>{
    res.present();
  this.libreriaService.getCategorias().subscribe(
    data=>{
          console.log(data);
          this.categorias=data;
          res.dismiss();
     
    },  
    error=>{
      res.dismiss();
      console.log(error.error.message);

      
    }
    )
  });
}

getLibrosCategoria(){
  this.loadingController.create({
    message: 'Aguarde por favor...',
  }).then((res)=>{
    res.present();
  this.libreriaService.getLibrosPorCategoria(this.categoria_id_selecionado).subscribe(
    data=>{
          console.log(data);
          this.libros=data;
          res.dismiss();
     
    },  
    error=>{
      res.dismiss();
      console.log(error.error.message);

      
    }
    )
  });
}

RealizarPedido(libro){
  let navigationExtras: NavigationExtras = {
    state: {
      libro: libro,
    }
  };
  this.router.navigate(['/pedido'], navigationExtras);
}

}
