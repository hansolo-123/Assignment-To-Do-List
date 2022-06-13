async function sendGetRequest() {
  try {
    const url = "http://localhost:3000";
    const response = await fetch(`${url}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch posts: ${response.status}`);
    }
    await response.json().then((results) => {
      for (let i = 0; i < results.length; i++);
      const item = results.map((data, i) => ({
        number: "#" + [i + 1],
        description: data.description,
        time: new Date(data._createdOn).toLocaleString("en-GB"),
        finished: data.done,
        id: data._id,
      }));
      appendData(item);
    });
  } catch (e) {
    console.log(e);
  }
}
const appendData = (item) => {
  console.log(item);
  document.getElementById;
  const allTrash = document.getElementById("all-trash");
  allTrash.addEventListener("click", function () {
    deleteThese(item);
  });
  const allDone = document.getElementById("markall");
  allDone.addEventListener("click", function () {
    updateThese(item);
  });
  document.addEventListener(
    "keyup",
    delay(function (e) {
      if (e.target && e.target.classList == "description") {
        let id = [];
        id.push(e.target.id);
        let value = [];
        value.push(e.target.innerHTML);
        console.log("id: " + id + " changed value to: " + value);
        sendUpdateValueRequest(id, value);
      }
    }, 2000)
  );

  var ele = document.getElementById("check-all");
  ele.addEventListener("change", function () {
    checkedAll(ele);
  });

  document.addEventListener("click", function (e) {
    if (e.target && e.target.classList == "fa-solid fa-trash-can") {
      let id = [];
      id.push(e.target.parentElement.id);
      deletePostRequest(id);
    }
  });
  document.addEventListener("click", function (e) {
    if (e.target && e.target.classList == "mark-done") {
      let id = [];
      id.push(e.target.id);
      sendUpdateDoneRequest(id);
    }
  });
  const sendTask = document.getElementById("send-task");
  const inputField = document.getElementById("input-task");
  inputField.onkeyup = function (e) {
    if (e.key === "Enter") {
      sendTask.click();
    }
  };
  sendTask.addEventListener("click", function () {
    value = document.getElementById("input-task").value;
    console.log(value);
    if (value == "" && " ") {
      value = document.getElementById("input-task").placeholder =
        "This line can not be empty";
      return;
    } else {
      sendPostRequest(value);
    }
  });
  let container = document.getElementById("container2");
  const itemHTMLString = item
    .map(
      (items) => `
  <li>
   <h3><input type="checkbox" class="check" name="check" value="check"></h3>
   <h3 div class= "item" id="">${items.number}</h3> 
   <h3 div class= "description" id="${items.id}" contenteditable="true">${items.description}</h3>
    <h3 div class="time">${items.time}</h3>
    <h3 div class="finished" id="${items.finished}">${items.finished}</h3>
    <h3 div class= "click-btn" input type="button" id="${items.id}"><i class="fa-solid fa-trash-can"></i></h3>
    <input
        type="button"
        class="mark-done"
        id="${items.id}"
        name="mark-done"
        value="mark as done"
      />
      </li>
        `
    )
    .join(" ");

  container.innerHTML = itemHTMLString;
};
async function sendPostRequest(value) {
  const data = { description: `${value}`, done: false };
  const url = "http://localhost:3000";
  fetch(
    `${url}`,
    {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    },
    { once: true }
  );
  value = document.getElementById("input-task").value = "";
  sendGetRequest();
}
async function sendUpdateDoneRequest(id) {
  id.forEach((id) => {
    const data = { done: true };
    const url = `http://localhost:3000/${id}`;
    fetch(`${url}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }),
      { once: true };
  });
  sendGetRequest();
}

function checkedAll(ele) {
  var checkboxes = document.getElementsByClassName("check");
  const container2 = document.getElementById("container2")
    if (ele.checked) {
    for (var i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].type == "checkbox") {
        checkboxes[i].checked = true;
        container2.classList.add("underline")
      }
      
    }
  } else {
    for (var i = 0; i < checkboxes.length; i++) {
      console.log(i);
      if (checkboxes[i].type == "checkbox") {
        checkboxes[i].checked = false;
      }
      container2.classList.remove("underline")
    }
  }
}

const updateThese = function (item) {
  const id = item.map((id) => id.id);
  return sendUpdateDoneRequest(id);
};
const deleteThese = function (item) {
  const id = item.map((id) => id.id);
  return deletePostRequest(id);
};
const deleteThis = function (item) {
  const id = item.map((id) => id.id);
  console.log(id);
  return deletePostRequest(id);
};
async function deletePostRequest(id) {
  id.forEach((id) => {
    const url = `http://localhost:3000/${id}`;
    fetch(`${url}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  });
  sendGetRequest();
}
async function sendUpdateValueRequest(id, value) {
  id.forEach((id) => {
    const data = { description: `${value}` };
    const url = `http://localhost:3000/${id}`;
    fetch(`${url}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }),
      { once: true };
  });
  sendGetRequest();
}
function delay(callback, ms) {
  var timer = 0;
  return function () {
    var context = this,
      args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      callback.apply(context, args);
    }, ms || 0);
  };
}
sendGetRequest();
