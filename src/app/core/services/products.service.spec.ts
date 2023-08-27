import { TestBed, TestComponentRenderer } from '@angular/core/testing';

import { ProductsService } from './products.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {  HttpClientModule} from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

xdescribe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: 
      [
        RouterTestingModule,
        HttpClientTestingModule, 
        HttpClientModule,
        
      ], 
      providers:   [ProductsService,
        { provide: TestComponentRenderer, useClass: TestComponentRenderer }
      ],
      declarations: [ProductsService]
    });
    service = TestBed.inject(ProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});


