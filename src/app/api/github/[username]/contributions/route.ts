import { NextResponse } from 'next/server';

interface GitHubEvent {
  type: string;
  created_at: string;
  repo: {
    id: number;
    name: string;
    url: string;
  };
  payload?: {
    commits?: Array<{
      sha: string;
      message: string;
    }>;
  };
}

export async function GET(
  request: Request,
  { params }: { params: { username: string } }
) {
  try {
    const { username } = params;

    if (!username) {
      console.log('Username is required for contributions API');
      return NextResponse.json(
        { error: 'Username is required' },
        { status: 400 }
      );
    }

    console.log(`Fetching contribution data for user: ${username}`);

    // Fetch user events (includes commit data)
    const events: GitHubEvent[] = await fetch(
      `https://api.github.com/users/${username}/events`,
      {
        headers: {
          'User-Agent': 'github-wrapped-app',
          'Accept': 'application/vnd.github.v3+json',
        },
        next: { revalidate: 3600 } // Cache for 1 hour
      }
    )
    .then(async res => {
      if (!res.ok) {
        const errorText = await res.text();
        console.error(`GitHub API response error: ${res.status} - ${errorText}`);
        throw new Error(`GitHub API error: ${res.status} - ${errorText}`);
      }
      return res.json();
    });

    console.log(`Fetched ${events.length} events for user: ${username}`);

    // Filter for PushEvent (commits) and calculate stats
    const commitEvents = events.filter(event => event.type === 'PushEvent');

    console.log(`Found ${commitEvents.length} commit events for user: ${username}`);

    // Calculate total commits
    let totalCommits = 0;
    commitEvents.forEach(event => {
      if (event.payload?.commits) {
        totalCommits += event.payload.commits.length;
      }
    });

    // Group commits by date for contribution graph
    const commitsByDate: Record<string, number> = {};
    commitEvents.forEach(event => {
      const date = new Date(event.created_at).toISOString().split('T')[0];
      commitsByDate[date] = (commitsByDate[date] || 0) + (event.payload?.commits?.length || 0);
    });

    // Get the most active day
    let mostActiveDay = '';
    let mostCommitsInADay = 0;
    for (const [date, count] of Object.entries(commitsByDate)) {
      if (count > mostCommitsInADay) {
        mostCommitsInADay = count;
        mostActiveDay = date;
      }
    }

    // Get top repositories by commit activity
    const repoCommitCount: Record<string, number> = {};
    commitEvents.forEach(event => {
      const repoName = event.repo.name;
      repoCommitCount[repoName] = (repoCommitCount[repoName] || 0) + (event.payload?.commits?.length || 0);
    });

    const topRepo = Object.entries(repoCommitCount).sort((a, b) => b[1] - a[1])[0]?.[0] || '';

    console.log(`Calculated contributions stats for user: ${username}`, {
      totalCommits,
      mostActiveDay,
      mostCommitsInADay,
      topRepo
    });

    return NextResponse.json({
      totalCommits,
      commitsByDate,
      mostActiveDay,
      mostCommitsInADay,
      topRepo,
      topRepos: Object.entries(repoCommitCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([name, count]) => ({ name, count })),
    });
  } catch (error: any) {
    console.error('Error in GitHub contributions API route:', error);

    return NextResponse.json(
      {
        error: error.message || 'Failed to fetch GitHub contribution data',
        ...(error.status && { status: error.status })
      },
      {
        status: error.status || 500
      }
    );
  }
}