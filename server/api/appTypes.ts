interface Character {
  id: string;
  desc: string;
  prompt: string;
}

interface Characters {
  [key: string]: Character;
}

export { Character, Characters}
