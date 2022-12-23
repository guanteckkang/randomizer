let form = document.getElementById("form"); //the form
let item = document.getElementById("item"); //the input
let list = document.getElementById("list"); //the ul
let chosen = document.getElementById("chosen"); //the div answer
let pick = document.getElementById("pick"); //the pick button
let clear = document.getElementById("clear"); //the clear button
let details = document.getElementById("details"); //the details elements

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!details) return;
  details.setAttribute("open", "true");
  let formData = new FormData(form);
  let data = formData.get("item");
  if (!data) {
    list.innerHTML = "Add item please";
    setTimeout(() => {
      details.removeAttribute("open");
    }, 1000);
    setTimeout(() => {
      list.innerHTML = "";
    }, 2000);
  } else {
    addToList(data);
    showStatus(data);
    form.reset();
    localStorage.setItem("randomize", list.innerHTML);
  }
});
function addToList(i) {
  let li = document.createElement("li");
  li.innerHTML = i;
  list.append(li);
}

// part 2
function shuffle(array) {
  let currentIndex = array.length;
  let temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}
pick.addEventListener("click", () => {
  let lilist = Array.from(document.querySelectorAll("li"));
  if (lilist.length === 0) {
    chosen.innerHTML = "add list";
    setTimeout(() => {
      chosen.innerHTML = "";
    }, 2000);
  } else if (lilist.length === 1) {
    chosen.innerHTML = "add more list";
    setTimeout(() => {
      chosen.innerHTML = "";
    }, 2000);
  } else {
    shuffle(lilist);
    chosen.innerHTML = lilist[0].innerHTML;
  }
});
// part 3
function showStatus(item) {
  let notification = document.createElement("div");
  notification.setAttribute("aria-live", "polite");
  form.append(notification);
  setTimeout(() => {
    notification.textContent = `${item} was added to the list.`;
  }, 1);
  setTimeout(() => {
    notification.remove();
  }, 3000);
}
// part 4
function loadList() {
  let saved = localStorage.getItem("randomize");
  if (!saved) {
    details.removeAttribute("open");
  } else {
    details.setAttribute("open", "true");
    list.innerHTML = saved;
  }
}
loadList();

clear.addEventListener("click", () => {
  localStorage.removeItem("randomize");
  list.innerHTML = "";
  chosen.innerHTML = "";
  if (!details) return;
  details.removeAttribute("open");
});
