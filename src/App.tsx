import './styles/App.css'
import Card from './components/Card'
import questions from './questions.json'

export default function name() {

  const questionsQtt = questions.length;
  let questionIndex = 0;
  let questionsObj = questions;

  function cardInteraction(msg:string) {
    console.log(msg);
  }

  let CardContent = <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi dicta sit modi exercitationem minus in reprehenderit explicabo illum quaerat maxime vitae mollitia expedita, harum asperiores minima voluptatum nemo ad excepturi.</p>

  return (
    <div>
      <Card Progress={2} Fallback={(msg:string) => cardInteraction(msg)} CardContent={CardContent}></Card>
    </div>
  )
}
