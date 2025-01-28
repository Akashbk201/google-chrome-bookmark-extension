let allLinks = [];

let getInput = document.getElementById("get-input");
let outputBox = document.getElementById("output-box");
let saveBtn = document.getElementById("save-btn");
let currentTab = document.getElementById("current-btn");
let deleteBtn = document.getElementById("del-btn");

let getLinkFromLocal = JSON.parse(localStorage.getItem("Links"));

if (getLinkFromLocal) {
  allLinks = getLinkFromLocal;
  renderArr(allLinks);
}

function renderArr(arr) {
  outputBox.innerHTML = "";
  arr.forEach((item) => {
    outputBox.innerHTML += `
    <li><a href=${item} target="_blank">${item}</a></li>
    `;
  });
}

saveBtn.addEventListener("click", () => {
  let link = getInput.value;
  allLinks.push(link);
  getInput.value = "";
  renderArr(allLinks);
  localStorage.setItem("Links", JSON.stringify(allLinks));
});

deleteBtn.addEventListener("click", () => {
  localStorage.clear();
  allLinks = [];
  getInput.value = "";
  renderArr(allLinks);
});

currentTab.addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    // since only one tab should be active and in the current window at once
    // the return variable should only have one entry
    var activeTab = tabs[0].url;
    allLinks.push(activeTab);
    localStorage.setItem("Links", JSON.stringify(allLinks));
    renderArr(allLinks);
  });
});
