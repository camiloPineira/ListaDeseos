import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DeseosService } from '../../services/deseos.service';
import { Lista } from '../../models/lista.model';
import { Router } from '@angular/router';
import { AlertController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent {

  @ViewChild( IonList ) lista: IonList;
  @Input() terminada = true;


  constructor( public deseosService: DeseosService,
               private router: Router,
               private alertCtrl: AlertController) {}

               async modificarLista(lista: Lista){

                const alert2 = await this.alertCtrl.create({
                  header: 'Modificar lista',
                  inputs: [{
                    name: 'titulo',
                    type: 'text',
                    value: lista.titulo,
                    placeholder: 'Nombre de la lista'
                  }],
                  buttons: [{
                    text: 'Cancelar',
                    role: 'cancel',
                    handler: () => {
                      console.log('Cancelar');
                    }
                  },
                {
                  text: 'Modificar',
                  handler: (data) => {
                    console.log(data);
                    if (data.titulo.length === 0){
                      return;
                    }
                    lista.titulo = data.titulo;
                    this.deseosService.guardarStorage();
                    this.lista.closeSlidingItems();
                    // Hay que crear la lista
                   // this.router.navigateByUrl(`/tabs/tab1/agregar/${ listaId }`);
                  }
                }
                ]
                });
                alert2.present();
              }

listaSeleccionada(lista: Lista){

  if (this.terminada){
    this.router.navigateByUrl(`/tabs/tab2/agregar/${ lista.id }`);
  }
    else {this.router.navigateByUrl(`/tabs/tab1/agregar/${ lista.id }`);
  }
}



borrarLista(lista: Lista){

  this.deseosService.borrarLista(lista);

}


}

