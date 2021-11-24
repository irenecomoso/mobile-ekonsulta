import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PatientToDoctorFeedbackPage } from './patient-to-doctor-feedback.page';

describe('PatientToDoctorFeedbackPage', () => {
  let component: PatientToDoctorFeedbackPage;
  let fixture: ComponentFixture<PatientToDoctorFeedbackPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientToDoctorFeedbackPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PatientToDoctorFeedbackPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
