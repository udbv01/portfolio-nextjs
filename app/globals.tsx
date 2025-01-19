import '../styles/globals.css';

export const metadata = {
  title: 'MDAA',
  description: 'Mdaaa',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
