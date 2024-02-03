const aspectRatios = [
  { title: "1:1", resolution: "1024x1024" },
  { title: "3:5", resolution: "768x1280" },
  { title: "9:7", resolution: "1152x896" },
  { title: "18:9", resolution: "1408x704" },
  { title: "5:2", resolution: "1600x640" },
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
