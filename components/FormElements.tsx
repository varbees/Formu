import { TextFieldFormElement } from './fields/TextField';
import { NumberFieldFormElement } from './fields/NumberField';

export type ElementsType = 'TextField' | 'NumberField';

export type FormElement = {
  type: ElementsType;
  construct: (id: string) => FormElementInstance;
  designerBtnElement: {
    icon: React.ElementType;
    label: string;
  };
  designerComponent: React.FC;
  formComponent: React.FC;
  properties: React.FC;
};

export type FormElementInstance = {
  id: string;
  type: ElementsType;
  extraAttributes?: Record<string, any>;
};

export type FormElementsType = {
  [key in ElementsType]: FormElement;
};

export const FormElements: FormElementsType = {
  TextField: TextFieldFormElement,
  NumberField: NumberFieldFormElement,
};

export default FormElements;
