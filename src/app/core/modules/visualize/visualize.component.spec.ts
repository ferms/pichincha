import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VisualizeComponent } from './visualize.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import {  HttpClientModule } from '@angular/common/http';

describe('VisualizeComponent', () => {
  let component: VisualizeComponent;
  let fixture: ComponentFixture<VisualizeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        RouterModule,
        SweetAlert2Module.forRoot(),
        HttpClientModule
      ], 
      providers: [VisualizeComponent],
      declarations: [VisualizeComponent]
    });
    fixture = TestBed.createComponent(VisualizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
