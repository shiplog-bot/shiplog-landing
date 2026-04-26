export const metadata = {
  title: 'Proseflow — AI changelog generator from GitHub commits',
  description: 'Exploring: an AI tool that reads your GitHub commits and PRs and writes customer-facing release notes for you. Sign up to get updates if we build it.',
  openGraph: {
    title: 'Proseflow — AI changelog generator from GitHub commits',
    description: 'Would you use an AI tool that auto-generates release notes from your GitHub commits? Sign up to follow along if we build it.',
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
