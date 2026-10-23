getDate();
function getDate() {
  var d = new Date();
  var n = d.getFullYear();
  var cpr = "Copyright &copy; " + n + " Lado Oniani Engineering Research. All Rights Reserved.";
  document.getElementById("cr").innerHTML = cpr;
}
