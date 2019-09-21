import React, { useState, useEffect } from 'react';
import './trumptweets.css';
import { QueryCloud } from './querycloud';

export const numberOfTweets = 800;
export const maxFontSize = 80;
export const wordCount = 60;

export const TrumpTweets = () => {
    const [queries, setQueries] = useState<string[]>([]);

    useEffect(() => {
        const getTrumpTweets = async () => {
            const trumpTweets = [] as string[];
            // data from http://trumptwitterarchive.com/
            const url = 'http://d5nxcu7vtzvay.cloudfront.net/data/realdonaldtrump/2018.json';
            const response = await fetch(url);
            const tweets = await response.json();
            tweets.slice(0, numberOfTweets).map((t: any) => trumpTweets.push(t.text.replace('&amp;', '&')));

            setQueries(trumpTweets);
        };

        getTrumpTweets();
    
    }, []);

    return (
        <div className="clouddiv">
            <h3>Trump 2018 last {numberOfTweets} tweets</h3>
            <QueryCloud queries={queries} wordCount={wordCount} maxFontSize={maxFontSize}/>
        </div>
    );
};