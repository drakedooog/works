fetch("header.html")
  .then((res) => res.text())
  .then((data) => {
    document.getElementById("header-container").innerHTML = data;
    // header 加载完成后，执行高亮逻辑
    highlightCurrentNav();
  });
fetch("footer.html")
  .then((res) => res.text())
  .then((data) => {
    document.getElementById("footer-container").innerHTML = data;
  });

// 封装高亮函数
function highlightCurrentNav() {
  const currentPage = window.location.pathname.split("/").pop();
  const navLinks = document.querySelectorAll(".nav a");

  navLinks.forEach((link) => {
    const linkPage = link.getAttribute("href");

    // 判断逻辑：如果当前是 works.html 或以 "work-" 开头，就高亮“作品”菜单
    if (
      (linkPage === "works.html" && currentPage.startsWith("works")) ||
      linkPage === currentPage
    ) {
      link.classList.add("active");
    }
  });
}
