// chrome.runtime.onInstalled.addListener(() => {
//   chrome.tabs.onActivated.addListener((activeInfo) => {
//     console.log("Tab Activated");
//     console.log(activeInfo);

//     chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//       if (tabs.length > 0) {
//         const activeTab = tabs[0];
//         console.log(activeTab); // This will log the entire tab object
//         console.log(activeTab.url); // This will log the URL of the active tab
//       }
//     });
    
//   });
// });

chrome.runtime.onInstalled.addListener(() => {
  chrome.tabs.onActivated.addListener((activeInfo) => {
    console.log("Tab Activated ********************************");
    console.log(activeInfo);

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0) {
        const activeTab = tabs[0];
        console.log(activeTab); // This will log the entire tab object
        console.log(activeTab.url); // This will log the URL of the active tab

        // // Inject content script to manipulate DOM
        // chrome.scripting.executeScript({
        //   target: { tabId: activeTab.id, files: ['content.js']},
        //   function: () => {
        //     const elementExists = document.querySelector('helix-sidekick');
        //     if (elementExists) {
        //       console.log("It's here");
        //     }
            
        //   },
        // });
      }
    });
  });

  // chrome.tabs.onActivated.addListener(async info => {

  //   // renders the value to console
  //   let domRes = await chrome.scripting.executeScript({
  //     target: {tabId: info.tabId},
  //     func: getDOM,
  //   }).catch(console.error);

  //       // Send a message to the content script with the DOM result
  //       // chrome.tabs.sendMessage(info.tabId, domRes[0].result);

  //   if (!domRes) return;

  //   console.log(domRes, "SideDuck");
    
  // });

  // function getDOM() {
  //   const hostElement = document.querySelector('helix-sidekick');

  //   if (hostElement) {
  //       const shadowRoot = hostElement.shadowRoot;
  //       const button = shadowRoot.querySelector('button[disabled]');
        
  //       // Return an object indicating the status
  //       if (button) {
  //           return { status: 'Disable', message: 'Button found but inActive', button: false };
  //       } else {
  //           return { status: 'Enable', message: 'Button found Activated', button: true };
  //       }
  //   } else {
  //       return { status: 'Not Available', message: 'AEM Sidekick not found', button: false };
  //   }
  // };

  // // // This fx check the existence of AEM Sidekick in the active page
  // function checkForSidekick() {
  //   return !!document.querySelector('helix-sidekick');
  // };

  //   chrome.tabs.onActivated.addListener(async info => {
  //     let [domRes] = await chrome.scripting.executeScript({
  //       target: {tabId: info.tabId},
  //       func: checkForSidekick,
  //     }).catch(console.error);

  //     if (!domRes || domRes.result === undefined) return;

  //     console.log(domRes.result ? "Sidekick is available" : "Sidekick is not available");
      
  //   });

    

//     // Function to handle messages
// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//     if (request.action === "getDOMStatus") {
//         const domStatus = getDOM();
//         sendResponse(domStatus);
//     }
//     return true;
//   })

  //   // This function will run checkForSidekick and send the result back to the content script
  // function sendSidekickStatus() {
  //   const sidekickExists = checkForSidekick();
  //   window.postMessage({ type: 'CHECK_FOR_SIDEKICK', sidekickExists }, '*');
  // }

  // // Run the function immediately
  // sendSidekickStatus();



  
});

