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
    path: 'menu',
    loadChildren: () => import('./menu/menu.module').then( m => m.MenuPageModule)
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
    path: 'edit-profile-page',
    loadChildren: () => import('./edit-profile-page/edit-profile-page.module').then( m => m.EditProfilePagePageModule)
  },
  {
    path: 'doctor-edit-profile',
    loadChildren: () => import('./doctor-edit-profile/doctor-edit-profile.module').then( m => m.DoctorEditProfilePageModule)
  },
  {
    path: 'doctor-landing',
    loadChildren: () => import('./doctor-landing/doctor-landing.module').then( m => m.DoctorLandingPageModule)
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
    path: 'patient-landing',
    loadChildren: () => import('./patient-landing/patient-landing.module').then( m => m.PatientLandingPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
