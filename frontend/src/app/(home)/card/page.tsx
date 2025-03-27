import Image from "next/image";

// async function getUnsplashImage() {
//   const accessKey = process.env.UNSPLASH_ACCESS_KEY;
//   const res = await fetch(
//     `https://api.unsplash.com/photos/random?client_id=${accessKey}&count=20`,
//     {
//       cache: "no-store",
//     }
//   );

//   if (!res.ok) throw new Error("Failed to fetch image");

//   return res.json();
// }
export default async function CardPage() {
  // const images = await getUnsplashImage();
  // console.log("data", image);
  console.log("data");
  return (
    <div>
      Card page
      <div className="grid grid-cols-6 w-full">
        {/* {images.map((img: any) => (
          <Image
            key={img.id}
            src={img.urls.small}
            alt={img.alt_description}
            width={200}
            height={100}
          />
        ))} */}
      </div>
    </div>
  );
}
