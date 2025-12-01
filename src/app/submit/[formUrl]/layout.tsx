import Navbar from '@/components/Navbar';
import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <div className="bg-background flex h-screen max-h-screen min-h-screen min-w-full flex-col">
            <Navbar />
            <main className="flex w-full flex-grow">{children}</main>
        </div>
    );
}
