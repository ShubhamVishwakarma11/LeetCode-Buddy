
const data = localStorage.getItem("GLOBAL_DATA:value");

const username = JSON.parse(data).userStatus.username;

(async () => {
    const response = await chrome.runtime.sendMessage({greeting: username});
    // do something with response here, not outside the function
    console.log(response);
  })();

console.log(JSON.parse(data).userStatus.username);

console.log(document.title);

