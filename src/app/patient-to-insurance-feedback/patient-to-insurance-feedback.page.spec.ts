import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PatientToInsuranceFeedbackPage } from './patient-to-insurance-feedback.page';

describe('PatientToInsuranceFeedbackPage', () => {
  let component: PatientToInsuranceFeedbackPage;
  let fixture: ComponentFixture<PatientToInsuranceFeedbackPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientToInsuranceFeedbackPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PatientToInsuranceFeedbackPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
