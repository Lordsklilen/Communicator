import { Message } from "./Message";
export class Channel {
    constructor(channelId:number) {
        this.ChannelId = channelId;
    }
    UserIds!: string[];
    ChannelName!: string;
    ChannelId: number;
    Messages!: Message[];
    isGroupChannel!: boolean;
}

