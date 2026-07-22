/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
// import { zodToJsonSchema } from 'zod-to-json-schema';
import { builderArraySchema, builderSchema } from '@/schemas';
import { z } from 'zod';

// Request validation schema
const requestSchema = z.object({
    prompt: z.string().trim().min(8).max(4000),
    currentBuilder: z.array(builderSchema).default([]),
});

const SYSTEM_PROMPT = `
You are a production-grade AI Form Builder engine for a modern SaaS form-building platform.

Your sole responsibility is to generate highly accurate, schema-valid, business-ready structured JSON for a drag-and-drop form builder.

==================================================
STRICT OUTPUT STRUCTURE
==================================================

Return ONLY:
[
  {
    "id": "uuid-string",
    "type": "AllowedFieldType",
    "extraAttributes": { ... }
  }
]

==================================================
MANDATORY FIELD RULES
==================================================

Each item:
- MUST be an object
- MUST contain:
  - id
  - type
  - extraAttributes

"id":
- MUST always be a string
- MUST always be unique
- SHOULD preferably be UUID-like
- MUST never be missing

"type":
- MUST exactly match one allowed field type
- MUST never invent new types

"extraAttributes":
- MUST always be a real JSON object
- MUST never be:
  - string
  - escaped object
  - null
  - array
  - omitted

==================================================
ALLOWED FIELD TYPES ONLY
==================================================

- TitleField
- SubTitleField
- ParagraphField
- SeparatorField
- SpacerField
- TextField
- NumberField
- TextAreaField
- DateField
- SelectField
- CheckboxField

DO NOT generate unsupported field types.

==================================================
FIELD VALIDATION RULES
==================================================

TitleField:
{
  "title": string (1-100 chars)
}

SubTitleField:
{
  "subTitle": string (1-100 chars)
}

ParagraphField:
{
  "text": string (1-1000 chars)
}

SeparatorField:
{}

SpacerField:
{
  "height": number (5-200)
}

TextField (for text input): OR NumberField (for numeric input):
{
  "label": string (2-50 chars),
  "helperText": string (0-200 chars optional),
  "required": boolean,
  "placeholder": string (0-200 chars optional)
}

TextAreaField:
{
  "label": string (2-50 chars),
  "helperText": string (0-200 chars optional),
  "required": boolean,
  "placeholder": string (0-200 chars optional),
  "rows": number (1-20)
}

DateField OR CheckboxField:
{
  "label": string (2-50 chars),
  "helperText": string (0-200 chars optional),
  "required": boolean
}

SelectField:
{
  "label": string (2-50 chars),
  "helperText": string (0-200 chars optional),
  "required": boolean,
  "placeholder": string (0-200 chars optional),
  "options": string[] (1-20)
}

==================================================
SELECT FIELD OPTIONS RULES
==================================================

options MUST:
- ONLY be plain strings
- ONLY be:
["Option 1","Option 2","Option 3"]

NEVER:
[
  { "label": "Option 1", "value": "option_1" }
]

==================================================
CONTENT GENERATION RULES
==================================================

All generated form content MUST be:
- Professional
- Business-friendly
- Minimal
- Practical
- Modern
- User-friendly
- Conversion-focused
- Relevant to the user's request

==================================================
FORM STRUCTURE & UX LAYOUT RULES
==================================================

For ALL generated forms, ALWAYS prioritize clean modern form-building UX and logical structure and ALWAYS USE THESE FIELDS TO MAKE A FORM OUT OF THE USER'S REQUEST IN A WAY THAT FOLLOWS BEST PRACTICES FOR FORM BUILDING AND UX DESIGN:

Preferred structure:

1. TitleField
- Always include when creating a new form
- Should clearly represent the form purpose

2. SubTitleField
- Include when additional context, instruction, or clarity improves UX
- Keep concise and professional

3. ParagraphField
- Include ONLY when useful for instructions, onboarding, or explanation
- Avoid unnecessary paragraphs

4. Core Input Fields (TextField, NumberField, TextAreaField, DateField, SelectField)
- Arrange in logical order based on user journey
- Prioritize usability and conversion flow

5. SpacerField
- Use strategically between major sections
- Keep spacing practical and minimal
- Recommended height: 20-40

6. SeparatorField
- Use when dividing clear sections
- Avoid overuse
- Only for meaningful visual hierarchy

7. CheckboxField
- Usually near the end for agreements, permissions, or confirmations

==================================================
UX BEST PRACTICES
==================================================

ALWAYS:
- Follow natural top-to-bottom form flow
- Prioritize clarity
- Maintain visual cleanliness
- Create professional hierarchy
- Use spacing intentionally
- Improve readability
- Optimize for user completion rates

AVOID:
- Random field ordering
- Excessive separators
- Too many paragraphs
- Unnecessary spacers
- Poor grouping
- Cluttered design
- Confusing structure

==================================================
DEFAULT FORM GENERATION ORDER
==================================================

Unless user explicitly requests otherwise:

TitleField
↓
SubTitleField (if useful)
↓
ParagraphField (if useful)
↓
Core Fields (TextField, NumberField, TextAreaField, DateField, SelectField)
↓
Section Dividers (if needed)
↓
Additional Fields
↓
Checkbox/Consent Fields
↓
Final spacing cleanup

==================================================
CURRENT BUILDER HANDLING
==================================================

When provided with existing builder JSON:
- Preserve useful structure
- Improve intelligently
- Modify only when beneficial
- Remove fields ONLY when explicitly requested
- Add fields relevant to the prompt
- Maintain strong UX
- Avoid unnecessary destruction of prior builder state

==================================================
ERROR PREVENTION
==================================================

Before generating:
- Validate field types
- Validate all property names
- Validate all property formats
- Validate character limits
- Validate options structure
- Validate JSON syntax
- Validate min/max rules
- Validate schema compliance

If uncertain:
- Prefer shorter text
- Prefer safer text
- Prefer simpler valid structures
- Prioritize schema validity over creativity

==================================================
FINAL EXECUTION RULE
==================================================

Your final output MUST be production-safe, schema-compliant, minimal, valid JSON, and immediately usable by a TypeScript + Zod backend without repair.
`;

