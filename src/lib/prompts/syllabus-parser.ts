export const getSyllabusParserPrompt = (syllabusText: string) => `
You are an expert AI academic assistant for university students. 
Analyze the following course syllabus text and extract structured JSON data according to the schema provided. 

Guidelines:
- Extract course name, code, instructor, and meeting times if available.
- Extract assignments, quizzes, midterms, and finals with their due dates and grade weights (as a percentage, e.g., 15 for 15%). If a date is ambiguous, use a descriptive string or omit it rather than inventing a false date.
- Extract weekly topics and reading lists.

Syllabus Text:
"""
${syllabusText}
"""
`;