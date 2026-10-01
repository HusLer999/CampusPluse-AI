export const getTransitBriefingPrompt = (posts: any[]) => `
You are an expert campus transit dispatcher. Summarize the following recent student-submitted transit posts into a short, punchy "what you need to know right now" briefing (maximum 3 bullet points):
${JSON.stringify(posts, null, 2)}
`;