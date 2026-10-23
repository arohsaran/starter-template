"use client";
import { Quiz } from "../../components/quiz"
// This is the home page. Add your own components inside the section.
export default function PageOne() {
  const beginnerQuiz = [
      {
        question: "What is an apple?",
        id: "apple",
        choices: [{id:"fruit", label:"Fruit"}, {id:"brand", label:"Brand"}, {id:"iam", label:"I am an apple"}],
        answer: 2
      },
      {
        question: "What is a banana?",
        id: "banana",
        choices: [{id:"froot", label:"Fruit"}, {id:"object", label:"Object"}, {id:"im", label:"I am a banana"}],
        answer: 2
      },
      {
        question: "How should you align a pyramid?",
        id: "actual3Dprint",
        choices: [{id:"1", label:"Point touching the ground"}, {id:"2", label:"Square base touching the floor"}, {id:"3", label:"Point inside the ground"}],
        answer: 1
      }
    ]
  
  return (
    <section className="space-y-3">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
        Quiz
      </h1>
      <Quiz quiz={beginnerQuiz}></Quiz>
    </section>
  );
}
