export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  return Response.json({
    url: `${process.env.NEXTAUTH_URL}/profile/${userId}`,
  });
}