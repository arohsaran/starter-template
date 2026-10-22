"use client";

import * as React from "react";
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Controller, useForm } from "react-hook-form"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { X } from "lucide-react";

/*const beginner = [
    {
        id: "",
        question: "",
        choices: [
            {
                label: ""
            }
        ]
    }
]*/

export function Quiz({ quiz }) {
    const [answers, setAnswers] = useState("")
    const form = useForm()
    const [result, setResult] = useState("")
    function submit(values) {
        /*const formData = new FormData(event.currentTarget)
        const submittedAnswers = formData.map()*/
        let correctAnswers = 0;
        let incorrectAnswers = [];
       setAnswers(values);
       const answersArr = Object.values(answers)
       
       console.log(values);
       for(let i = 0; i < answersArr.length; i++) {
            if (answersArr[i] == quiz[i].choices[quiz[i].answer].id) {
                correctAnswers += 1;
            } else {
                incorrectAnswers.append([answers[i], quiz[i].choices[quiz[i].answer-1].id]);
            }
        }

        setResult("You got " + correctAnswers + " out of " + quiz.length + "!")
    }

    function multipleChoice(choices) {
        return (
            <div key={choices.id} className="flex items-center gap-3">
                <RadioGroupItem id={choices.id} value={choices.id} />
                <FieldLabel htmlFor={choices.id}>{choices.label}</FieldLabel>
            </div>
        );
    }

    function multipleChoiceQuestion(questions) {
        return (
            <div key={questions.id}>
                <RadioGroup name={questions.id}>
                    <FieldLegend className="font-semibold">{questions.question}</FieldLegend>
                    {questions.choices.map(multipleChoice)}
                </RadioGroup>
            </div>
        );
    }
    
    return (
        <div className="quizcard">
            <form onSubmit={form.handleSubmit(submit)}>
                <FieldGroup>
                    {quiz.map(multipleChoiceQuestion)}
                    <Button type="submit">Submit</Button>
                </FieldGroup>
            </form>
            <p>{result}</p>
        </div>
    );
}
