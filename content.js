document.addEventListener('DOMContentLoaded', () => {

  function checkActiveTab() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {

      if (tabs.length > 0) {
        const activeTab = tabs[0];
        console.log(activeTab); // This will log the entire tab object
        console.log("Active Tab", activeTab.url); // This will log the URL of the active tab

        const tabUrl = activeTab.url.toLowerCase(); 
        // updateButtonState(tabUrl);

        if (tabUrl.includes("hlx.page") || tabUrl.includes("hlx.live")) {
          chrome.scripting.executeScript({
            target: { tabId: activeTab.id },
            func: checkHelixSidekick
          },
          (results) => {
            if (results && results[0]) {
              const helixSidekick = results[0].result.helixSidekick;
              const btn = results[0].result.Btn;

              console.log(helixSidekick ? "Found it HS" : "Not Found HS");
              console.log(btn ? "Found it Btn" : "Not Found Btn");

              // Pass the results to the changeStatusFunc function
              changeStatusFunc(tabUrl, helixSidekick, btn);
            }
          });
        } else {
          console.log("Element: N/A");
          changeStatusFunc(tabUrl, false, false); // No HelixSidekick or Btn found
        }
      }
    });
  }

// Checking the existence of Aem Helix-Sidekick in Dom
function checkHelixSidekick() {
  const hostElement = document.querySelector('helix-sidekick');
  const shadowRoot = hostElement?.shadowRoot;
  const btn = shadowRoot?.querySelector('button[disabled]');

    return {
      helixSidekick: !!hostElement,
      Btn: !!btn,
    };
}
  // Variable for changes status 
    const button = document.querySelector('.Btn');
    const container = document.querySelector('.popup-container');
    const aemStat = document.querySelector('.aemStatus');
    const speech = document.querySelector('.balloon2');

function changeStatusFunc(tabUrl, helixSidekick, btn) {
  console.log("Helix-Sidekick", helixSidekick);
  const userDomUrl = tabUrl.includes("hlx.page") || tabUrl.includes("hlx.live");

  if (userDomUrl) {
    console.log("hlx-url = ", userDomUrl);

    if (helixSidekick) {
      console.log("Helix-Sidekick", helixSidekick);
      if (btn) {
        console.log("0");
        //SideDuck is INACTIVE
        button.disabled = false;
        button.classList.remove('gray');
        container.classList.remove('unlocked');
        speech.classList.remove('aemIsActive');
        aemStat.textContent = "Off";
      } else {
        console.log("1");
        //SideDuck is ACTIVE
        button.disabled = true;
        button.classList.add('gray');
        container.classList.add('unlocked');
        speech.classList.add('aemIsActive');
        aemStat.textContent = "On";
      }
    } else {
      console.log("Helix-Sidekick not Found ", helixSidekick);
    }
  } else {
      console.log("n/a");
      //SideKick is N/A
      button.disabled = true;
      button.classList.add('gray');
      container.classList.add('unlocked');
      speech.classList.add('aemInActive');
      aemStat.textContent = "N/A";
      container.classList.add('inActive');
  }
}

    // Remove the trailing slash from the active tab url
    button.addEventListener('click', () => {
      // Get the active tab
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length > 0) {
          const activeTab = tabs[0];
          const tabUrl = activeTab.url;
          const trimmedUrl = tabUrl.replace(/\/$/, ''); // Remove trailing slash

          if (trimmedUrl !== tabUrl) {
            // If the URL has been modified, reload the tab
            chrome.tabs.update(activeTab.id, { url: trimmedUrl });
          }
        }
      });
    });

    // Assume initial update based on current URL
    chrome.tabs.query({active: true, currentWindow: true}, tabs => {
        if (tabs.length > 0) {
            // updateButtonState(tabs[0].url);
            changeStatusFunc(tabs[0].url);
        }
    });

  // Initial check when the content script is loaded
  checkActiveTab();

 
});




