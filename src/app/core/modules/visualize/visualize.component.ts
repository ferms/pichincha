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
selectIndex!: number;
hiddenMenu = false;

constructor(private productsService: ProductsService){

  this.productsService.getAllProducts().subscribe((response: productsModels[]) => {
    this.productData = response;
    });
}

  activeActions(index: number){
        this.hiddenMenu = !this.hiddenMenu ;
        this.selectIndex = index;
        
  }
}
