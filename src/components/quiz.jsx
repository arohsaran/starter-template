"use client";

import * as React from "react";
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

    function handleSubmit(event) {
        event.preventDefault()
        const submittedData = new FormData(event.currentTarget)
        setAnswers(String(submittedData.get("")))
    }

    function multipleChoice(choices) {
        return (
            <div>
                <Input id={choices.id} type="radio" class="mcradio"></Input>
                <Label for={choices.id} class="mclabel">{choices.label}</Label>
            </div>
        );
    }

    function multipleChoiceQuestion(question) {
        return (
            <div class="multiplechoice">
                <p class="mcquestion">{question.question}</p>
                {question.choices.map(multipleChoice)}
            </div>
        );
    }
    
    return (
        <div class="quizcard">
            <FieldSet onSubmit={handleSubmit} id={quiz.id}>
                {quiz.question.map(multipleChoiceQuestion)}
            </FieldSet>
        </div>
    );
}
