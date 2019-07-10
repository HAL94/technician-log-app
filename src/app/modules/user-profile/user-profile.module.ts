import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared-modules/shared/shared.module';
import { UserProfileRoutingModule } from './user-profile-routing.module';

import { UserProfileComponent } from '../../components/user-profile/user-profile.component';
import { EditProfileComponent } from '../../components/user-profile/edit-profile/edit-profile.component';
import { ImageUploadModalComponent } from '../../components/user-profile/image-upload/image-file-modal/image-upload-modal.component';
import { ImageUploadComponent } from '../../components/user-profile/image-upload/image-upload.component';


@NgModule({
  declarations: [
    UserProfileComponent,
    EditProfileComponent,
    ImageUploadModalComponent,
    ImageUploadComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    UserProfileRoutingModule
  ],
  exports: [
    UserProfileComponent,
    EditProfileComponent,
    ImageUploadModalComponent,
    ImageUploadComponent
  ],
  entryComponents: [
    ImageUploadModalComponent
  ]
})
export class UserProfileModule { }
