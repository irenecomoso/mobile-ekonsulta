import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DoctorSetConsultationFeePage } from './doctor-set-consultation-fee.page';

describe('DoctorSetConsultationFeePage', () => {
  let component: DoctorSetConsultationFeePage;
  let fixture: ComponentFixture<DoctorSetConsultationFeePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorSetConsultationFeePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DoctorSetConsultationFeePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
