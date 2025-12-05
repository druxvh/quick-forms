import Navbar from '@/components/shared/Navbar';
import { ReactNode } from 'react';

export default function FormsLayout({ children }: { children: ReactNode }) {
    return (
        <div className="bg-background flex max-h-screen min-h-screen min-w-full flex-col">
            <Navbar />
            <main className="flex w-full grow">{children}</main>
        </div>
    );
}
