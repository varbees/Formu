import { MdTextFields } from 'react-icons/md';
import { ElementsType, FormElement } from '../FormElements';

const type: ElementsType = 'TextField';

export const TextFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes: {
      label: 'Text Field',
      helpertext: 'Helper Text',
      Required: false,
      placeholder: 'Value here...',
    },
  }),
  designerBtnElement: {
    icon: MdTextFields,
    label: 'Text Field',
  },
  designerComponent: () => <div>designer Comp</div>,
  formComponent: () => <div>form Comp</div>,

  properties: () => <div>Properties</div>,
};
