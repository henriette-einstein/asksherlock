class CharacterInfo {
    id: string = ""
    age: string = ""
    height: string = ""
    weight: string = ""
    name: string = ""
    intro: string = ""
    career: string = ""
    life: string = ""
    personality: string = ""
    created: boolean = false
}

function copyCharInfo(info: CharacterInfo): CharacterInfo {
    const ret = new CharacterInfo()
    ret.id = info.id
    ret.age = info.age
    ret.height = info.height
    ret.weight = info.weight
    ret.name = info.name
    ret.intro = info.intro
    ret.career = info.career
    ret.life = info.life
    ret.personality = info.personality
    ret.created = info.created
    return ret
}

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
  

export { CharacterInfo, Character, People, Config }