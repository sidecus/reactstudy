// interfaces
export interface IWord {
    text: string;
    value: number;
}

// Punctuation and stop word regex.
// Punctuation character escaping please see: https://www.regular-expressions.info/charclass.html
// Stop word list is limited now.
// tslint:disable-next-line:max-line-length
const urlRegex = /\bhttps?:\/\/[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-z]{2,6}([-a-zA-Z0-9@:%_+.~#?&amp;//=]*)\b/gi;
const punctuationRegex = /[\\\-\][/^$.|?*+(){}'",#!%&;:=`~@]+/gi;
const stopWordRegex = /\b(?:https|you|your|yours|i|me|my|we|our|ours|us|he|him|his|she|her|hers|they|them|their|it|its|who|whose|which|this|that|the|an|a|is|are|am|was|were|be|being|have|has|will|would|shall|should|when|where|why|what|how|now|if|then|but|and|or|so|to|for|on|of|at|as|about|with|from|in|into|onto|up|by|than|can|let|please|go|do|did|<pii>|(?:\d+))\b/gi;
const delimiterRegEx = new RegExp(`${urlRegex.source}|${punctuationRegex.source}|${stopWordRegex.source}`, 'g');

// Helper method to convert list of strings to IWord list by filtering out punctuations and stop words
export const getWords = (queries: string[]) => {
    // tslint:disable-next-line:no-any
    const dict: any = {};
    queries.filter((x: string) => !!x).forEach((x: string) => {
        const rawWords = x.toLowerCase().replace(delimiterRegEx, ' ').trim().split(/\s+/);
        rawWords.forEach((w: string) => {
            if (dict.hasOwnProperty(w)) {
                dict[w] ++;
            } else {
                dict[w] = 1;
            }
        });
    });

    // Convert to IWords array
    const result = [] as IWord[];
    Object.keys(dict).forEach((w: string) => {
        result.push({text: w, value: dict[w]});
    });

    return result;
};

