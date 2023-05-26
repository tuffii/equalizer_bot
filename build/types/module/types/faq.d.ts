type FAQMessageQuestion = string;
type FAQMessageAnswer = string;
export interface IFAQMessage {
    readonly Question: {
        readonly Main: FAQMessageQuestion;
        readonly Aliases: Array<FAQMessageQuestion>;
    };
    readonly Answer: FAQMessageAnswer;
}
export {};
//# sourceMappingURL=faq.d.ts.map