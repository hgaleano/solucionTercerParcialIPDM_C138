import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { categoriaResponse } from '../interfaces/categoriaResponse';
import { libroResponse } from '../interfaces/libroResponse';
import { pedidoResponse } from '../interfaces/responsePedido';
@Injectable({
  providedIn: 'root'
})
export class LibreriaService {

  constructor(private http:HttpClient) { }

  getCategorias(){
    var url='https://www.hostcatedral.com/api/appCatalogoLibro/public/getCategoriaLibros';
    return this.http.get<categoriaResponse[]>(url);
  }

  getLibrosPorCategoria(id){
    var url='https://www.hostcatedral.com/api/appCatalogoLibro/public/getLibrosPorCategoria/'+id;
    return this.http.get<libroResponse[]>(url);
  }

  setPedido(nombre_cliente:string,telefono:string,email:string,cantidad:string,libro_id:string){
    var formData= new FormData();
    formData.append('nombre_cliente',nombre_cliente);
    formData.append('Telefono',telefono);
    formData.append('Email',email);
    formData.append('Cantidad',cantidad);
    formData.append('LibroID',libro_id);
    var url='https://www.hostcatedral.com/api/appCatalogoLibro/public/RealizarPedido';

     return this.http.post<pedidoResponse>(url,formData);
  }
}
