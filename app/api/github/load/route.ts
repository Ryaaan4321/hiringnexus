import { NextResponse } from 'next/server';
import client from '@/app/db'
import { DB_GitHubProfile, DB_Repository } from '@/interfaces/githubinterface';

export async function GET(request: Request) {
  console.log("function got calleddddddd")
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json(
      { err: 'Please login first' },
      { status: 400 },
    );
  }
  try {
    const user = await client.user.findUnique({
      where: { id: userId },
      include: {
        githubprofile: {
          include: {
            repositories: {
              orderBy: {
                stargazersCount: 'desc'// that's how we can sort the data
              },
              take: 3
            }
          }
        },
      },
    });

    if (!user?.githubprofile) {
      return NextResponse.json(
        { err: 'Sorry no github data found' },
        { status: 404 },
      );
    }
    const profile = user.githubprofile as DB_GitHubProfile
    const repositories = user.githubprofile.repositories as DB_Repository[];
    return NextResponse.json({
      profile,
      repositories
    });
  } catch (err: any) {
    return NextResponse.json(
      { err: 'failed to load github data' },
      { status: 500 },
    );
  }
}