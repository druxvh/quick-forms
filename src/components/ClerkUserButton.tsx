'use client';

import { SignedIn, SignedOut, SignUpButton, UserButton } from '@clerk/nextjs';
import { Button } from './ui/button';

export default function ClerkUserButton() {
    return (
        <>
            <SignedOut>
                <SignUpButton>
                    <Button
                        variant={'default'}
                        className="cursor-pointer rounded-sm px-4 shadow-sm"
                    >
                        Sign Up
                    </Button>
                </SignUpButton>
            </SignedOut>
            <SignedIn>
                <UserButton />
            </SignedIn>
        </>
    );
}
