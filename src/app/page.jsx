"use client";
import { Quiz } from "../components/quiz"
// This is the home page. Add your own components inside the section.
export default function PageOne() {
  const beginnerQuiz = [
      {
        question: "What is an apple?",
        id: "apple",
        choices: [{id:"fruit", label:"Fruit"}, {id:"brand", label:"Brand"}, {id:"iam", label:"I am an apple"}],
        answer: 0
      },
      {
        question: "What is a banana?",
        id: "banana",
        choices: [{id:"fruit", label:"Fruit"}, {id:"object", label:"Object"}, {id:"iam", label:"I am a banana"}],
        answer: 0
      }
    ]
  
  return (
    <section className="space-y-3">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
        Page One
      </h1>
      <Quiz quiz={beginnerQuiz}></Quiz>
    </section>
  );
}
