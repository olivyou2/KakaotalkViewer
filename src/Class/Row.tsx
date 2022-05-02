import { ChatData } from "../Interface/IChatData";

export class Row {
  type: string;
  content?: ChatData;

  constructor(type: string, content?: ChatData) {
    this.type = type;
    this.content = content;
  }
}
