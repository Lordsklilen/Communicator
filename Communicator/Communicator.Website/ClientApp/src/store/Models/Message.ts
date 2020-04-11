export class Message {
    constructor(Content: string) {
        this.Content = Content;
    }
    MessageId!: number;
    UserId!: string;
    Content: string;
    SentTime!: Date;
}

