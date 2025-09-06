import { CheckboxField } from "./fields/CheckboxField/CheckboxField";
import { DateField } from "./fields/DateField/DateField";
import { NumberField } from "./fields/NumberField/NumberField";
import { ParagraphField } from "./fields/ParagraphField/ParagraphField";
import { SelectField } from "./fields/SelectField/SelectField";
import { SeparatorField } from "./fields/SeparatorField/SeparatorField";
import { SpacerField } from "./fields/SpacerField/SpacerField";
import { SubTitleFieldFormElement } from "./fields/SubTitleField/SubtitleField";
import { TextAreaField } from "./fields/TextAreaField/TextAreaField";
import { TextFieldFormElement } from "./fields/TextField/TextField";
import { TitleFieldFormElement } from "./fields/TitleField/TitleField";

export type ElementsType = "TextField"
    | "TitleField"
    | "NumberField"
    | "SubTitleField"
    | "ParagraphField"
    | "SeparatorField"
    | "SpacerField"
    | "TextAreaField"
    | "DateField"
    | "SelectField"
    | "CheckboxField"

export type SubmitFunction = (key: string, value: string) => void

export type FormElement = {
    type: ElementsType;

    construct: (id: string) => FormElementInstance;

    designerBtnElement: {
        icon: React.ElementType;
        label: string;
    }

    designerComponent: React.FC<{
        elementInstance: FormElementInstance
    }>;
    formComponent: React.FC<{
        elementInstance: FormElementInstance;
        submitValue?: (key: string, value: string) => void
        isInvalid?: boolean
        defaultValue?: string
    }>;
    propertiesComponent: React.FC<{
        elementInstance: FormElementInstance
    }>;

    validate: (formElement: FormElementInstance, value: string) => boolean
}

export type FormElementInstance = {
    id: string;
    type: ElementsType;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    extraAttributes?: Record<string, any>
}

type FormElementsType = {
    [key in ElementsType]: FormElement;
}

export const FormElements: FormElementsType = {
    TextField: TextFieldFormElement,
    TitleField: TitleFieldFormElement,
    SubTitleField: SubTitleFieldFormElement,
    ParagraphField: ParagraphField,
    SeparatorField: SeparatorField,
    SpacerField: SpacerField,
    NumberField: NumberField,
    TextAreaField: TextAreaField,
    DateField: DateField,
    SelectField: SelectField,
    CheckboxField: CheckboxField
}