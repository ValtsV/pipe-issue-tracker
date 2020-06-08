const pipeList = document.getElementById("pipeList");

fetch("pipes.json")
  .then((res) => res.json())
  .then((data) => {
    let output = "";
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
      output += `
      <li class="list-group-item d-flex justify-content-between align-items-center">
      <div>ID: <b>${pipe.id}</b>   <span class="marg-l">${issueText}</span></div>
      <span class="badge badge-primary bg-${status} marg-l">${pipe.status}</span></li>
            `;
    });
    pipeList.innerHTML = output;
  });
