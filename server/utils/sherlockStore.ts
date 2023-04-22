import * as fs from "fs"
import { createClient } from '@supabase/supabase-js'

// Create Supabase client
//const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_KEY)

export function useSherlockStore() {


  async function setItem(name: string, value: Buffer) {
    fs.writeFileSync(name, value)
  }

  return {
    setItem
  }
}
