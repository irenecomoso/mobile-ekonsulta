import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PatientInsurancefeedbackPage } from './patient-insurancefeedback.page';

describe('PatientInsurancefeedbackPage', () => {
  let component: PatientInsurancefeedbackPage;
  let fixture: ComponentFixture<PatientInsurancefeedbackPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientInsurancefeedbackPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PatientInsurancefeedbackPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
