"use client";
import Button from "@/components/button/Button";
import Control from "./Control";
import Title from "./Title";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { Tooltip } from "@nextui-org/tooltip";
import InputShortAnswer from "@/components/input/InputShortAnswer";
import InputEmail from "@/components/input/InputEmail";
import InputLink from "@/components/input/InputLink";
import Textarea from "@/components/textarea/Textarea";
import Block from "./Block";

export default function CreatePage() {
  return (
    <section className="flex flex-col gap-4 create-container">
      <Title></Title>
      <Block>
        <InputEmail></InputEmail>
      </Block>
      <Block>
        <InputShortAnswer></InputShortAnswer>
      </Block>
      <Block>
        <InputLink></InputLink>
      </Block>
      <Block>
        <Textarea className="flex-1"></Textarea>
      </Block>
      <Control show className="px-2"></Control>
      <div className="flex">
        <Tooltip
          showArrow
          content="Cannot submit from the form builder. Use a published form to submit a response."
        >
          <div className="mx-auto">
            <Button className="bg-black px-4 py-2">{false || "Submit"}</Button>
          </div>
        </Tooltip>
      </div>
    </section>
  );
}
