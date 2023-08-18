import {Parser} from "./Parser";

export class FoldableItem {
  private readonly _priority: number;
  private readonly _keyTitle: string;
  private readonly _value: string;

  private readonly _keyTooltip?: string;
  private readonly _keyLink?: string;
  private readonly _valueRegex?: RegExp;
  private readonly _doNOTFold?: boolean = true;
  private readonly _estimatedTypePriority: number = 0;
  private readonly _defaultToText: boolean = false;

  constructor(priority: number, keyTitle: string, value: string, keyTooltip?: string, keyLink?: string, valueRegex?: RegExp, valueIsFoldable?: boolean, defaultToText?: boolean) {
    this._priority = priority;
    this._keyTitle = keyTitle;
    this._value = value;
    this._keyTooltip = keyTooltip;
    this._keyLink = keyLink;
    this._valueRegex = valueRegex;
    this._doNOTFold = valueIsFoldable;
    this._defaultToText = defaultToText;
    if (defaultToText) this._estimatedTypePriority = Parser._dataTypes.length;
    else this._estimatedTypePriority = Parser.getEstimatedPriority(this._value);
  }

  get priority(): number {
    return this._priority;
  }

  get keyTitle(): string {
    return this._keyTitle;
  }

  get value(): string {
    return this._value;
  }

  get keyTooltip(): string {
    return this._keyTooltip;
  }

  get keyLink(): string {
    return this._keyLink;
  }

  get valueRegex(): RegExp {
    return this._valueRegex;
  }

  get doNOTFold(): boolean {
    return this._doNOTFold;
  }

  get estimatedTypePriority(): number {
    return this._estimatedTypePriority;
  }


  get defaultToText(): boolean {
    return this._defaultToText;
  }

  isValidValue(): boolean {
    return this._valueRegex.test(this._value);
  }
}