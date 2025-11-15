import type { Metadata } from 'next';
import { openSans, poppins } from '@/lib/fonts/fonts';
import './globals.css';
import ThemeProviderUI from '@/lib/theme/ThemeProviderUI';

export const metadata: Metadata = {
  title: 'Academika',
  description: 'Una plataforma de gestión académica eficiente y fácil de usar.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='es'>
      <body className={`${openSans.variable} ${poppins.variable} antialiased`}>
        <ThemeProviderUI>{children}</ThemeProviderUI>
      </body>
    </html>
  );
}
