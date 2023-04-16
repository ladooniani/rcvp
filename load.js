function callLambda() {
  console.log("Call lambda function");
  fetch("https://d3s1nj7gz0.execute-api.eu-north-1.amazonaws.com/beta-test", {
    method: "POST",
    body: JSON.stringify({ number: 1 }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      alert(data.result);
    });
}
