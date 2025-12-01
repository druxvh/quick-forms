import Navbar from '@/components/Navbar';
import { ReactNode } from 'react';

export default function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <div className="bg-background flex max-h-screen min-h-screen min-w-full flex-col">
            <Navbar />
            <main className="mx-auto flex w-full max-w-7xl grow">{children}</main>
        </div>
    );
}
