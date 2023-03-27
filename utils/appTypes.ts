class CharacterInfo {
    id: string = ""
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
    ret.name = info.name
    ret.intro = info.intro
    ret.career = info.career
    ret.life = info.life
    ret.personality = info.personality
    ret.created = info.created
    return ret
}

export { CharacterInfo, copyCharInfo }