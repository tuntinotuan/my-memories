"use server";

export async function getUnsplashImage(query: string, page: number) {
  const accessKey = process.env.UNSPLASH_ACCESS_KEY;
  const res = await fetch(
    `https://api.unsplash.com/search/photos?query=${query}&client_id=${accessKey}&page=${page}&per_page=10`,
    {
      cache: "no-store",
    }
  );
  console.log("resssssssss", res);
  const data = await res.json();
  return data.results;
}
