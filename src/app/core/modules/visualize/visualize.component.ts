import { Component } from '@angular/core';
import { ProductsService, productsModels } from '../../services/products.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-visualize',
  templateUrl: './visualize.component.html',
  styleUrls: ['./visualize.component.scss']
})
export class VisualizeComponent {

productData!:productsModels[];


constructor(private productsService: ProductsService){

  // let formData = {
  //   id: ' trj-crd2',
  //   name: 'Tarjetas de Crédito',
  //   description: 'Tarjeta de consumo bajo la modalidad de crédito',
  //   logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
  //   date_release:  '2023-02-01',
  //   date_revision: '2024-02-01',
  // }

  // this.productsService.createProducts(formData).subscribe((response) => {
  // console.log('%c⧭', 'color: #aa00ff', response);
  
  //   });

  this.productsService.getAllProducts().subscribe((response: productsModels[]) => {
    console.log('%c⧭', 'color: #00a3cc', response);
    this.productData = response;
    });




}
}
