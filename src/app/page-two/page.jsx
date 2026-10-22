"use client";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { useState } from "react";



// This is the home page. Add your own components inside the section.
export default function PageOne() {
  const [checkBegin, setBegin] = useState(true)
  const [checkInter, setInter] = useState(true)
  const [checkExp, setExp] = useState(true)

  const content = []
  const contentFiltered = []

  return (
    <section className="space-y-3">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl">
        Gallery!
      </h1>
      <div className="flex">
        <div id="tagBar" className="w-40">
          <p className="text-xl font-bold p-4">Filter by:</p>
          <p>Experience</p>
          <FieldLabel>
            <Field orientation="vertical" width="500">
              <FieldLabel>
                <Checkbox checked={checkBegin} onCheckedChange={setBegin}></Checkbox>
                Beginner</FieldLabel>
              <FieldLabel><Checkbox checked={checkInter} onCheckedChange={setInter}></Checkbox>
                Intermediate </FieldLabel>
              <FieldLabel><Checkbox checked={checkExp} onCheckedChange={setExp}></Checkbox>
                Expert </FieldLabel>
            </Field>
          </FieldLabel>
        </div>
        <div id="imageList" className="grid m-l-10 w-500 h-400">
          <h3>Images:</h3>
          <div id="images"> {contentFiltered} </div>
        </div>
      </div>
    </section>
  );
}
