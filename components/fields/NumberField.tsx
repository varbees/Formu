import { MdNumbers } from 'react-icons/md';
import { ElementsType, FormElement } from '../FormElements';
const type: ElementsType = 'NumberField';

export const NumberFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes: {
      label: 'Number Field',
      helpertext: 'Helper Number',
      Required: false,
      placeholder: 'Value here...',
    },
  }),
  designerBtnElement: {
    icon: MdNumbers,
    label: 'Number Field',
  },
  designerComponent: () => <div>designer Comp</div>,
  formComponent: () => <div>form Comp</div>,

  properties: () => <div>Properties</div>,
};
