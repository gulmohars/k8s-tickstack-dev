import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FtoleranceComponent } from './ftolerance.component';

const routes: Routes = [
    {
        path: '', component: FtoleranceComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FtoleranceRoutinModule {
}