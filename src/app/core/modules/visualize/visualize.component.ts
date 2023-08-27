import { Component } from '@angular/core';
import { ProductsService, productsModels } from '../../services/products.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-visualize',
  templateUrl: './visualize.component.html',
  styleUrls: ['./visualize.component.scss']
})
export class VisualizeComponent {

  productData!: productsModels[];
  productDataAll!: productsModels[];
  dataIsSearch: productsModels[] = [];
  selectIndex!: number;
  hiddenMenu = false;
  public pages: number[] = [];
  public deleteId: [{id: any}] = [{id: undefined}];
  numberResult = 0;

  constructor(private productsService: ProductsService) {
      this.getRegisterProducts();
  }

  getRegisterProducts(){
    this.productsService.getAllProducts().subscribe((response: productsModels[]) => {
      let arrayIdDelete: any = localStorage.getItem('deleteRegister');
      if (arrayIdDelete) {
        arrayIdDelete = JSON.parse(arrayIdDelete);
        arrayIdDelete.forEach( (value: any) => {
          this.deleteId.push({id:  value.id})
        }); 
      }
      if (this.deleteId) {
        this.deleteId.forEach( (value: any) => {
          if (value.id) {
          response = response.filter((item) => {
            return item.id  !== value.id;
           } );
        }
      }); 
      }
      this.productDataAll = response;
      this.numberResult =  this.productDataAll.length;
      this.numberPages(this.productDataAll);
      this.productData = response.slice(0, 5);
    });
  }


  numberPages(data:productsModels[] ){
    let numberOfPages = Math.ceil(data.length / 5);
    let pages = Array.from({ length: numberOfPages }, (v, i) => i + 1);
    this.pages = pages;
  }

  activeActions(index: number) {
    this.hiddenMenu = !this.hiddenMenu;
    this.selectIndex = index;
  }


  deleteRegister(authorId: string) {
    this.hiddenMenu = false;
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: '¿Está seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '¡Sí, bórralo!',
      cancelButtonText: '¡No, cancelar!',
      reverseButtons: true
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.productsService.verifiqueProducts(authorId).subscribe((response: any) => {
          if (response) {
            this.productsService.deleteProducts(authorId).subscribe({
              next: () => {
                swalWithBootstrapButtons.fire(
                  '¡Eliminado!',
                  'Su registro ha sido eliminado.',
                  'success'
                );
              }, error: (err) => {
                  console.log('%cX Error', 'color: #cc3333', err.error);
                  this.deleteId.push({id: authorId});
                  localStorage.setItem('deleteRegister', JSON.stringify(this.deleteId));
                  this.productDataAll = this.productDataAll.filter((item) => item.id !== authorId);
                  this.numberPages(this.productDataAll);
                  this.numberResult =  this.productDataAll.length;
                  this.productData =  this.productDataAll.slice(0, 5);
                },
            });
          }
        });

      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelada',
          'Tu registro está a salvo',
          'error'
        )
      }
    })
  }

  onSelectedPaginate(value: string, dataIsSearch?: productsModels[]): void {
    let totalRegister;
    this.hiddenMenu = false;
    if (dataIsSearch!.length > 2) {
      totalRegister =dataIsSearch;
    } else {
      totalRegister = this.productDataAll;
    }
    this.productData = totalRegister!.slice((parseInt(value) * 5) - 5, parseInt(value) * 5);
  }

  searchFunc(event: any) {
    if (event.target.value.length > 2) {
      this.dataIsSearch = this.productDataAll.filter((obj) =>
        obj.name.toLowerCase().includes(event.target.value.toLowerCase()) ||
        obj.description.toLowerCase().includes(event.target.value.toLowerCase())
      );
      this.numberResult =  this.dataIsSearch .length;
      this.numberPages(  this.dataIsSearch );
      this.productData =  this.dataIsSearch .slice(0, 5);
    } else if (event.target.value.length < 1) {
      this.dataIsSearch = [];
      const totalRegister = this.productDataAll;
      this.productData = totalRegister.slice(0, 5);
      this.numberResult =  this.productDataAll.length;
      this.numberPages(this.productDataAll);
    }
  }

}
