export type FormStyle = {
    // This will drive buttons, checkboxes, focus rings, and active states
    primaryColor: string;

    bgColor: string;
    textColor: string;
    borderColor: string;

    spacing: number;

    borderRadius: number;
    buttonVariant: 'solid' | 'outline' | 'ghost';
    fontFamily: string;
}

// Default style – used when creating a new form
export const defaultFormStyle: Required<FormStyle> = {
    primaryColor: '#3b82f6',
    bgColor: '#ffffff',
    textColor: '#1f2937',
    borderColor: '#e5e7eb',
    spacing: 4,
    borderRadius: 4,

    buttonVariant: 'solid',

    fontFamily: 'Inter, sans-serif',
};
