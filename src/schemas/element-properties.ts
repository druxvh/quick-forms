import * as z from "zod/v4"

export const elementPropertiesSchema = z.object({
    label: z.string().min(2).max(50),
    helperText: z.string().max(200),
    required: z.boolean(),
    placeHolder: z.string().max(50),
})

export type elementPropertiesSchemaType = z.infer<typeof elementPropertiesSchema>