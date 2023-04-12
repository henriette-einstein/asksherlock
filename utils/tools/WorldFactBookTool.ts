import { Tool } from "langchain/tools"

export class WorldFactBookTool extends Tool {
  name = "world-factbook-tool";

  description = "A tool to get information from the CIA World Factbook. The input should be a country code. The output will";

  async _call(input: string): Promise<string> {
    // ...
    return input
  }
  
}