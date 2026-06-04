export function getUserId(request: Request) {
  const url = new URL(request.url);
  const userId = url.searchParams.get("userId");

  if (!userId) {
    throw new Error("Missing userId");
  }

  return Number(userId);
}