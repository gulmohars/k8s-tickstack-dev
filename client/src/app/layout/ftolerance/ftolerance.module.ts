import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FtoleranceComponent } from './ftolerance.component';
import { FtoleranceRoutinModule } from './ftolerance-routing.module';
import { PageHeaderModule } from '../../shared';
import { AgmCoreModule } from '@agm/core';

@NgModule({
    imports: [
        CommonModule,
        PageHeaderModule,
        FtoleranceRoutinModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyB9XWG3lA9vKqovF-ZyWcoA72jNWkx5ZDM'
        })],
    declarations: [FtoleranceComponent]
})
export class FtoleranceModule { }
