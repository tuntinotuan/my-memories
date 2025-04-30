"use server";

export async function getRandomWordApi(limit: number, wordLength: number) {
  const res = await fetch(
    `https://random-word-api.herokuapp.com/word?number=${limit}&length=${wordLength}`
  );
  console.log("resssssssss", res);
  const data = await res.json();
  return data;
}
