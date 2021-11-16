import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PatientDoctorfeedbackPage } from './patient-doctorfeedback.page';

describe('PatientDoctorfeedbackPage', () => {
  let component: PatientDoctorfeedbackPage;
  let fixture: ComponentFixture<PatientDoctorfeedbackPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientDoctorfeedbackPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PatientDoctorfeedbackPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
