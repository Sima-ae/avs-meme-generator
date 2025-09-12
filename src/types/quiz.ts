export interface QuizQuestion {
  id: number;
  question_text: string;
  order_index: number;
}

export interface QuizAnswer {
  id: number;
  question_id: number;
  answer_text: string;
  meme_template_slug: string;
  result_text: string;
}

export interface QuizState {
  currentQuestionIndex: number;
  answers: Record<number, number>; // questionId -> answerId
  isComplete: boolean;
  userName: string;
}

export interface MemeTemplate {
  slug: string;
  background: string;
  textColor: string;
  position: {
    x: number;
    y: number;
  };
  fontSize: number;
  fontFamily: string;
}