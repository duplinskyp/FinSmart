import React, { useState } from 'react';
import axios from 'axios';

const SentimentAnalysis = () => {
    const [text, setText] = useState('');
    const [sentiment, setSentiment] = useState(null);

    const analyzeSentiment = async () => {
        const response = await axios.post('/api/sentiment', { text });
        setSentiment(response.data);
    };

    return (
        <div>
            <textarea value={text} onChange={(e) => setText(e.target.value)} />
            <button onClick={analyzeSentiment}>Analyze Sentiment</button>
            {sentiment && <div>{JSON.stringify(sentiment)}</div>}
        </div>
    );
};

export default SentimentAnalysis;
