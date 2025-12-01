import React, { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
    return <div className="mx-auto flex w-full grow flex-col">{children}</div>;
}
