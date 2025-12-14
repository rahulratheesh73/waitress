"use client";

import { useState } from "react";
import Image from "next/image";
import waiterImage from "@/public/waiter.png";

 export const ChatBotModal = () => {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const questions = [
    {
      question: "What type of taste are you looking for?",
      options: ["Spicy", "Sweet", "Sour", "Crunchy", "Healthy"],
    },
    {
      question: "What’s your meal timing?",
      options: ["Breakfast", "Lunch", "Dinner", "Snacks"],
    },
    {
      question: "Veg or Non-Veg?",
      options: ["Veg", "Non-Veg", "Both"],
    },
  ];

  const handleSelect = (value: string) => {
    const merged = { ...answers, [`q${step}`]: value } as Record<string, string>;
    setAnswers(merged);

    if (step < questions.length - 1) {
      setStep((s) => s + 1);
      return;
    }
    setOpen(false);
    setStep(0);
    setAnswers({});
  };

  return (
    <>
      {/* Floating Chatbot Button */}
      <div
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 cursor-pointer transition hover:scale-110"
      >
        <Image
          className="h-16 w-16 object-cover rounded-full shadow-lg ring-4 ring-orange-500"
          src={waiterImage}
          alt="Waiter"
          width={64}
          height={64}
        />
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-[90%] max-w-md rounded-2xl p-6 shadow-xl">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              {questions[step].question}
            </h2>

            <div className="grid grid-cols-2 gap-3">
              {questions[step].options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelect(opt)}
                  className="bg-orange-500 text-white py-2 px-3 rounded-xl hover:bg-orange-600 transition text-sm font-semibold shadow"
                >
                  {opt}
                </button>
              ))}
            </div>

            <button
              className="mt-6 w-full py-2 text-center border rounded-xl text-gray-700 font-medium hover:bg-gray-100"
              onClick={() => setOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};
