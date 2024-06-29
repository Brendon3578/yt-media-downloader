export const randomUrls = [
  "https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley",
  "https://www.youtube.com/watch?v=1QMG2QjsjdA&ab_channel=VierreCloudVEVO",
  "https://www.youtube.com/watch?v=IgIdKSv6pl8&ab_channel=IndieRecords",
  "https://www.youtube.com/watch?v=cxSzri346W0&ab_channel=TimMaia-Topic",
  "https://www.youtube.com/watch?v=widZEAJc0QM&ab_channel=SundaeMMD",
  "https://www.youtube.com/watch?v=I7sjizUrZh4&ab_channel=Adrian",
  "https://www.youtube.com/watch?v=oowBXzfcl90&ab_channel=AOM",
  "https://www.youtube.com/watch?v=7wtfhZwyrcc&ab_channel=ImagineDragonsVEVO",
  "https://www.youtube.com/watch?v=L_jWHffIx5E&ab_channel=SmashMouthVEVO",
  "https://www.youtube.com/watch?v=DC5WIRdqQKY&ab_channel=Abeon",
  "https://www.youtube.com/watch?v=52Gg9CqhbP8&ab_channel=STUCKINTHESOUND",
  "https://www.youtube.com/watch?v=k_9tDtXYLq8&ab_channel=UltimateSpidey1610",
  "https://www.youtube.com/watch?v=1oOBjyOKu2o&ab_channel=Neobrane",
  "https://www.youtube.com/watch?v=7aMOurgDB-o&ab_channel=Crunchyroll",
  "https://www.youtube.com/watch?v=P75q_3Qlrqg&ab_channel=Crunchyroll",
];

export function getRandomItem<T>(array: Array<T>): T {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}
export const getRandomMusic = () => getRandomItem(randomUrls);
