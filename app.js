const pipeList = document.getElementById("pipeList");

fetch("pipes.json")
  .then((res) => res.json())
  .then((data) => {
    let output = "";
    data.map((pipe) => {
      let status = "";
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
      output += `

              <button type="button" class="btn btn-${status} ">Pipe ID: ${pipe.id} Status: ${pipe.status}</button>
            `;
    });
    pipeList.innerHTML = output;
  });
