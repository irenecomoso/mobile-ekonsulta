import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DoctorMedicalCertificatePage } from './doctor-medical-certificate.page';

describe('DoctorMedicalCertificatePage', () => {
  let component: DoctorMedicalCertificatePage;
  let fixture: ComponentFixture<DoctorMedicalCertificatePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorMedicalCertificatePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DoctorMedicalCertificatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
