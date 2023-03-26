import { CharacterInfo } from '~~/utils/appTypes'

export const useAskSherlockStore = defineStore('askSherlockStore', () => {
    const characterInfo = ref(new CharacterInfo())

    function setCharacterInfo (info: CharacterInfo) {
        characterInfo.value = info
    }

    return {characterInfo, setCharacterInfo}
})