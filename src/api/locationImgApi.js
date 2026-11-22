const cityImgApi = import.meta.env.VITE_ACCESS_KEY

export default async function placeImages(city) {
  const landmarks = {
    baku: "baku skyscrapers",
    london: "london big ben tower bridge",
    paris: "eiffel tower",
    istanbul: "istanbul bridge",
    tokyo: "tokyo tower japan",
    rome: "colloseum",
    tallinn: "tallinn old town",
  }

  const query = landmarks[city.toLowerCase()] || `${city} city`
  const URL = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape`

  const res = await fetch(URL,{
    headers: {"Authorization": `Client-ID ${cityImgApi}`}
  })

  if (!res.ok) { throw new Error("Image not found") }

  const data = await res.json()
  const img = data.results[0]

  if (!img) return null

  return { image: img.urls.regular, alt: img.alt_description || city, photosUrl: img.links.html }

}