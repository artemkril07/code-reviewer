
// Структура апі запиту

export const sendRequest = async (request: string, aiPrompt: string) => {
  const url: string = "https://openrouter.ai/api/v1/chat/completions";

  // Стандртний запит апі з тілом і структурою самої нейронки
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_OPEN_ROUTER_API_KEY}`,
      "HTTP-Referer": "http://localhost:5173/",
      "X-Title": "Code Reviewer",
    },
    body: JSON.stringify({
      model: "qwen/qwen-2.5-coder-32b-instruct",
      messages: [
        {
          role: "system",
          content: aiPrompt,
        },
        {
          role: "user",
          content: request,
        },
      ],
    }),
  });

  // Перевірка на помилку відповіді зі сервера

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error?.message || "There is an technical issue");
  }
  return response;
};
