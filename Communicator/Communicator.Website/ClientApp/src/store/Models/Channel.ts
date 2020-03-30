import { Message } from "./Message";
export class Channel {
    UserIds!: string[];
    ChannelName!: string;
    ChannelId!: number;
    Messages!: Message[];
    isGroupChannel!: boolean;
}

