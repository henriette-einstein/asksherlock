import * as fs from "fs"
 export default defineEventHandler( async (event) => {
   const body = await readMultipartFormData(event) || []

   let ret = body.map((part) => ({
     ...part,
     data: part.data.toString("utf8")
   }))
   console.log(body[0])
   fs.writeFileSync("data/"+body[0].filename, body[0].data)
   return "done"
 })