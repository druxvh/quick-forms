'use client';

import { SquareCheckBig } from 'lucide-react';
import {
    ElementsType,
    FieldInstance,
    FormElement,
    FormElementInstance,
    getDefaultAttributes,
} from '@/types/form';
import DesignerComponent from './DesignerComponent';
import FormComponent from './FormComponent';
import PropertiesComponent from './PropertiesComponent';

const type: ElementsType = 'CheckboxField';

export const CheckboxField: FormElement = {
    type,
    construct: (id: string) => ({
        id,
        type,
        extraAttributes: getDefaultAttributes(type),
    }),
    designerBtnElement: {
        icon: SquareCheckBig,
        label: 'Checkbox Field',
    },
    designerComponent: DesignerComponent,
    formComponent: FormComponent,
    propertiesComponent: PropertiesComponent,

    validate: (formElement: FormElementInstance, value: string): boolean => {
        const element = formElement as FieldInstance<'CheckboxField'>;
        const { required } = element.extraAttributes;
        if (required) {
            return value === 'true';
        }
        return true;
    },
};
