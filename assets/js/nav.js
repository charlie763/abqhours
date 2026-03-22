(function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("top-menu-nav");
  if (!toggle || !nav) return;

  function setOpen(open) {
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute(
      "aria-label",
      open ? "Close navigation menu" : "Open navigation menu"
    );
    nav.classList.toggle("is-open", open);
    document.body.classList.toggle("nav-menu-open", open);
  }

  function isOpen() {
    return nav.classList.contains("is-open");
  }

  toggle.addEventListener("click", function (e) {
    e.stopPropagation();
    setOpen(!isOpen());
  });

  nav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      setOpen(false);
    });
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") setOpen(false);
  });

  document.addEventListener("click", function (e) {
    if (
      isOpen() &&
      !toggle.contains(e.target) &&
      !nav.contains(e.target)
    ) {
      setOpen(false);
    }
  });
})();
