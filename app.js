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
        issueText = `Issue: ${pipe.issueHistory[0]}`;
      }
      output += `
      <li class="list-group-item d-flex justify-content-between align-items-center">
      Pipe ID: ${pipe.id} ${issueText}
      <span class="badge badge-primary bg-${status}">${pipe.status}</span></li>
            `;
    });
    pipeList.innerHTML = output;
  });
