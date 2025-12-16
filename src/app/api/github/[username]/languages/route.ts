import { NextResponse } from 'next/server';

interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  private: boolean;
  language: string;
}

interface GitHubRepoLanguages {
  [language: string]: number;
}

export async function GET(
  request: Request,
  { params }: { params: { username: string } }
) {
  try {
    const { username } = params;

    if (!username) {
      return NextResponse.json(
        { error: 'Username is required' },
        { status: 400 }
      );
    }

    // Fetch user repositories
    const repos: GitHubRepo[] = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&direction=desc&per_page=100`,
      {
        headers: {
          'User-Agent': 'github-wrapped-app',
          'Accept': 'application/vnd.github.v3+json',
        },
      }
    )
    .then(res => res.json());

    // Get language data for each repository
    const languageData: Record<string, number> = {};
    const reposWithLanguages = repos.filter(repo => repo.language);

    // Process each repository to get language breakdown
    for (const repo of reposWithLanguages) {
      try {
        const repoLanguages: GitHubRepoLanguages = await fetch(
          `https://api.github.com/repos/${repo.full_name}/languages`,
          {
            headers: {
              'User-Agent': 'github-wrapped-app',
              'Accept': 'application/vnd.github.v3+json',
            },
          }
        )
        .then(res => res.json());

        // Add language bytes to our total count
        Object.entries(repoLanguages).forEach(([lang, bytes]) => {
          languageData[lang] = (languageData[lang] || 0) + bytes;
        });
      } catch (err) {
        // If we can't fetch language data for a single repo, continue with others
        console.warn(`Could not fetch language data for ${repo.full_name}:`, err);
      }
    }

    // Calculate percentages and format the data
    const totalBytes = Object.values(languageData).reduce((sum, count) => sum + count, 0);
    const languageStats = Object.entries(languageData)
      .map(([language, bytes]) => ({
        language,
        bytes,
        percentage: totalBytes > 0 ? parseFloat(((bytes / totalBytes) * 100).toFixed(2)) : 0
      }))
      .sort((a, b) => b.bytes - a.bytes)
      .slice(0, 10); // Top 10 languages

    return NextResponse.json({
      languages: languageStats,
      totalBytes,
    });
  } catch (error: any) {
    console.error('Error in GitHub languages API route:', error);
    
    return NextResponse.json(
      { 
        error: error.message || 'Failed to fetch GitHub language data',
        ...(error.status && { status: error.status })
      },
      { 
        status: error.status || 500 
      }
    );
  }
}