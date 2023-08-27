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
  selectIndex!: number;
  hiddenMenu = false;
  public pages: number[] = [];

  constructor(private productsService: ProductsService,) {

    this.productsService.getAllProducts().subscribe((response: productsModels[]) => {
      this.productDataAll = response;
      let numberOfPages = Math.ceil(response.length / 5);
      let pages = Array.from({ length: numberOfPages }, (v, i) => i + 1);
      this.pages = pages;
      this.productData = response.slice(0, 5);
    });
  }

  activeActions(index: number) {
    this.hiddenMenu = !this.hiddenMenu;
    this.selectIndex = index;
  }

  editRegister(authorId: string) {
    this.hiddenMenu = false;
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
            this.productsService.deleteProducts(authorId).subscribe((response: any) => {
              console.log('%c⧭ deleteProducts', 'color: #997326', response);
              if (response) {
                swalWithBootstrapButtons.fire(
                  '¡Eliminado!',
                  'Su registro ha sido eliminado.',
                  'success'
                )
              }
            }, err => {
              swalWithBootstrapButtons.fire(
                'Oops..',
                '¡Algo salió mal!',
                'error'
              )
              const deleteBasi = this.productDataAll.filter((item) => item.id !== authorId)
              this.productData = deleteBasi.slice(0, 5);
            })
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

  onSelected(value: string): void {
    const totalRegister = this.productDataAll;
    this.productData = totalRegister.slice((parseInt(value) * 5) - 5, parseInt(value) * 5);
  }


  keyFunc(event: any) {
    if (event.target.value.length > 2) {
      let valuexShear = this.productDataAll.filter((obj) =>
        obj.name.toLowerCase().includes(event.target.value.toLowerCase()) ||
        obj.description.toLowerCase().includes(event.target.value.toLowerCase())
      );
      this.productData = valuexShear;
    } else if (event.target.value.length < 1) {
      const totalRegister = this.productDataAll;
      let numberOfPages = Math.ceil(totalRegister.length / 5);
      let pages = Array.from({ length: numberOfPages }, (v, i) => i + 1);
      this.pages = pages;
      this.productData = totalRegister.slice(0, 5);
    }
  }

}
