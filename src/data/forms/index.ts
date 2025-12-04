/**
 * --- DAL Principles: ---
 * 1. Only concerned with DB access (Prisma calls).
 * 2. Accepts all necessary data (e.g., userId) as arguments.
 * 3. Contains NO business logic (like form limits or bounce rate calculation).
 * 4. Contains NO Next.js specific imports (like 'next/cache').
 */

export * from './aggregate-form-stats';
export * from './create-form';
export * from './delete-form';
export * from './get-all-user-forms';
export * from './get-form-by-id';
export * from './get-form-by-userId';
export * from './get-form-content';
export * from './get-form-count';
export * from './get-form-submissions';
export * from './update-publish-form';
export * from './update-form-content';
export * from './submit-form-submission';
