import {
    CheckboxField,
    DateField,
    NumberField,
    ParagraphField,
    SelectField,
    SeparatorField,
    SpacerField,
    SubTitleField,
    TextAreaField,
    TextField,
    TitleField,
} from '@/components/fields';
import { fieldSchemas } from '@/schemas';
import { z } from 'zod';

/**
 * ElementsType is derived from schema registry
 * Makes a union of all the types and auto-updates from the registry
 */
export type ElementsType = keyof typeof fieldSchemas;

export type SubmitFunction = (key: string, value: string) => void;

/**
 * Map of attribute types for each element type (z.infer per schema)
 */
export type FieldAttributesMap = {
    [K in ElementsType]: z.infer<(typeof fieldSchemas)[K]>;
};

/**
 * Discriminated union of element instances
 */
export type FormElementInstanceMap = {
    [K in ElementsType]: {
        id: string;
        type: K;
        extraAttributes: FieldAttributesMap[K];
    };
};

export type FormElementInstance = FormElementInstanceMap[ElementsType];

/** Narrowed instance type for a specific field */
export type FieldInstance<T extends ElementsType> = Extract<
    FormElementInstance,
    { type: T }
>;

/**
 * Base FormElement
 */
export type FormElement = {
    type: ElementsType;
    construct: (id: string) => FormElementInstance;
    designerBtnElement: { icon: React.ElementType; label: string };
    designerComponent: React.FC<{ elementInstance: FormElementInstance }>;
    formComponent: React.FC<{
        elementInstance: FormElementInstance;
        submitValue?: (key: string, value: string) => void;
        isInvalid?: boolean;
        defaultValue?: string;
    }>;
    propertiesComponent: React.FC<{ elementInstance: FormElementInstance }>;
    validate: (formElement: FormElementInstance, value: string) => boolean;
};

// Makes each ElementType be of FormElement
type FormElementsType = {
    [key in ElementsType]: FormElement;
};

export const FormElements: FormElementsType = {
    TextField: TextField,
    TitleField: TitleField,
    SubTitleField: SubTitleField,
    ParagraphField: ParagraphField,
    SeparatorField: SeparatorField,
    SpacerField: SpacerField,
    NumberField: NumberField,
    TextAreaField: TextAreaField,
    DateField: DateField,
    SelectField: SelectField,
    CheckboxField: CheckboxField,
};

// Default values for each field type
export const defaultFieldAttributes = {
    TextField: {
        label: 'Text Field',
        helperText: 'Helper text',
        required: false,
        placeholder: 'Enter text here...',
    },
    NumberField: {
        label: 'Number Field',
        helperText: 'Helper text',
        required: false,
        placeholder: 'Enter a number...',
    },
    TextAreaField: {
        label: 'Text Area',
        helperText: 'Helper text',
        required: false,
        placeholder: 'Enter your text here...',
        rows: 3,
    },
    DateField: {
        label: 'Date Field',
        helperText: 'Helper text',
        required: false,
    },
    SelectField: {
        label: 'Select Field',
        helperText: 'Helper text',
        required: false,
        placeholder: 'Select an option...',
        options: ['Option 1', 'Option 2'],
    },
    CheckboxField: {
        label: 'Checkbox Field',
        helperText: 'Helper text',
        required: false,
    },
    TitleField: {
        title: 'Form Title',
    },
    SubTitleField: {
        subTitle: 'Form Subtitle',
    },
    ParagraphField: {
        text: 'This is a paragraph of text that will be displayed in your form.',
    },
    SpacerField: {
        height: 20,
    },
    SeparatorField: {},
} as const;

//Helper Functions

/**
 * Helper: runtime-safe getter for default attributes for a given element.
 * returns a deep clone so elements don't share a reference with defaults.
 */
export function getDefaultAttributes<T extends ElementsType>(
    type: T,
): FieldAttributesMap[T] {
    return JSON.parse(
        JSON.stringify(defaultFieldAttributes[type]),
    ) as FieldAttributesMap[T];
}

/**
 * Helper: validate a loaded instance's extraAttributes against the schema for safety.
 * Uses Zod to ensure runtime safety for older saved forms or broken data.
 * Throws if invalid (you can catch and fallback to defaults).
 */
export function validateInstanceAttributes(
    instance: FormElementInstance,
): FormElementInstance {
    const schema = fieldSchemas[instance.type];
    const parsed = schema.safeParse(instance.extraAttributes);
    if (!parsed.success) {
        // If invalid, we return a repaired instance using defaults
        return {
            ...instance,
            extraAttributes: getDefaultAttributes(instance.type),
        } as FormElementInstance;
    }
    return { ...instance, extraAttributes: parsed.data } as FormElementInstance;
}
