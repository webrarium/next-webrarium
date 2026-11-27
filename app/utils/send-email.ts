import { FormData } from "@/app/components/StoryblokComponents/Contact/Contact";

export async function sendEmail(data: FormData) {
  const apiEndpoint = "/api/mail";

  try {
    const response = await fetch(apiEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const jsonResponse = await response.json();
    console.log(jsonResponse.message);
    return jsonResponse.message;
  } catch (err) {
    console.log(err);
  }
}
