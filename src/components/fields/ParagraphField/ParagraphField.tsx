'use client';

import { Type } from 'lucide-react';
import { ElementsType, FormElement, getDefaultAttributes } from '@/types/form';
import DesignerComponent from './DesignerComponent';
import FormComponent from './FormComponent';
import PropertiesComponent from './PropertiesComponent';

const type: ElementsType = 'ParagraphField';

export const ParagraphField: FormElement = {
    type,
    construct: (id: string) => ({
        id,
        type,
        extraAttributes: getDefaultAttributes(type),
    }),
    designerBtnElement: {
        icon: Type,
        label: 'Paragraph Field',
    },
    designerComponent: DesignerComponent,
    formComponent: FormComponent,
    propertiesComponent: PropertiesComponent,

    validate: () => true,
};
