// Get the scan button element
const scanButton = document.getElementById("scan");

// Get the results element
const results = document.getElementById("results");

// Add a click event listener to the scan button
scanButton.addEventListener("click", function() {
  window.open('https://keepa.com/#!product/1-B0BWYTHXCG', '_blank');
  // Send a message to the content script to scan the page
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {action: "scan"}, function(response) {
      // Display the response from the content script in the results element
      results.innerHTML = response;
    });
  });
});

// Listen for web requests
chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
      // Check if the request is from an e-commerce platform
      if (details.url.includes("amazon.com") || details.url.includes("ebay.com")) {
        // Store the request url in the local storage
        chrome.storage.local.set({url: details.url});
      }
    },
    {urls: ["<all_urls>"]}
  );

  // Listen for messages from the popup
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    // Check if the message is to scan the page
    if (request.action === "scan") {
      // Get the url of the page from the local storage
      chrome.storage.local.get("url", function(data) {
        // Check if the url is from an e-commerce platform
        if (data.url.includes("amazon.com") || data.url.includes("ebay.com")) {
          // Scan the page for dark patterns using some logic or algorithm
          // For example, you can use text analysis, layout analysis, color analysis, etc.
          // You can also use machine learning or natural language processing to enhance your detection accuracy and coverage
          // For simplicity, let's assume we have a function called detectDarkPatterns that returns an array of dark patterns found on the page
          const darkPatterns = detectDarkPatterns(data.url);
  
          // Send the response to the popup with the dark patterns found
          sendResponse(`Dark patterns detected: ${darkPatterns.join(", ")}`);
        } else {
          // Send the response to the popup with a message that the page is not from an e-commerce platform
          sendResponse("This page is not from an e-commerce platform.");
        }
      });
    }
  });
  
  
// Add a click event listener to the open chatbot button
chatbotBtn.addEventListener('click', function () {
  // Open chatbot modal on the right side
  openChatbotWindow();
});

function openChatbotWindow() {
  console.log('Opening chatbot window...');
  const chatbotWindow = window.open('https://001fc79eb2f5fc2922.gradio.live/', '_blank', 'width=300,height=1000,right=0,top=0');

  if (chatbotWindow) {
    console.log('Chatbot window opened successfully.');
    // Focus the chatbot window if it was successfully opened
    chatbotWindow.focus();
  } else {
    console.error('Failed to open chatbot window.');
    // Handle if the popup was blocked
    alert('Popup blocked! Please enable popups for this site to open the chatbot.');
  }
}
  function closeChatbotWindow() {
    const chatbotModal = document.querySelector('.chatbot-modal');
    if (chatbotModal) {
      chatbotModal.remove();
    }
  }
