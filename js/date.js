getDate();
function getDate() {
  var d = new Date();
  var n = d.getFullYear();
  var cpr = "Copyright &copy; " + n + " Lado Oniani Software Research";
  document.getElementById("cr").innerHTML = cpr;
}
