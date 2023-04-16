function callLambda() {
  const myButton = document.getElementById("myButton");
  const response = document.getElementById("response");
  myButton.addEventListener("click", () => {
    console.log("Call Lambda function");
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
  });
}
