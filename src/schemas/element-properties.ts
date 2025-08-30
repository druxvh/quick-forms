import * as z from "zod/v4"

export const elementPropertiesSchema = z.object({
    label: z.string().min(2).max(50),
    helperText: z.string().max(200),
    required: z.boolean(),
    placeHolder: z.string().max(50),
})

export type elementPropertiesSchemaType = z.infer<typeof elementPropertiesSchema>


export const titlePropsSchema = z.object({
    title: z.string()
})

export type titlePropsSchemaType = z.infer<typeof titlePropsSchema>


export const subTitlePropsSchema = z.object({
    subTitle: z.string()
})

export type subTitlePropsSchemaType = z.infer<typeof subTitlePropsSchema>


export const paragraphPropsSchema = z.object({
    text: z.string()
})

export type paragraphPropsSchemaType = z.infer<typeof paragraphPropsSchema>


export const spacerPropsSchema = z.object({
    height: z.number().min(5).max(200)
})

export type spacerPropsSchemaType = z.infer<typeof spacerPropsSchema>

export const textAreaPropsSchema = z.object({
    label: z.string().min(2).max(50),
    helperText: z.string().max(200),
    required: z.boolean(),
    placeHolder: z.string().max(50),
    rows: z.number().min(1).max(10)
})

export type textAreaPropsSchemaType = z.infer<typeof textAreaPropsSchema>
