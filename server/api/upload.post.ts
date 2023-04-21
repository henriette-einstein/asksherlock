import { useSherlockStore } from "../utils/sherlockStore"
 export default defineEventHandler( async (event) => {
   const body = await readMultipartFormData(event) || []

   let ret = body.map((part) => ({
     ...part,
     data: part.data.toString("utf8")
   }))
   console.log(body[0])
   //fs.writeFileSync("data/"+body[0].filename, body[0].data)
   const filename: string = body[0].filename || "undefined"
   console.log("Storing filename: ", filename)
   await useSherlockStore().setItem(filename, body[0].data)
   return "done"
 })