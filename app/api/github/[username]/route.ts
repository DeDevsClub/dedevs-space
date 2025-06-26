import { NextResponse } from "next/server";
import type { GitHubRepo } from "@/lib/types";

export async function GET(
  request: Request,
  context: { params: { username: string } }
) {
  const username = context.params.username;
  // In a real Vercel deployment, set GITHUB_TOKEN in Environment Variables
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

  if (!username) {
    return NextResponse.json(
      { error: "GitHub username is required" },
      { status: 400 }
    );
  }

  try {
    const headers: HeadersInit = {
      Accept: "application/vnd.github.v3+json",
    };
    if (GITHUB_TOKEN) {
      headers["Authorization"] = `Bearer ${GITHUB_TOKEN}`;
    }

    const repoRes = await fetch(
      `https://api.github.com/users/${username}/repos?sort=pushed&per_page=9&type=owner`,
      {
        headers,
      }
    );

    if (!repoRes.ok) {
      const errorBody = await repoRes.text();
      console.error(
        `GitHub API error for repos (user: ${username}): ${repoRes.status} ${repoRes.statusText}`,
        errorBody
      );
      return NextResponse.json(
        {
          error: `Failed to fetch repositories from GitHub: ${repoRes.statusText}. Check if user exists and token is valid.`,
        },
        { status: repoRes.status }
      );
    }

    const reposData: any[] = await repoRes.json();
    const repos: GitHubRepo[] = reposData.map((repo) => ({
      id: repo.id,
      name: repo.name,
      html_url: repo.html_url,
      description: repo.description,
      stargazers_count: repo.stargazers_count,
      forks_count: repo.forks_count,
      language: repo.language,
      pushed_at: repo.pushed_at,
      topics: repo.topics || [],
    }));

    return NextResponse.json({ repos });
  } catch (error: any) {
    console.error(`Error fetching GitHub data for ${username}:`, error);
    return NextResponse.json(
      {
        error: "Internal server error while fetching GitHub data",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
