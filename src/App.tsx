import './styles/App.css'
import Card from './components/Card'
import questions from './questions.json'
import CardContent from './components/CardContent';
import { useState } from 'react';

export default function name() {

  const questionsQtt = questions.length;
  const [questionIndex, setQuestionIndex] = useState(0);
  let questionsObj = questions;

  function cardInteraction(msg:string) {
    if (msg === 'next') {
      if (questionIndex < questionsQtt - 1) {
        setQuestionIndex(questionIndex + 1);
      }
    } else if (msg === 'previous') {
      if (questionIndex > 0) {
        setQuestionIndex(questionIndex - 1);
      }
    }
  }

  return (
    <div>
      <Card
        Progress={questionIndex + 1}
        Points={questionsQtt}
        CardContent={<CardContent Text={questionsObj.at(questionIndex).text} />}
        Fallback={(msg:string) => cardInteraction(msg)}
      />
    </div>
  )
}
