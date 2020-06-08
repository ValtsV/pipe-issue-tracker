const pipeList = document.getElementById("pipeList");
const pipeSelect = document.getElementById("pipeSelect");

fetch("pipes.json")
  .then((res) => res.json())
  .then((data) => {
    let listOutput = "";
    let selectOutput = `<option value="" disabled selected hidden>Pipe ID</option>`;
    data.map((pipe) => {
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
        issueText = `<b>Issue:</b> ${pipe.issueHistory[0]}`;
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
    console.log(selectOutput);
  });
