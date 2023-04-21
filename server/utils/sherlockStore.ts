import * as fs from "fs"

export function useSherlockStore() {

  async function setItem(name: string, value: Buffer) {
    fs.writeFileSync(name, value)
  }

  return {
    setItem
  }
}
