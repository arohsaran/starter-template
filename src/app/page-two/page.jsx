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

import { useList } from "@/hooks/database";
import { Gallery } from "./gallery";

// This is the home page. Add your own components inside the section.
export default function PageTwo() {


  const [checkBegin, setBegin] = useState(true)
  const [checkInter, setInter] = useState(true)
  const [checkExp, setExp] = useState(true)

  const tags = {}
  {
    tags.beginner = checkBegin
    tags.intermediate = checkInter
    tags.expert = checkExp
  }

  function getImageArray() {
    function tagsQuestionMark(item, tagsList) {
      let tagIncluded = false
      for (let tag in tagsList) {
\        console.log([tag,item[tag],tagsList[tag]])
        if(item[tag] === true && tagsList[tag] === true) {
          tagIncluded=true
        }
      }
      return(tagIncluded)
    }
    if (!(data.isLoading || data.error)){
      //console.log(data.data)
      content.push(data.data)
      for (let obj of content) {
        console.log(obj.tags)
        if (tagsQuestionMark(obj.tags, tags)){
          // hdfahdfbghasdfbaldbfalkjsbskldjfbakjsdfakjsdf
          contentFiltered.push(obj)
        }
      }
      return(contentFiltered)
    }
  }

  const content = []
  const contentFiltered = []
  const data = useList("gallery", { sort: "-created" })
  

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
        <div id="imageList" className="">
          <h3 className="text-xl text-semibold">Images:</h3>
          <div id="images" className="grid grid-center">
            <p className="grid grid-center"> {data.isLoading ? "Loading..." : ""} {data.error ? "Error finding images" : ""} {(!(data.isLoading || data.error)) ? "Loaded" : ""} </p>
            <Gallery arr={getImageArray()}>{getImageArray()}</Gallery>
          </div>
        </div> 
      </div>
    </section>
  );
}
