import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PatientToLabPartnerFeedbackPage } from './patient-to-lab-partner-feedback.page';

describe('PatientToLabPartnerFeedbackPage', () => {
  let component: PatientToLabPartnerFeedbackPage;
  let fixture: ComponentFixture<PatientToLabPartnerFeedbackPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientToLabPartnerFeedbackPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PatientToLabPartnerFeedbackPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
