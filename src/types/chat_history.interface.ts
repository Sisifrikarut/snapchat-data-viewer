export interface ExportOutgoingChatMessage {
  To: string;
  "Media Type": string;
  Created: string;
  Text: string | null;
}

export interface ExportIngoingChatMessage {
  From: string;
  "Media Type": string;
  Created: string;
  Text: string | null;
}

export interface ExportChatHistory {
  "Received Saved Chat History": ExportIngoingChatMessage[];
  "Sent Saved Chat History": ExportOutgoingChatMessage[];
  "Received Unsaved Chat History": ExportIngoingChatMessage[];
  "Sent Unsaved Chat History": ExportOutgoingChatMessage[];
}

export enum ChatMessageType {
  Ingoing,
  Outgoing,
}

export enum ChatMessageContentType {
  Text,
  Media,
  Unknown,
}

export class ChatMessage {
  type: ChatMessageType;
  timestamp: Date;
  contentType: ChatMessageContentType;
  content: string | undefined;

  constructor(msg: ExportOutgoingChatMessage | ExportIngoingChatMessage) {
    if (((msg as never)["From"] as string | undefined) != undefined) {
      this.type = ChatMessageType.Ingoing;
    } else {
      this.type = ChatMessageType.Outgoing;
    }

    this.timestamp = new Date(msg.Created.replace(" UTC", "Z"));
    this.content =
      msg.Text == null || msg.Text.length == 0 ? undefined : msg.Text;

    switch (msg["Media Type"]) {
      case "TEXT":
        this.contentType = ChatMessageContentType.Text;
        break;
      case "MEDIA":
        this.contentType = ChatMessageContentType.Media;
        break;
      default:
        this.contentType = ChatMessageContentType.Unknown;
        break;
    }
  }
}

export interface ChatHistory {
  name: string;
  messages: ChatMessage[];
}
