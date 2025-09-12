import { QuizQuestion, QuizAnswer } from '@/types/quiz';

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question_text: "Wat heeft jouw wijk het hardst nodig?",
    order_index: 1
  },
  {
    id: 2,
    question_text: "Wat is het symbool van Schiedam?",
    order_index: 2
  },
  {
    id: 3,
    question_text: "Hoe wil je dat Schiedam groeit?",
    order_index: 3
  }
];

export const quizAnswers: QuizAnswer[] = [
  // Question 1 answers
  {
    id: 1,
    question_id: 1,
    answer_text: "Meer groen",
    meme_template_slug: "park-template",
    result_text: "kiest voor een groener Schiedam"
  },
  {
    id: 2,
    question_id: 1,
    answer_text: "Betere speelplaatsen",
    meme_template_slug: "speeltuin-template",
    result_text: "kiest voor meer jeugdplezier"
  },
  {
    id: 3,
    question_id: 1,
    answer_text: "Veiliger verkeer",
    meme_template_slug: "verkeer-template",
    result_text: "kiest voor veiliger straten"
  },
  // Question 2 answers
  {
    id: 4,
    question_id: 2,
    answer_text: "De molens",
    meme_template_slug: "molens-template",
    result_text: "kiest voor behoud van ons erfgoed"
  },
  {
    id: 5,
    question_id: 2,
    answer_text: "Jenever",
    meme_template_slug: "jenever-template",
    result_text: "kiest voor een sterke toekomst"
  },
  {
    id: 6,
    question_id: 2,
    answer_text: "Stroopwafels",
    meme_template_slug: "stroopwafel-template",
    result_text: "kiest voor de zoete punten"
  },
  // Question 3 answers
  {
    id: 7,
    question_id: 3,
    answer_text: "Meer woningen",
    meme_template_slug: "woningen-template",
    result_text: "kiest voor betaalbare woningen"
  },
  {
    id: 8,
    question_id: 3,
    answer_text: "Betere openbaar vervoer",
    meme_template_slug: "ov-template",
    result_text: "kiest voor beter openbaar vervoer"
  },
  {
    id: 9,
    question_id: 3,
    answer_text: "Meer cultuur",
    meme_template_slug: "cultuur-template",
    result_text: "kiest voor een cultureel Schiedam"
  }
];