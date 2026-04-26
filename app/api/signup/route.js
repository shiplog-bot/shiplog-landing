export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email } = body;

    if (!email || !email.includes('@')) {
      return Response.json({ error: 'Valid email required' }, { status: 400 });
    }

    const timestamp = new Date().toISOString();
    const entry = { name: name || '', email, timestamp };

    // Primary: log to Vercel logs (always works - visible in dashboard)
    console.log('SIGNUP:', JSON.stringify(entry));

    // Secondary: create GitHub issue as permanent record
    const githubToken = process.env.GITHUB_TOKEN;
    if (githubToken) {
      try {
        await fetch('https://api.github.com/repos/shiplog-bot/shiplog-signups/issues', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${githubToken}`,
            'Content-Type': 'application/json',
            'Accept': 'application/vnd.github.v3+json',
            'X-GitHub-Api-Version': '2022-11-28',
          },
          body: JSON.stringify({
            title: `Signup: ${email}`,
            body: `**Name:** ${name || 'Not provided'}\n**Email:** ${email}\n**Time:** ${timestamp}\n**Source:** landing page`,
            labels: ['signup'],
          }),
        });
      } catch (ghErr) {
        console.error('GitHub issue creation failed:', ghErr.message);
      }
    }

    return Response.json({ success: true, message: "You're on the list!" });
  } catch (error) {
    console.error('Signup error:', error);
    return Response.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
