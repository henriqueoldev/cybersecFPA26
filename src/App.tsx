import './styles/App.css'
import Card from './components/Card'
import FaceUpload from './components/FaceUpload'

import questions from './questions.json'
import CardContent from './components/CardContent'
import { useState } from 'react'
import FinishCard from './components/FinishCard'
import DeletionModal from './components/DeletionModal'

let responsesObj = [{ "field": "", "value": "" }];

export default function name() {

  const questionsQtt = questions.length;
  const [questionIndex, setQuestionIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [faceId, setFaceId] = useState<string | null>(null);
  const [showFaceUpload, setShowFaceUpload] = useState(false);

  let questionsObj = questions;

  function cardInteraction(msg: string) {
    let userInput = document.getElementById('userInput') as HTMLInputElement | null;
    let inputValue = '';

    if (msg === 'next') {

      // 👉 se está no FaceUpload → finaliza
      if (showFaceUpload) {
        setIsFinished(true);
        return;
      }

      if (questionIndex < questionsQtt - 1) {
        if (userInput) {
          inputValue = userInput.value;
          userInput.value = '';
          responsesObj.push({
            field: questionsObj.at(questionIndex)?.field ?? '',
            value: inputValue
          });
        }

        if (inputValue !== '' || userInput == null) {
          setQuestionIndex(questionIndex + 1);
        }

      } else {
        responsesObj.shift();
        setShowFaceUpload(true);
      }

    } else if (msg === 'previous') {

      if (showFaceUpload) {
        setShowFaceUpload(false);
        return;
      }

      if (questionIndex > 0) {
        setQuestionIndex(questionIndex - 1);
      }
    }
  }

  return (
    <div>

      {showModal && <DeletionModal />}

      {
        !isFinished ? (
          <Card
            Progress={showFaceUpload ? questionsQtt + 1 : questionIndex + 1}
            Points={questionsQtt + 1}

            CardContent={
              showFaceUpload ? (
                <FaceUpload onFaceCaptured={setFaceId} />
              ) : (
                <CardContent
                  Text={questionsObj.at(questionIndex)?.text ?? 'null text'}
                  Placeholder={questionsObj.at(questionIndex)?.field ?? null}
                />
              )
            }

            Fallback={(msg: string) => cardInteraction(msg)}
          />
        ) : (
          <FinishCard
            Fallback={() => { setShowModal(true) }}
            Responses={responsesObj}
            FaceId={faceId} // 🔥 AQUI É O PONTO CRÍTICO
          />
        )
      }

    </div>
  )
}