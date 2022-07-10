import { Component, OnInit } from '@angular/core';
import {  Router,ActivatedRoute,NavigationExtras } from "@angular/router";
import { libroResponse } from '../interfaces/libroResponse';
import { pedidoModel } from '../interfaces/pedidoModel';
import { AlertController,LoadingController  } from '@ionic/angular';
import { LibreriaService } from '../services/libreria.service';
@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.page.html',
  styleUrls: ['./pedido.page.scss'],
})
export class PedidoPage implements OnInit {
libro:libroResponse;
pedido:pedidoModel={Nombre:null,Telefono:null,Email:null,Cantidad:null};

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public alertController: AlertController,
    public loadingController: LoadingController,
    private libreriaService:LibreriaService,
  ) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.libro = this.router.getCurrentNavigation().extras.state.libro;
        console.log(this.libro);
        
      }
    });
   }

  ngOnInit() {
  }

  Solicitar(){
    console.log(this.pedido);
    this.loadingController.create({
      message: 'Aguarde por favor...',
    }).then((res)=>{
      res.present();
    this.libreriaService.setPedido(this.pedido.Nombre,this.pedido.Telefono,this.pedido.Email,this.pedido.Cantidad,this.libro.LibroID).subscribe(
      data=>{
            res.dismiss();
            this.Alerta(data.message);
         
          this.router.navigateByUrl('/home');
          
      },  
      error=>{
        res.dismiss();
        console.log(error.error.message);        
      }
      )
    });
  }

  async Alerta(msg:string) {
    const alert = await this.alertController.create({
      header: 'Atención',
      message: msg,
      buttons: ['Aceptar']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }

}
