import * as z from "zod"

export const createFormSchema = z.object({
    name: z.string()
        .trim()
        .min(2, "Name must be at least 2 characters")
        .max(50, "Name cannot exceed 50 characters "),

    description: z.string()
        .trim()
        .max(100, "Description cannot exceed 100 characters ")
        .optional(),
})

export type createFormSchemaT = z.infer<typeof createFormSchema>