// ========== 页面加载入口 ==========
document.addEventListener("DOMContentLoaded", () => {
  loadHeader();
  loadFooter();
  createBackToTopButton();
});

// ========== 1. 加载 header，并处理导航激活 + 二维码逻辑 ==========
function loadHeader() {
  fetch("header.html")
    .then((res) => res.text())
    .then((data) => {
      document.getElementById("header-container").innerHTML = data;

      highlightCurrentNav();
      enableQRCodeToggle();
    });
}

// ========== 2. 加载 footer ==========
function loadFooter() {
  fetch("footer.html")
    .then((res) => res.text())
    .then((data) => {
      document.getElementById("footer-container").innerHTML = data;
    });
}

// ========== 3. 导航栏当前页面高亮 ==========
function highlightCurrentNav() {
  let currentPage = window.location.pathname.split("/").pop();
  if (currentPage === "") currentPage = "index.html"; // 默认首页

  const navLinks = document.querySelectorAll(".nav a");

  navLinks.forEach((link) => {
    const linkPage = link.getAttribute("href");

    if (
      // ✅ 支持作品详情页（works-1.html、works-detail.html 等）
      (linkPage === "index.html" && currentPage.includes("works")) ||
      linkPage === currentPage
    ) {
      link.classList.add("active");
    }
  });
}

// ========== 4. 移动端点击微信图标显示/隐藏二维码 ==========
function enableQRCodeToggle() {
  const qrWrapper = document.querySelector(".qr-wrapper");
  const isMobile = "ontouchstart" in window || navigator.maxTouchPoints > 0;

  if (isMobile && qrWrapper) {
    qrWrapper.addEventListener("click", function (e) {
      e.stopPropagation();
      qrWrapper.classList.toggle("active");
    });

    document.addEventListener("click", function () {
      qrWrapper.classList.remove("active");
    });
  }
}

// ========== 5. 返回顶部按钮 ==========
function createBackToTopButton() {
  // 注入样式
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

  // 创建按钮
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

  // 滚动控制显示隐藏
  window.addEventListener("scroll", () => {
    btn.style.display = window.scrollY > 300 ? "flex" : "none";
  });

  // 点击滚动到顶部 + 失焦处理（避免 hover 样式卡住）
  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    btn.blur();

    // 滚动完成后强制清除状态
    setTimeout(() => {
      btn.style.backgroundColor = "white";
      btn.style.color = "black";
    }, 800);
  });
}
