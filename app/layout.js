export const metadata = {
  title: 'ShipLog - Ship faster, document smarter',
  description: 'AI-powered changelog generator that connects to GitHub and auto-writes your release notes. Stop context-switching. Start shipping.',
  openGraph: {
    title: 'ShipLog - Ship faster, document smarter',
    description: 'AI-powered changelog generator that auto-writes release notes from your GitHub commits. $19/mo for indie hackers.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
