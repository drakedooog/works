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
  if (currentPage === "") currentPage = "index.html"; // 默认情况处理
  const navLinks = document.querySelectorAll(".nav a");

  navLinks.forEach((link) => {
    const linkPage = link.getAttribute("href");

    // 判断逻辑：如果当前是 index.html 或以 "work-" 开头，就高亮“作品”菜单
    if (
      (linkPage === "index.html" && currentPage.startsWith("works")) ||
      linkPage === currentPage
    ) {
      link.classList.add("active");
    }
  });

  // 创建返回顶部按钮组件
  (function createBackToTop() {
    const style = document.createElement("style");
    style.innerHTML = `
      #backToTop {
        position: fixed;
        bottom: 30px;
        right: 20px;
        width: 48px;
        height: 48px;
        border-radius: 50%;
        border: none;
        background-color: white;
        color: black;
        display: none;
        z-index: 999;
        cursor: pointer;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        transition: background-color 0.3s, color 0.3s;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
      }

      #backToTop:hover {
        background-color: black;
        color: white;
      }

      #backToTop svg {
        width: 20px;
        height: 20px;
      }
    `;
    document.head.appendChild(style);

    const btn = document.createElement("button");
    btn.id = "backToTop";
    btn.title = "返回顶部";
    btn.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
      stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 19V5" />
      <path d="M5 12l7-7 7 7" />
      </svg>
    `;
    document.body.appendChild(btn);

    window.addEventListener("scroll", () => {
      btn.style.display = window.scrollY > 300 ? "flex" : "none";
    });

    btn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  })();

  // 点击显示二维码
  document.addEventListener("DOMContentLoaded", function () {
    const qrWrapper = document.querySelector(".qr-wrapper");

    // 判断是否为移动设备
    const isMobile = "ontouchstart" in window || navigator.maxTouchPoints > 0;

    if (isMobile && qrWrapper) {
      qrWrapper.addEventListener("click", function (e) {
        e.stopPropagation(); // 防止冒泡
        qrWrapper.classList.toggle("active");
      });

      // 点击页面其他地方关闭二维码
      document.addEventListener("click", function () {
        qrWrapper.classList.remove("active");
      });
    }
  });
}
