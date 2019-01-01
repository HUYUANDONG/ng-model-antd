import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DatagridDeepPropertyPipe } from './datagrid-deep-property.pipe';
export { DatagridDeepPropertyPipe } from './datagrid-deep-property.pipe';

import { DatagridDatePropertyPipe } from './datagrid-date-property.pipe';
export { DatagridDatePropertyPipe } from './datagrid-date-property.pipe';

@NgModule({ declarations: [DatagridDeepPropertyPipe,DatagridDatePropertyPipe], exports: [] })
export class NgdsPipeModule {
	static forRoot(): ModuleWithProviders { return { ngModule: NgdsPipeModule, providers: [DatagridDeepPropertyPipe,DatagridDatePropertyPipe] }; }
}
