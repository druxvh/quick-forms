import { NumberField } from "./fields/NumberField";
import { ParagraphField } from "./fields/ParagraphField";
import { SeparatorField } from "./fields/Separator";
import { SpacerField } from "./fields/SpacerField";
import { SubTitleFieldFormElement } from "./fields/SubtitleField";
import { TextFieldFormElement } from "./fields/TextField";
import { TitleFieldFormElement } from "./fields/TitleField";

export type ElementsType = "TextField"
    | "TitleField"
    | "NumberField"
    | "SubTitleField"
    | "ParagraphField"
    | "SeparatorField"
    | "SpacerField"

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
    NumberField: NumberField
}