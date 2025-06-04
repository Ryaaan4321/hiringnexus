import { NextResponse ,NextRequest} from 'next/server';
import client from '@/app/db'
import { DB_GitHubProfile, DB_Repository } from '@/interfaces/githubinterface';
import { UserPayload } from '@/interfaces/userinterface';
import { jwtVerify } from 'jose';
export async function GET(request: NextRequest) {
  console.log("function got calleddddddd")
  const token = request.cookies.get("token")?.value;
  console.log("token from the github get request")
  if(!token){
    return NextResponse.json(
      {err:"token is missing!please login first"},
      {status:400}
    )
  }
  try {
    const { payload } = await jwtVerify<UserPayload>(token, new TextEncoder().encode(process.env.SECRET_KEY));
    const userid=payload.id;
    const user = await client.user.findUnique({
      where: { id:  userid},
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