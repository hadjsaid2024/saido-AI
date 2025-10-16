const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

const API_KEY = "YOUR_OPENAI_KEY" OpenAI API الخاص بك

async function sendMessage() {
  const message = userInput.value.trim();
  if (!message) return;

  appendMessage("أنت", message);
  userInput.value = "";

  appendMessage("🤖", "جارٍ التفكير...");

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }]
      })
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "حدث خطأ!";
    updateLastMessage("🤖", reply);

  } catch (error) {
    updateLastMessage("🤖", "عذرًا، حدث خطأ أثناء الاتصال 😢");
    console.error(error);
  }
}

function appendMessage(sender, text) {
  const msg = document.createElement("p");
  msg.innerHTML = `<strong>${sender}:</strong> ${text}`;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function updateLastMessage(sender, text) {
  const msgs = chatBox.getElementsByTagName("p");
  msgs[msgs.length - 1].innerHTML = `<strong>${sender}:</strong> ${text}`;
}

sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});
