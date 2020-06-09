// get output elems
const pipeList = document.getElementById("pipeList");
const pipeSelect = document.getElementById("pipeSelect");

// get json / output
fetch("pipes.json")
  .then((res) => res.json())
  .then((data) => {
    let listOutput = "";
    let selectOutput = `<option value="" disabled selected hidden>Pipe ID</option>`;
    data.pipes.map((pipe) => {
      let status = "",
        issueText = "";

      switch (pipe.status) {
        case "working":
          status = "success";
          break;
        case "fixing":
          status = "warning";
          break;
        default:
          status = "danger";
          break;
      }

      if (status === "warning" || status === "danger") {
        issueText = `<b>Issue:</b> ${pipe.issue}`;
      }
      listOutput += `
      <li class="list-group-item d-flex justify-content-between align-items-center">
      <div>ID: <b>${pipe.id}</b>   <span class="ml-3">${issueText}</span></div>
      <span class="badge badge-primary bg-${status} ml-3 badge-width">${pipe.status}</span></li>
            `;

      selectOutput += `
      <option value="${pipe.id}">${pipe.id}</option>
      `;
    });
    pipeList.innerHTML = listOutput;
    pipeSelect.innerHTML = selectOutput;
  });

// update JSON

const statusSelect = document.getElementById("statusSelect");
const issueInput = document.getElementById("issueInput");
const workerInput = document.getElementById("workerInput");
const submitIssue = document.getElementById("submitIssue");

submitIssue.addEventListener("click", () => {
  let data = {
    status: statusSelect.value,
    assignedWorker: workerInput.value,
    issue: issueInput.value,
  };
  if (statusSelect.value !== "working") {
    data = {
      status: statusSelect.value,
      assignedWorker: workerInput.value,
      issue: issueInput.value,
    };
  } else {
    data = {
      status: "working",
      assignedWorker: null,
      issue: null,
    };
  }

  fetch(`http://localhost:3000/pipes/${parseInt(pipeSelect.value)}`, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json/",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      setTimeout(() => console.log("Success", data), 10000);
    })
    .catch((err) => {
      console.log(err);
    });

  console.log(JSON.stringify(data));
});

// console.log(statusInput);

// fetch("pipes.json/", {
//   method: "PUT",
//   headers: {
//     "Content-Type": "application/json/",
//   },
//   body: JSON.stringify(data),
// })
//   .then((res) => res.json())
//   .then((data) => {
//     console.log(data);
//   });
