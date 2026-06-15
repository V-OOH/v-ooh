let select = document.getElementById("select_language");

select.addEventListener("change", () => {
  console.log("Alteração");
  if (select.value == "pt-br") {
    window.location.href = "/index.html";
  } else {
    window.location.href = "../en-us/index.html";
  }
});
