import * as z from 'zod';

// Text Field
export const textFieldSchema = z.object({
    label: z
        .string()
        .min(2, 'Label must be at least 2 characters')
        .max(50, 'Label cannot exceed 50 characters'),
    helperText: z
        .string()
        .max(200, 'Helper text cannot exceed 200 characters')
        .optional(),
    required: z.boolean().default(false),
    placeholder: z.string().max(50, 'Placeholder cannot exceed 50 characters').optional(),
});

// Number Field
export const numberFieldSchema = z.object({
    label: z
        .string()
        .min(2, 'Label must be at least 2 characters')
        .max(50, 'Label cannot exceed 50 characters'),
    helperText: z
        .string()
        .max(200, 'Helper text cannot exceed 200 characters')
        .optional(),
    required: z.boolean().default(false),
    placeholder: z.string().max(50, 'Placeholder cannot exceed 50 characters').optional(),
});

// Text Area Field
export const textAreaFieldSchema = z.object({
    label: z
        .string()
        .min(2, 'Label must be at least 2 characters')
        .max(50, 'Label cannot exceed 50 characters'),
    helperText: z
        .string()
        .max(200, 'Helper text cannot exceed 200 characters')
        .optional(),
    required: z.boolean().default(false),
    placeholder: z.string().max(50, 'Placeholder cannot exceed 50 characters').optional(),
    rows: z
        .number()
        .min(1, 'Must have at least 1 row')
        .max(20, 'Cannot exceed 20 rows')
        .default(3),
});

// Date Field
export const dateFieldSchema = z.object({
    label: z
        .string()
        .min(2, 'Label must be at least 2 characters')
        .max(50, 'Label cannot exceed 50 characters'),
    helperText: z
        .string()
        .max(200, 'Helper text cannot exceed 200 characters')
        .optional(),
    required: z.boolean().default(false),
});

// Select Field
export const selectFieldSchema = z.object({
    label: z
        .string()
        .min(2, 'Label must be at least 2 characters')
        .max(50, 'Label cannot exceed 50 characters'),
    helperText: z
        .string()
        .max(200, 'Helper text cannot exceed 200 characters')
        .optional(),
    required: z.boolean().default(false),
    placeholder: z.string().max(50, 'Placeholder cannot exceed 50 characters').optional(),
    options: z
        .array(z.string())
        .min(1, 'At least one option is required')
        .max(20, 'Cannot exceed 20 options'),
});

// Checkbox Field
export const checkboxFieldSchema = z.object({
    label: z
        .string()
        .min(2, 'Label must be at least 2 characters')
        .max(50, 'Label cannot exceed 50 characters'),
    helperText: z
        .string()
        .max(200, 'Helper text cannot exceed 200 characters')
        .optional(),
    required: z.boolean().default(false),
});

// Title Field
export const titleFieldSchema = z.object({
    title: z
        .string()
        .min(1, 'Title is required')
        .max(100, 'Title cannot exceed 100 characters'),
});

// Subtitle Field
export const subTitleFieldSchema = z.object({
    subTitle: z
        .string()
        .min(1, 'Title is required')
        .max(100, 'Title cannot exceed 100 characters'),
});

// Paragraph Field
export const paragraphFieldSchema = z.object({
    text: z
        .string()
        .min(1, 'Text content is required')
        .max(1000, 'Text cannot exceed 1000 characters'),
});

// Spacer Field
export const spacerFieldSchema = z.object({
    height: z
        .number()
        .min(5, 'Height must be at least 5px')
        .max(200, 'Height cannot exceed 200px')
        .default(20),
});

// Separator Field
export const separatorFieldSchema = z.object({});

export type TextFieldSchemaT = z.infer<typeof textFieldSchema>;
export type NumberFieldSchemaT = z.infer<typeof numberFieldSchema>;
export type TextAreaFieldSchemaT = z.infer<typeof textAreaFieldSchema>;
export type DateFieldSchemaT = z.infer<typeof dateFieldSchema>;
export type SelectFieldSchemaT = z.infer<typeof selectFieldSchema>;
export type CheckboxFieldSchemaT = z.infer<typeof checkboxFieldSchema>;
export type TitleFieldSchemaT = z.infer<typeof titleFieldSchema>;
export type SubTitleFieldSchemaT = z.infer<typeof subTitleFieldSchema>;
export type ParagraphFieldSchemaT = z.infer<typeof paragraphFieldSchema>;
export type SpacerFieldSchemaT = z.infer<typeof spacerFieldSchema>;
export type SeparatorFieldSchemaT = z.infer<typeof separatorFieldSchema>;
