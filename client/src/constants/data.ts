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

export { aspectRatios, presetData };
