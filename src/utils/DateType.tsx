import {GenericIdentifierType} from "./GenericIdentifierType";
import {FunctionalComponent, h} from "@stencil/core";

export class DateType extends GenericIdentifierType{

  private _date: Date;

  getSettingsKey(): string {
    return "DateType";
  }

  hasCorrectFormat(): boolean {
    const regex = new RegExp('^([0-9]{4})-([0]?[1-9]|1[0-2])-([0-2][0-9]|3[0-1])(T([0-1][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9](.[0-9]*)?(Z|([+|-]([0-1][0-9]|2[0-3]):[0-5][0-9])){1}))$')
    return regex.test(this.value)
  }

  init(): Promise<void> {
    this._date = new Date(this.value);
    return Promise.resolve(undefined);
  }

  isResolvable(): boolean {
    return false;
  }

  renderBody(): FunctionalComponent<any> {
    return undefined;
  }

  renderPreview(): FunctionalComponent<any> {
    return (
      <span>{this._date.toLocaleString()}</span>
    )
  }

}