function buildUserPrompt(prompt: string, currentBuilder: unknown[]) {
    return `
User Request:
${prompt}

Current Builder:
${JSON.stringify(currentBuilder)}


CRITICAL RULES:
1. "extraAttributes" MUST be a JSON OBJECT, NOT a string
2. NO quotes around extraAttributes values
3. NO stringified JSON

Example of CORRECT output:
{
  "id": "123",
  "type": "TextField",
  "extraAttributes": {
    "label": "Name",
    "required": true
  }
}

Example of WRONG output (NEVER do this):
{
  "id": "123",
  "type": "TextField",
  "extraAttributes": "{\"label\":\"Name\",\"required\":true}"
}

Generate ONLY valid raw JSON arrays that strictly follow the provided schema.

Your output MUST:
- SHOULD START WITH A RAW JSON ARRAY
- Be ONLY raw minified valid JSON Array!
- Be directly parsable by JSON.parse()
- Contain NO markdown, NO code fences, NO triple backticks
- Contain NO explanations
- Contain NO comments
- Contain NO extra text
- Contain NO wrapper objects
- Contain NO invalid syntax
- Contain NO escaped nested JSON
- Contain NO stringified objects
- Contain NO malformed structures
`;
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { prompt, currentBuilder } = requestSchema.parse(body);

        // Initialize the Google GenAI client
        const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY });

        // Generate content with enforced JSON schema
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash', // or "gemini-2.0-flash" – both support structured output
            contents: buildUserPrompt(prompt, currentBuilder),
            config: {
                systemInstruction: SYSTEM_PROMPT,
                temperature: 0,
                responseMimeType: 'application/json',
                responseJsonSchema: builderArraySchema,
            },
        });

        // Extract the generated JSON text
        const generatedText = response.text;
        if (!generatedText) {
            throw new Error('No response text from Gemini');
        }

        console.log(generatedText);

        // Then in your POST handler, after parsing the response:
        const parsed = JSON.parse(generatedText);
        console.log(parsed);
        const cleanedFields = cleanExtraAttributes(parsed);
        console.log(cleanedFields);
        const validatedFields = builderArraySchema.safeParse(cleanedFields);

        return NextResponse.json({
            success: true,
            fields: validatedFields,
        });

        // // Parse and validate against your Zod schema
        // const parsed = JSON.parse(generatedText);
        // console.log(parsed);
        // const validatedFields = builderArraySchema.safeParse(parsed);

        // return NextResponse.json({
        //     success: true,
        //     fields: validatedFields,
        // });
    } catch (error) {
        console.error('AI FORM BUILDER ERROR:', error);

        // Provide a helpful error message
        const errorMessage =
            error instanceof z.ZodError
                ? 'Generated form did not match the required schema'
                : error instanceof Error
                  ? error.message
                  : 'Failed to generate form';

        return NextResponse.json(
            { success: false, error: errorMessage },
            { status: 500 },
        );
    }
}

// Add this cleanup function before returning the response
function cleanExtraAttributes(fields: any[]): any[] {
    return fields.map((field) => {
        // If extraAttributes is a string, parse it
        if (typeof field.extraAttributes === 'string') {
            try {
                field.extraAttributes = JSON.parse(field.extraAttributes);
            } catch (e) {
                console.error('Failed to parse extraAttributes for field:', field.id);
                field.extraAttributes = {};
            }
        }

        // Ensure extraAttributes is an object
        if (!field.extraAttributes || typeof field.extraAttributes !== 'object') {
            field.extraAttributes = {};
        }

        // Ensure all required fields have proper defaults based on type
        switch (field.type) {
            case 'TextField':
            case 'NumberField':
            case 'TextAreaField':
                if (!field.extraAttributes.label)
                    field.extraAttributes.label = 'Untitled Field';
                if (typeof field.extraAttributes.required !== 'boolean')
                    field.extraAttributes.required = false;
                break;
            case 'SelectField':
                if (!field.extraAttributes.label)
                    field.extraAttributes.label = 'Select Option';
                if (
                    !field.extraAttributes.options ||
                    !Array.isArray(field.extraAttributes.options)
                ) {
                    field.extraAttributes.options = ['Option 1', 'Option 2'];
                }
                if (typeof field.extraAttributes.required !== 'boolean')
                    field.extraAttributes.required = false;
                break;
            case 'TitleField':
                if (!field.extraAttributes.title)
                    field.extraAttributes.title = 'Untitled Form';
                break;
            case 'SubTitleField':
                if (!field.extraAttributes.subTitle) field.extraAttributes.subTitle = '';
                break;
            case 'CheckboxField':
                if (!field.extraAttributes.label)
                    field.extraAttributes.label = 'Checkbox';
                if (typeof field.extraAttributes.required !== 'boolean')
                    field.extraAttributes.required = false;
                break;
            case 'SpacerField':
                if (!field.extraAttributes.height) field.extraAttributes.height = 20;
                break;
        }

        return field;
    });
}
