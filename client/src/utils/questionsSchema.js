// questionsSchema.js: JSON schema for questions (for reference)
export const QUESTIONS_SCHEMA = {
  type: 'object',
  properties: {
    questions: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          text: { type: 'string' },
          options: {
            type: 'array',
            items: { type: 'string' },
            minItems: 4,
            maxItems: 4,
          },
          correctOption: { type: 'number' },
        },
        required: ['text', 'options', 'correctOption'],
      },
      minItems: 1,
    },
  },
  required: ['questions'],
};
