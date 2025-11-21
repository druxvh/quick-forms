import {
    checkboxFieldSchema,
    dateFieldSchema,
    numberFieldSchema,
    paragraphFieldSchema,
    selectFieldSchema,
    separatorFieldSchema,
    spacerFieldSchema,
    subTitleFieldSchema,
    textAreaFieldSchema,
    textFieldSchema,
    titleFieldSchema
} from './field-schemas'

// Exports
export type {
    TextFieldSchemaT,
    NumberFieldSchemaT,
    TextAreaFieldSchemaT,
    DateFieldSchemaT,
    SelectFieldSchemaT,
    CheckboxFieldSchemaT,
    TitleFieldSchemaT,
    SubTitleFieldSchemaT,
    ParagraphFieldSchemaT,
    SpacerFieldSchemaT,
    SeparatorFieldSchemaT,
} from "./field-schemas"

export const fieldSchemas = {
    TextField: textFieldSchema,
    NumberField: numberFieldSchema,
    TextAreaField: textAreaFieldSchema,
    DateField: dateFieldSchema,
    SelectField: selectFieldSchema,
    CheckboxField: checkboxFieldSchema,
    TitleField: titleFieldSchema,
    SubTitleField: subTitleFieldSchema,
    ParagraphField: paragraphFieldSchema,
    SpacerField: spacerFieldSchema,
    SeparatorField: separatorFieldSchema,
} as const;

export {
    checkboxFieldSchema,
    dateFieldSchema,
    numberFieldSchema,
    paragraphFieldSchema,
    selectFieldSchema,
    separatorFieldSchema,
    spacerFieldSchema,
    subTitleFieldSchema,
    textAreaFieldSchema,
    textFieldSchema,
    titleFieldSchema
} from './field-schemas'

export { createFormSchema, type createFormSchemaT } from './create-form-schema';

export { onboardFormSchema, type onboardFormSchemaT } from './onboarding-schema';