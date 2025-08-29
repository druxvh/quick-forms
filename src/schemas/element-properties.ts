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