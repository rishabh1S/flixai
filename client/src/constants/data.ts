const aspectRatios = [
  { title: "1:2", resolution: "704*1408" },
  { title: "3:5", resolution: "768*1280" },
  { title: "1:1", resolution: "1024*1024" },
  { title: "9:7", resolution: "1152*896" },
  { title: "2:1", resolution: "1408*704" },
];

const presetData = [
  {
    title: "Default",
    uri: "https://res.cloudinary.com/dnp36kqdc/image/upload/v1706910913/FlixAi/default-sample.png",
    key: "Default",
  },
  {
    title: "Realistic",
    uri: "https://res.cloudinary.com/dnp36kqdc/image/upload/v1706910913/FlixAi/realistic-sample.png",
    key: "Realistic",
  },
  {
    title: "Anime",
    uri: "https://res.cloudinary.com/dnp36kqdc/image/upload/v1706910914/FlixAi/anime-sample.png",
    key: "Anime",
  },
];

const dummyImages = [
  "https://replicate.delivery/pbxt/IKQENHlFlIooIZghLcxpaTz3IteCWIOviBbIVx4C175iLKKJA/fae1eeba-3259-40cd-9d72-e742c018a898.png",
  "https://replicate.delivery/pbxt/ywrtFkWfAJRle06uDzNC5kgHxUlJbz9C7MwJ2iNGPJQvCuTSA/fee56087-4f97-4ca5-ac04-fd861071de7d.png",
  "https://res.cloudinary.com/dnp36kqdc/image/upload/v1706910913/FlixAi/realistic-sample.png",
  "https://res.cloudinary.com/dnp36kqdc/image/upload/v1706910913/FlixAi/default-sample.png",
  "https://replicate.delivery/pbxt/ywrtFkWfAJRle06uDzNC5kgHxUlJbz9C7MwJ2iNGPJQvCuTSA/fee56087-4f97-4ca5-ac04-fd861071de7d.png",
  "https://replicate.delivery/pbxt/ywrtFkWfAJRle06uDzNC5kgHxUlJbz9C7MwJ2iNGPJQvCuTSA/fee56087-4f97-4ca5-ac04-fd861071de7d.png",
  "https://res.cloudinary.com/dnp36kqdc/image/upload/v1706910913/FlixAi/realistic-sample.png",
];

export { aspectRatios, presetData, dummyImages };
