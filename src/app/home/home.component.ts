import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private rutaActiva: ActivatedRoute,
    private apiService: ApiService) {
  }

  ngOnInit(): void {
    const id = this.rutaActiva.snapshot.queryParamMap.get('id');
    console.log(id);
    this.getDatos(id)
  }

  async callEndpoint(id: string) {

    this.apiService.post(`renovar/${id}`).subscribe(
      async (res: any) => {
        console.log(res);
        Swal.fire({
          title: 'Renovacion Realizada',
          confirmButtonText: 'Cerrar',

        }).then((result) => {
          if (result.isConfirmed) {
            //cerrar ventana
          }
        })
      },
      (error: any) => {
        console.log('error aceptando terminos', error);

      }
    );



  }

  async getDatos(id: any) {

    let body = {
      "idclientes": id
    }

    await this.apiService.post('getdatos', body).subscribe(
      async (res: any) => {
        console.log(res);
        let name = res.data[0].Nombre;
        Swal.fire({
          title: `Hola ${name} bienvenido, Su licencia vencera pronto si quiere hacer nuevamente uso de nuestros servicio seleccione el boton Renovar esperamos que siga contando con nuestros servicios `,
          showDenyButton: true,
          showCancelButton: false,
          confirmButtonText: 'Renovar',
          confirmButtonColor: "blue",
          denyButtonText: `No renovar`,
        }).then((result) => {

          if (result.isConfirmed) {
            this.callEndpoint(id);
          } else if (result.isDenied) {
            //Swal.fire('Changes are not saved', '', 'info')
            window.location.href = "https://www.gmail.com/";
          }
        })

      },
      (error: any) => {
        console.log('error consultando el info', error);

      }
    );



  }

}


