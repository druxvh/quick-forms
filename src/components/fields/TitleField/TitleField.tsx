'use client';

import { Heading1 } from 'lucide-react';
import { ElementsType, FormElement, getDefaultAttributes } from '@/types/form';
import DesignerComponent from './DesignerComponent';
import FormComponent from './FormComponent';
import PropertiesComponent from './PropertiesComponent';

const type: ElementsType = 'TitleField';

export const TitleField: FormElement = {
    type,
    construct: (id: string) => ({
        id,
        type,
        extraAttributes: getDefaultAttributes(type),
    }),
    designerBtnElement: {
        icon: Heading1,
        label: 'Title Field',
    },
    designerComponent: DesignerComponent,
    formComponent: FormComponent,
    propertiesComponent: PropertiesComponent,

    validate: () => true,
};
