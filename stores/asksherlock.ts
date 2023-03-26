import { CharacterInfo } from '~~/utils/appTypes'

export const useAskSherlockStore = defineStore('askSherlockStore', () => {
    const characterInfo = ref(new CharacterInfo())
    const aiResult = ref("")

    function setCharacterInfo (info: CharacterInfo) {
        characterInfo.value = info
    }

    function setAiResult (newResult: string) { 
        console.log("Setting AI result to ", newResult)
        aiResult.value = newResult
    }

    return {characterInfo, setCharacterInfo, aiResult, setAiResult}
})