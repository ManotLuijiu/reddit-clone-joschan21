import Navbar from '@/components/Navbar/Navbar';
import Providers from '@/components/Providers';
import { Toaster } from '@/components/ui/Toaster';
import { poppins } from '@/lib/fonts';
import { cn } from '@/lib/utils';
import '@/styles/globals.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'EstheteBoard',
    description: 'A Reddit clone built with Next.js and TypeScript.',
};

export default function RootLayout({
    children,
    authModal,
}: {
    children: React.ReactNode;
    authModal: React.ReactNode;
}) {
    return (
        <html
            lang="th"
            className={cn(
                'bg-esthete_cream text-slate-900 antialiased light',
                poppins.className,
            )}
        >
            <body className="min-h-screen pt-12 bg-esthete_cream antialiased">
                <Providers>
                    {/* @ts-expect-error Server Component*/}
                    <Navbar />
                    {authModal}

                    <div className="container max-w-7xl mx-auto h-full pt-12">
                        {children}
                    </div>
                </Providers>
                <Toaster />
            </body>
        </html>
    );
}
