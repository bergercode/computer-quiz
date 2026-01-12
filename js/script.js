document.addEventListener("DOMContentLoaded", function () {
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => document.querySelectorAll(selector);

  // Global keydown handler for Enter key on links and inputs
  document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      const active = document.activeElement;
      if (active.tagName === "A") {
        active.click();
      } else if (active.tagName === "INPUT") {
        if (active.type === "radio" || active.type === "checkbox") {
          active.checked = true;
        }
      }
    }
  });

  // RETURN HOME LOGIC
  const returnHomeButtons = $$(".return-home");
  returnHomeButtons.forEach((btn) => {
    btn.addEventListener("click", function (event) {
      event.preventDefault();
      // Identify which modal to show.
      // Preference: #home-modal (learning), #modal4 (quiz)
      let modal = $("#home-modal");
      if (!modal) modal = $("#modal4");

      if (modal) {
        modal.style.display = "block";

        const yesBtn = modal.querySelector(".modal-submit");
        const noBtn = modal.querySelector(".modal-cancel");

        if (yesBtn) {
          yesBtn.onclick = function () {
            window.location.href = "index.html";
            localStorage.clear();
          }
        }
        if (noBtn) {
          noBtn.onclick = function () {
            modal.style.display = "none";
          }
        }
      }
    });
  });

  // ******************** INDEX PAGE ********************
  const beginButton = $("#begin-button");
  if (beginButton) {
    const modal = $(".modal");
    beginButton.addEventListener("click", function (e) {
      e.preventDefault();
      modal.style.display = "flex";
      modal.style.flexDirection = "column";
      modal.style.justifyContent = "space-evenly";
      modal.style.alignItems = "center";
    });

    const close = $(".close");
    if (close) {
      close.addEventListener("click", () => {
        modal.style.display = "none";
      });
    }

    const start = $("#start");
    const userNameInput = $("#user-name");

    const submitName = () => {
      const val = userNameInput.value;
      if (val && val.trim() !== "") {
        localStorage.setItem("userName", val);
        window.location.href = "learning.html";
      } else {
        userNameInput.value = "Adventurer";
      }
    };

    if (start) {
      start.addEventListener("click", submitName);
    }

    if (userNameInput) {
      userNameInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          submitName();
          e.preventDefault();
        }
      });
    }
  }

  // ******************** LEARNING PAGE ********************
  // Display User Name
  const userNameDisplay = $("#user-name");
  // Check if we are on a page that needs this (Index has #user-name input, others have span)
  if (userNameDisplay && userNameDisplay.tagName !== "INPUT") {
    userNameDisplay.textContent = localStorage.getItem("userName");
  }

  const components = $("#components");
  if (components) {
    const links = components.querySelectorAll("a");
    links.forEach(link => {
      link.addEventListener("click", function (e) {
        // Reset all
        $$("#information div").forEach(div => div.classList.remove("show"));
        links.forEach(l => l.classList.remove("active"));
        $$("label").forEach(l => l.classList.remove("highlight"));

        const infInfo = $("#inf-info");
        if (infInfo) infInfo.classList.add("hide");

        // Activate current
        const id = this.id;

        const targetInfo = $("#" + id + "-info");
        if (targetInfo) targetInfo.classList.add("show");

        this.classList.add("active");

        const label = $("label[for='" + id + "']");
        if (label) label.classList.add("highlight");
      });
    });
  }

  // Scroll Listener
  if ($(".parts-label")) {
    window.addEventListener("scroll", function () {
      const bodyHeight = document.body.offsetHeight;
      const winHeight = window.innerHeight;
      const scrollTop = window.scrollY;

      if (document.documentElement.scrollHeight <= (winHeight + scrollTop + 20)) {
        $(".parts-label").classList.add("show");
      } else {
        $(".parts-label").classList.remove("show");
      }
    });
  }

  // ******************** QUIZ PAGE ********************
  const quizSubmit = $("#quiz-submit");
  if (quizSubmit) {
    // Score display
    const scoreEl = $("#score");
    if (scoreEl) scoreEl.textContent = localStorage.getItem("score");

    quizSubmit.addEventListener("click", function (e) {
      e.preventDefault();
      let answerCount = 0;
      let score = 0;

      const checked = $$("input[type='radio']:checked");
      answerCount = checked.length;

      if (answerCount < 5) {
        const m2 = $("#modal2");
        if (m2) m2.style.display = "block";
      } else {
        // Calculate score
        const correctIds = ["q1a3", "q2a3", "q3a2", "q4a1", "q5a2"];
        correctIds.forEach(id => {
          const el = $("#" + id);
          if (el && el.checked) score++;
        });

        // Save score immediately as per original behavior
        localStorage.setItem("score", score);

        const m3 = $("#modal3");
        if (m3) {
          m3.style.display = "block";
          // Attach modal logic
          const yes = m3.querySelector(".modal-submit");
          const no = m3.querySelector(".modal-cancel");

          if (yes) {
            yes.onclick = function () {
              if (score >= 3) {
                window.location.href = "win.html";
              } else {
                window.location.href = "lose.html";
              }
            }
          }
          if (no) {
            no.onclick = function () {
              m3.style.display = "none";
            }
          }
        }
      }
    });

    // Handle "OK" button on modal2
    const ansAll = $("#answer-all");
    if (ansAll) {
      ansAll.addEventListener("click", function () {
        const m2 = $("#modal2");
        if (m2) m2.style.display = "none";
      });
    }
  }

  // Win/Lose page specific
  if (!quizSubmit && $("#score")) {
    $("#score").textContent = localStorage.getItem("score");
  }


  // ******************** ABOUT ********************
  const goBack = $(".go-back");
  if (goBack) {
    goBack.addEventListener("click", function (e) {
      e.preventDefault();
      window.history.back();
    });
  }

});
