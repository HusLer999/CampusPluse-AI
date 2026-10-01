export const getListingGeneratorPrompt = (roughText: string) => `
You are an expert student marketplace assistant. Turn the following rough item description or notes into a clean, attractive, and honest student marketplace listing. 
Return a strict JSON object with two fields: "title" and "description".

Rough input:
"""
${roughText}
"""
`;