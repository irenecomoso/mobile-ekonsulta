/* eslint-disable max-len */
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'patient-profile',
    loadChildren: () => import('./patient-profile/patient-profile.module').then( m => m.PatientProfilePageModule)
  },
  {
    path: 'doctor-profile',
    loadChildren: () => import('./doctor-profile/doctor-profile.module').then( m => m.DoctorProfilePageModule)
  },
  {
    path: 'patient-register',
    loadChildren: () => import('./patient-register/patient-register.module').then( m => m.PatientRegisterPageModule)
  },
  {
    path: 'doctor-register',
    loadChildren: () => import('./doctor-register/doctor-register.module').then( m => m.DoctorRegisterPageModule)
  },
  {
    path: 'register-choice',
    loadChildren: () => import('./register-choice/register-choice.module').then( m => m.RegisterChoicePageModule)
  },
  {
    path: 'patient-chat-info',
    loadChildren: () => import('./patient-chat-info/patient-chat-info.module').then( m => m.PatientChatInfoPageModule)
  },
  {
    path: 'patient-consultation',
    loadChildren: () => import('./patient-consultation/patient-consultation.module').then( m => m.PatientConsultationPageModule)
  },
  {
    path: 'patient-doctor-chat',
    loadChildren: () => import('./patient-doctor-chat/patient-doctor-chat.module').then( m => m.PatientDoctorChatPageModule)
  },
  {
    path: 'patient-doctors-list',
    loadChildren: () => import('./patient-doctors-list/patient-doctors-list.module').then( m => m.PatientDoctorsListPageModule)
  },
  {
    path: 'patient-payment',
    loadChildren: () => import('./patient-payment/patient-payment.module').then( m => m.PatientPaymentPageModule)
  },
  {
    path: 'patient-transactionhistory',
    loadChildren: () => import('./patient-transactionhistory/patient-transactionhistory.module').then( m => m.PatientTransactionhistoryPageModule)
  },
  {
    path: 'patient-myrecords',
    loadChildren: () => import('./patient-myrecords/patient-myrecords.module').then( m => m.PatientMyrecordsPageModule)
  },
  {
    path: 'patient-notifications',
    loadChildren: () => import('./patient-notifications/patient-notifications.module').then( m => m.PatientNotificationsPageModule)
  },
  {
    path: 'doctor-consultation',
    loadChildren: () => import('./doctor-consultation/doctor-consultation.module').then( m => m.DoctorConsultationPageModule)
  },
  {
    path: 'doctor-patient-chat',
    loadChildren: () => import('./doctor-patient-chat/doctor-patient-chat.module').then( m => m.DoctorPatientChatPageModule)
  },
  {
    path: 'doctor-chat-info',
    loadChildren: () => import('./doctor-chat-info/doctor-chat-info.module').then( m => m.DoctorChatInfoPageModule)
  },
  {
    path: 'doctor-notifications',
    loadChildren: () => import('./doctor-notifications/doctor-notifications.module').then( m => m.DoctorNotificationsPageModule)
  },
  {
    path: 'patient-edit-profile',
    loadChildren: () => import('./patient-edit-profile/patient-edit-profile.module').then( m => m.PatientEditProfilePageModule)
  },
  {
    path: 'doctor-transactionhistory',
    loadChildren: () => import('./doctor-transactionhistory/doctor-transactionhistory.module').then( m => m.DoctorTransactionhistoryPageModule)
  },
  {
    path: 'doctor-patientanalytics',
    loadChildren: () => import('./doctor-patientanalytics/doctor-patientanalytics.module').then( m => m.DoctorPatientanalyticsPageModule)
  },
  {
    path: 'doctor-edit-profile',
    loadChildren: () => import('./doctor-edit-profile/doctor-edit-profile.module').then( m => m.DoctorEditProfilePageModule)
  },
  {
    path: 'doctor-patientprescription',
    loadChildren: () => import('./doctor-patientprescription/doctor-patientprescription.module').then( m => m.DoctorPatientprescriptionPageModule)
  },
  {
    path: 'doctor-feedback',
    loadChildren: () => import('./doctor-feedback/doctor-feedback.module').then( m => m.DoctorFeedbackPageModule)
  },
  {
    path: 'doctor-reviews',
    loadChildren: () => import('./doctor-reviews/doctor-reviews.module').then( m => m.DoctorReviewsPageModule)
  },
  {
    path: 'patient-choosefeedback',
    loadChildren: () => import('./patient-choosefeedback/patient-choosefeedback.module').then( m => m.PatientChoosefeedbackPageModule)
  },
  {
    path: 'patient-doctorfeedback',
    loadChildren: () => import('./patient-doctorfeedback/patient-doctorfeedback.module').then( m => m.PatientDoctorfeedbackPageModule)
  },
  {
    path: 'patient-labfeedback',
    loadChildren: () => import('./patient-labfeedback/patient-labfeedback.module').then( m => m.PatientLabfeedbackPageModule)
  },
  {
    path: 'patient-insurancefeedback',
    loadChildren: () => import('./patient-insurancefeedback/patient-insurancefeedback.module').then( m => m.PatientInsurancefeedbackPageModule)
  },
  {
    path: 'patient-edit-insurance',
    loadChildren: () => import('./patient-edit-insurance/patient-edit-insurance.module').then( m => m.PatientEditInsurancePageModule)
  },
  {
    path: 'patient-to-doctor-feedback',
    loadChildren: () => import('./patient-to-doctor-feedback/patient-to-doctor-feedback.module').then( m => m.PatientToDoctorFeedbackPageModule)
  },
  {
    path: 'patient-to-insurance-feedback',
    loadChildren: () => import('./patient-to-insurance-feedback/patient-to-insurance-feedback.module').then( m => m.PatientToInsuranceFeedbackPageModule)
  },
  {
    path: 'patient-to-lab-partner-feedback',
    loadChildren: () => import('./patient-to-lab-partner-feedback/patient-to-lab-partner-feedback.module').then( m => m.PatientToLabPartnerFeedbackPageModule)
  },
  {
    path: 'patient-delete-account',
    loadChildren: () => import('./patient-delete-account/patient-delete-account.module').then( m => m.PatientDeleteAccountPageModule)
  },
  {
    path: 'doctor-delete-account',
    loadChildren: () => import('./doctor-delete-account/doctor-delete-account.module').then( m => m.DoctorDeleteAccountPageModule)
  },
  {
    path: 'terms-and-conditions',
    loadChildren: () => import('./terms-and-conditions/terms-and-conditions.module').then( m => m.TermsAndConditionsPageModule)
  },
  {
    path: 'patient-doctors-list-view',
    loadChildren: () => import('./patient-doctors-list-view/patient-doctors-list-view.module').then( m => m.PatientDoctorsListViewPageModule)
  },
  {
    path: 'doctor-user-analytics',
    loadChildren: () => import('./doctor-user-analytics/doctor-user-analytics.module').then( m => m.DoctorUserAnalyticsPageModule)
  },  {
    path: 'patient-video-call',
    loadChildren: () => import('./patient-video-call/patient-video-call.module').then( m => m.PatientVideoCallPageModule)
  },
  {
    path: 'video-call',
    loadChildren: () => import('./video-call/video-call.module').then( m => m.VideoCallPageModule)
  },
  {
    path: 'doctor-medical-certificate',
    loadChildren: () => import('./doctor-medical-certificate/doctor-medical-certificate.module').then( m => m.DoctorMedicalCertificatePageModule)
  },
  {
    path: 'doctor-set-consultation-fee',
    loadChildren: () => import('./doctor-set-consultation-fee/doctor-set-consultation-fee.module').then( m => m.DoctorSetConsultationFeePageModule)
  },
  {
    path: 'doctor-edit-insurance',
    loadChildren: () => import('./doctor-edit-insurance/doctor-edit-insurance.module').then( m => m.DoctorEditInsurancePageModule)
  },
  {
    path: 'doctor-shared-files',
    loadChildren: () => import('./doctor-shared-files/doctor-shared-files.module').then( m => m.DoctorSharedFilesPageModule)
  },
  {
    path: 'patient-shared-files',
    loadChildren: () => import('./patient-shared-files/patient-shared-files.module').then( m => m.PatientSharedFilesPageModule)
  },
  {
    path: 'patient-cancel-consultation',
    loadChildren: () => import('./patient-cancel-consultation/patient-cancel-consultation.module').then( m => m.PatientCancelConsultationPageModule)
  },
  {
    path: 'medical-certificate',
    loadChildren: () => import('./medical-certificate/medical-certificate.module').then( m => m.MedicalCertificatePageModule)
  },





];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
