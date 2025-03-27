"use server";

export async function getUnsplashImage() {
  const accessKey = process.env.UNSPLASH_ACCESS_KEY;
  const res = await fetch(
    `https://api.unsplash.com/photos/random?client_id=${accessKey}&count=20`,
    {
      cache: "no-store",
    }
  );
  console.log("resssssssss", res);
  return res.json();
}
