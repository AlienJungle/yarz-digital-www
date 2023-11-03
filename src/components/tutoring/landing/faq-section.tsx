"use client";

import triangle from "@/../public/tutoring/triangle.svg";
import { statics } from "@/static";
import classNames from "classnames";
import Image from "next/image";
import { useState } from "react";
import { THEME_CLASSNAME_GREEN } from "../button";

export default function FAQSection() {
  const [questionsAndAnswers, setQuestionsAndAnswers] = useState<{ question: string; answer: JSX.Element; isOpen?: boolean }[]>([
    {
      question: "Do I need to know at least something before I start tutoring?",
      answer: <>Everyone is welcome, regardless of your previous knowledge or experience. You don't have to know a thing about programming before joining a session with me. Together, we'll take things step by step, building a strong foundation, and have a great time doing it!</>,
    },
    {
      question: "Once I start, am I tied in to a contract?",
      answer: <>You're never locked into a contract, and you're free to stop at any time. Please note that sessions purchased with me are non-refundable. If you're on a subscription plan, you can cancel it at any time without incurring any extra fees or hidden costs."</>,
    },
    {
      question: "How short-notice can I book a session?",
      answer: <>You have the flexibility to schedule a session up to 2 hours before your desired time, as long as I'm available.</>,
    },
    {
      question: "How far in advance can I book a session?",
      answer: <>You can book a session with me up to 2 weeks in advance.</>,
    },
    {
      question: "I can't attend a booked lesson. What do I do?",
      answer: <>If you find that you can't make a lesson, you have the option to either reschedule or cancel the lesson, as long as you give me at least 4 hours' notice. Unfortunately, lessons cannot be rescheduled or canceled within 4 hours of the scheduled start time. To reschedule or cancel your lesson, simply log in and visit your dashboard. You'll find the options to do so under 'Your upcoming lessons'.</>,
    },
    {
      question: "Can I purchase tutoring as a business?",
      answer: <>Absolutely! If you're considering offering tutoring in your workplace through me, please don't hesitate to reach out using the 'I have a question' button below or book a trial lesson with me to explore this further. I'm more than happy to provide volume discounts if you're enrolling multiple individuals, and I can also provide VAT receipts for your convenience.</>,
    },
  ]);

  const handleRowToggle = (i: number) => {
    const arrayUpdated = [...questionsAndAnswers];
    arrayUpdated[i].isOpen = !arrayUpdated[i].isOpen;
    setQuestionsAndAnswers(arrayUpdated);
  };

  return (
    <div className="my-32" id="faq">
      <h1 className="text-3xl font-semibold leading-[64px] max-w-[381px] mb-[48px]">FAQ</h1>
      <div className="flex flex-col gap-y-[30px]">
        {questionsAndAnswers.map((qna, i) => (
          <div key={qna.question} className="flex flex-col">
            <div className="flex flex-row items-center justify-between cursor-pointer" onClick={() => handleRowToggle(i)} role="button">
              <p className="flex-grow text-lg font-medium">{qna.question}</p>
              <span>
                <Image
                  src={triangle}
                  alt=""
                  className={classNames({
                    "rotate-180": qna.isOpen,
                  })}
                />
              </span>
            </div>
            {qna.isOpen && <div className="mt-[10px]">{qna.answer}</div>}
          </div>
        ))}
      </div>

      <a href={`mailto:${statics.contactEmail}`} className={classNames("inline-block btn-tut py-2 mt-[42px]", THEME_CLASSNAME_GREEN)}>
        I have a question!
      </a>
    </div>
  );
}
