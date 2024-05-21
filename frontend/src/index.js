import React from 'react';
import ReactDOM from 'react-dom';
import SentimentAnalysis from './SentimentAnalysis';

function App() {
  return (
    <div className='App'>
      <h1>FinSmart Analytics</h1>
      <SentimentAnalysis />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
