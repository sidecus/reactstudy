import React, { useState, useEffect } from 'react';
import './trumptweets.css';
import { QueryCloud } from './querycloud';

export const TrumpTweets = () => {
    const [queries, setQueries] = useState<string[]>([]);

    useEffect(() => {
        const getTrumpTweets = async () => {
            const trumpTweets = [] as string[];
            const url = 'http://d5nxcu7vtzvay.cloudfront.net/data/realdonaldtrump/2018.json';
            const response = await fetch(url);
            const tweets = await response.json();
            tweets.slice(0, 500).map((t: any) => trumpTweets.push(t.text.replace('&amp', '&')));

            setQueries(trumpTweets);
        };

        getTrumpTweets();
    
    }, [setQueries]);

    return (
        <div className="clouddiv">
            <h3>Trump 2018 last 500 tweets</h3>
            <QueryCloud queries={queries} wordCount={80} maxFontSize={70}/>
        </div>
    );
};