import {
  HostBinding
} from '@angular/core';

export abstract class NgdsFormComp {
  constructor() {

  }

  abstract setValue(value: any): void;

  abstract onChange(): void;


  setCompValue(formValue: any, compKey: string, compValue: any): void {
    if (compValue === null||compValue === "") {
      formValue[compKey] = undefined;
    } else {
      formValue[compKey] = compValue;
    }
  }

  getChangeValue():any{
    return null;
  }

  @HostBinding('hidden')
  isHidden: boolean = false;

}