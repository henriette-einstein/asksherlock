interface Character {
  id: string;
  title: string;
  img: string;
  desc: string;
  intro: string;
  prompt: string;
}

interface People {
  [key: string]: Character;
}

interface Config {
  people: People;
}

export { Character, People, Config}
