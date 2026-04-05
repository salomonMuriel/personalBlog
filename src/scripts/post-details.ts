// Post detail page enhancements: progress bar, heading links, code copy, back-to-top

function createProgressBar() {
  const container = document.createElement("div");
  container.className =
    "progress-container fixed top-0 z-10 h-1 w-full bg-skin-fill";
  const bar = document.createElement("div");
  bar.className = "progress-bar h-1 w-0 bg-skin-accent";
  bar.id = "myBar";
  container.appendChild(bar);
  document.body.appendChild(container);
}

function updateScrollProgress() {
  const winScroll =
    document.body.scrollTop || document.documentElement.scrollTop;
  const height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  const myBar = document.getElementById("myBar");
  if (myBar) {
    myBar.style.width = scrolled + "%";
  }
}

function addHeadingLinks() {
  const headings = document.querySelectorAll("h2, h3, h4, h5, h6");
  for (const heading of headings) {
    heading.classList.add("group");
    const link = document.createElement("a");
    link.innerText = "#";
    link.className = "heading-link hidden group-hover:inline-block ml-2";
    link.href = "#" + heading.id;
    link.ariaHidden = "true";
    heading.appendChild(link);
  }
}

function attachCopyButtons() {
  const article = document.getElementById("article");
  if (!article) return;

  const copyLabel = article.dataset.copyLabel ?? "Copy";
  const copiedLabel = article.dataset.copiedLabel ?? "Copied";

  const codeBlocks = document.querySelectorAll("pre");

  for (const codeBlock of codeBlocks) {
    const wrapper = document.createElement("div");
    wrapper.style.position = "relative";

    const copyButton = document.createElement("button");
    copyButton.className =
      "copy-code absolute right-3 -top-3 rounded bg-skin-card px-2 py-1 text-xs leading-4 text-skin-base font-medium";
    copyButton.innerHTML = copyLabel;
    codeBlock.setAttribute("tabindex", "0");
    codeBlock.appendChild(copyButton);

    codeBlock.parentNode?.insertBefore(wrapper, codeBlock);
    wrapper.appendChild(codeBlock);

    copyButton.addEventListener("click", async () => {
      const code = codeBlock.querySelector("code");
      const text = code?.innerText ?? "";
      await navigator.clipboard.writeText(text);
      copyButton.innerText = copiedLabel;
      setTimeout(() => {
        copyButton.innerText = copyLabel;
      }, 700);
    });
  }
}

function backToTop() {
  document.querySelector("#back-to-top")?.addEventListener("click", () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  });
}

// Initialize
createProgressBar();
document.addEventListener("scroll", updateScrollProgress);
addHeadingLinks();
attachCopyButtons();
backToTop();
