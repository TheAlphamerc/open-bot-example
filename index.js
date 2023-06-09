const scriptTag = document.currentScript;
const brandColor = scriptTag.getAttribute("brandColor");

const CHAT_BUTTON_SIZE = 50; // size of the chat button in pixels
const CHAT_BUTTON_RADIUS = CHAT_BUTTON_SIZE / 2; // radius of the chat button in pixels
const OPEN_BOT_BRAND_COLOR = brandColor ?? "#0445fe";
const CHAT_BUTTON_ICON = `
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="#FFFFFF" width="24" height="24">
<path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
</svg>

`;

const CHAT_BUTTON_CLOSE_ICON = `
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="#FFFFFF" width="24" height="24">
  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
</svg>
`;

// create the chat button element
const chatButton = document.createElement("div");
const bubbleVisibility = scriptTag.getAttribute("bubbleVisibility");

// apply styles to the chat button
chatButton.setAttribute("id", "openchat-bubble-button");
chatButton.style.position = "fixed";
chatButton.style.bottom = "20px";
chatButton.style.right = "20px";
chatButton.style.width = CHAT_BUTTON_SIZE + "px";
chatButton.style.height = CHAT_BUTTON_SIZE + "px";
chatButton.style.borderRadius = CHAT_BUTTON_RADIUS + "px";
chatButton.style.backgroundColor = OPEN_BOT_BRAND_COLOR;
chatButton.style.boxShadow = "0 4px 8px 0 rgba(0, 0, 0, 0.2)";
chatButton.style.cursor = "pointer";
chatButton.style.zIndex = 999999999;
chatButton.style.transition = "all .2s ease-in-out";

chatButton.addEventListener("mouseenter", (event) => {
  chatButton.style.transform = "scale(1.05)";
});
chatButton.addEventListener("mouseleave", (event) => {
  chatButton.style.transform = "scale(1)";
});

// Hide the chat button if the bubbleVisibility is set to hidden
if (bubbleVisibility === "hidden") {
  chatButton.style.scale = "0%";
}

/**
 * Open or close the chat button
 */
function openBotBubble(state) {
  if (state === "open") {
    chatButton.style.scale = "100%";
    chatButton.style.transition = "all .2s ease-in-out";
  } else if (state === "close") {
    chatButton.style.scale = "0%";
    chatButton.style.transition = "all .2s ease-in-out";
    // close the chat window if it is open
    chat.style.display = "none";
  }
}

// create the chat button icon element
const chatButtonIcon = document.createElement("div");

// apply styles to the chat button icon
chatButtonIcon.style.display = "flex";
chatButtonIcon.style.alignItems = "center";
chatButtonIcon.style.justifyContent = "center";
chatButtonIcon.style.width = "100%";
chatButtonIcon.style.height = "100%";
chatButtonIcon.style.zIndex = 999999999;

// add the chat button icon to the chat button element
chatButtonIcon.innerHTML = CHAT_BUTTON_ICON;

chatButton.appendChild(chatButtonIcon);

// add the chat button to the page

// toggle the chat component when the chat button is clicked
chatButton.addEventListener("click", () => {
  // toggle the chat component
  if (chat.style.display === "none") {
    chat.style.display = "flex";
    chatButtonIcon.innerHTML = CHAT_BUTTON_CLOSE_ICON;
  } else {
    chat.style.display = "none";
    chatButtonIcon.innerHTML = CHAT_BUTTON_ICON;
  }
});

const chat = document.createElement("div");
chat.setAttribute("id", "openbot-bubble-window");

chat.style.position = "fixed";
chat.style.flexDirection = "column";
chat.style.justifyContent = "space-between";
chat.style.bottom = "80px";
chat.style.right = "20px";
chat.style.width = "85vw";
chat.style.height = "70vh";
chat.style.boxShadow =
  "rgba(150, 150, 150, 0.15) 0px 6px 24px 0px, rgba(150, 150, 150, 0.15) 0px 0px 0px 1px";
chat.style.display = "none";
chat.style.borderRadius = "10px";
chat.style.zIndex = 999999999;
chat.style.overflow = "hidden";

document.body.appendChild(chat);

// src="http://localhost:3000/assistent/${scriptTag.id}"
chat.innerHTML = `<iframe
    id="chatIframe"
    src="https://open-bot-client-thealphamerc.vercel.app/assistent/${scriptTag.id}"
    width="100%"
    height="100%"
    frameborder="0">
  </iframe>`;

// Create a condition that targets viewports at least 768px wide
const mediaQuery = window.matchMedia("(min-width: 550px)");

function handleChatWindowSizeChange(e) {
  // Check if the media query is true
  if (e.matches) {
    chat.style.height = "600px";
    chat.style.width = "400px";
  }
}

// Register event listener
mediaQuery.addEventListener("change", handleChatWindowSizeChange);

// Initial check
handleChatWindowSizeChange(mediaQuery);
document.body.appendChild(chatButton);
