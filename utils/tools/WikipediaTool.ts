import { Tool } from "langchain/tools"

export class WorldFactBookTool extends Tool {
  name = "wikipedia-tool";

  description = "A tool to get information from Wikipedia. The input should be a string. The output will be the text of the Wikipedia page or an empty string if the page does not exist.";

  async _call(input: string): Promise<string> {
    return input
  }
  
}