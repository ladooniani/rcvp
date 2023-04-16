function callLambda1() {
  const response = document.getElementById("response");
  console.log("Call lambda function 1");
  fetch("https://d3s1nj7gz0.execute-api.eu-north-1.amazonaws.com/beta-test", {
    method: "POST",
    body: JSON.stringify({ number: 1 }),
  })
    .then((response) => response.json())
    .then((data) => {
      response.innerHTML = data;
      console.log(data);
      alert(data.result);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function callLambda2() {
  const response = document.getElementById("response");
  console.log("Call Lambda function 2");
  fetch("https://d3s1nj7gz0.execute-api.eu-north-1.amazonaws.com/beta-test")
    .then((response) => response.json())
    .then((data) => {
      response.innerHTML = data;
      console.log(data);
      alert(data.result);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
