document.addEventListener('DOMContentLoaded', () => {

  function checkActiveTab() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {

      if (tabs.length > 0) {
        const activeTab = tabs[0];
        console.log(activeTab); // This will log the entire tab object
        console.log("Active Tab", activeTab.url); // This will log the URL of the active tab

        const tabUrl = activeTab.url;
        updateButtonState(tabUrl);
        test(tabUrl);

      }
    });
  }

    const button = document.querySelector('.Btn');
    const container = document.querySelector('.popup-container');
    const aemStat = document.querySelector('.aemStatus');
    const speech = document.querySelector('.balloon2');

  function updateButtonState(tabUrl) {
    if (tabUrl.includes("hlx.live") || tabUrl.includes("hlx.page")) {
      if(tabUrl && tabUrl.endsWith('/')){
        //SideDuck is INACTIVE
        button.disabled = false;
        button.classList.remove('gray');
        container.classList.remove('unlocked');
        speech.classList.remove('aemIsActive');
        aemStat.textContent = "OFF";
      } else {  
        //SideDuck is ACTIVE
        button.disabled = true;
        button.classList.add('gray');
        container.classList.add('unlocked');
        speech.classList.add('aemIsActive');
        aemStat.textContent = "ON";
      }
    } else {
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
            updateButtonState(tabs[0].url);
        }
    });

  // Initial check when the content script is loaded
  checkActiveTab();

  function test(tabUrl){
    const hostElement = document.querySelector('helix-sidekick')?.shadowRoot?.querySelector('button[disabled]');
    const userDomUrl = (tabUrl.includes("hlx.page") || tabUrl.includes("hlx.live"));
    const isSidekick = userDomUrl && hostElement;
    
    if (userDomUrl) {
      if(hostElement == null){
         aemStat.textContent = "on";
         console.log("1")
      }else{
        aemStat.textContent = "off";
        console.log("0")
      }
    } else {
      aemStat.textContent ="n/a"
      console.log("_")
    }
  }


    //  // Request the DOM status from background.js
    // chrome.runtime.sendMessage({ action: "getDOMStatus" }, (response) => {
    //     if (response) {
    //       console.log("gumana" + response.status);
    //         updateButtonState(response);
    //     }
    // });



      // This fx check the existence of AEM Sidekick in the active page

});




