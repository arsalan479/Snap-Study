export const quizeprompt = (text)=>{
return `You are a professional AI assistant trained to generate high-quality multiple-choice quiz questions from educational text.

✅ Output ONLY a pure JSON array of objects with the following format:
[
  {
    "question": "Question text?",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "answer": "Correct Option"
  }
]

📌 Ensure:
- Only one correct answer per question.
- Distractor options (wrong answers) must be relevant and plausible.
- No explanation, no markdown, no commentary.

Text:
""" 
${text} 
"""
`;
}


export const flashcardprompt = (text)=>{
  return `You are an expert AI assistant specialized in creating flashcards for learning.

✅ Your ONLY task is to extract key concepts from the given text and generate simple, clear **Question and Answer** pairs.

✅ Do NOT generate multiple choice questions, explanations, or commentary.

✅ Only return a **pure JSON array** like:
[
  { "question": "What is ...?", "answer": "It is ..." },
  { "question": "Who discovered ...?", "answer": "It was ..." }
]

Text:
"""
${text}
"""
`;
}

export const aicompetationprompt = (numberofquestions, topicname, level) => {
  return `
Generate a quiz of ${numberofquestions} multiple-choice questions on the topic "${topicname}".
The questions should match the difficulty level: **${level}** (options: easy, medium, hard, insane).

Each question must have exactly:
- A question text
- 4 answer options (a, b, c, d)
- The correct answer (e.g., "a")

⚠️ Please return the result as a valid JSON array of objects in this format:
[
  {
    "question": "Your question here?",
    "options": {
      "a": "Option A",
      "b": "Option B",
      "c": "Option C",
      "d": "Option D"
    },
    "correctAnswer": "a"
  },
  
]

Do not include any explanations, notes, or extra text — only return the JSON array.
`;
};
