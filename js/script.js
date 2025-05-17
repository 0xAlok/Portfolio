// Command line effect
document.addEventListener("DOMContentLoaded", function () {
  const contentSections = document.querySelectorAll(
    ".about-content, .skills-content, .projects-content, .contact-content"
  );
  contentSections.forEach((section) => {
    section.style.display = "none";
    section.style.opacity = "0";
  });

  // Make only the first command prompt visible
  const allCommandPromptDivs = document.querySelectorAll(
    ".welcome > .command-prompt"
  );
  if (allCommandPromptDivs.length > 0) {
    allCommandPromptDivs[0].style.display = "flex";
  }

  // Typing effect for commands
  const commandElements = document.querySelectorAll(".command:not(.blink)");

  commandElements.forEach((element, index) => {
    const originalText = element.textContent;
    element.textContent = "";

    // Delay each command typing to create a sequence
    setTimeout(() => {
      typeText(element, originalText);
    }, index * 1500);
  });
});

// Text typing animation
function typeText(element, text) {
  let i = 0;
  const interval = setInterval(() => {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
    } else {
      clearInterval(interval);
      const commandPrompt = element.closest(".command-prompt");
      if (commandPrompt && commandPrompt.nextElementSibling) {
        const sectionToDisplay = commandPrompt.nextElementSibling;
        setTimeout(() => {
          sectionToDisplay.style.opacity = "0";
          if (sectionToDisplay.classList.contains("skills-content")) {
            sectionToDisplay.style.display = "flex";
          } else if (sectionToDisplay.classList.contains("projects-content")) {
            sectionToDisplay.style.display = "block";
            const projectCardContainer = sectionToDisplay.querySelector(
              ".project-card-container"
            );
            if (projectCardContainer)
              projectCardContainer.style.display = "grid";
          } else {
            sectionToDisplay.style.display = "block";
          }

          // Fade in effect
          setTimeout(() => {
            sectionToDisplay.style.opacity = "1";
            sectionToDisplay.style.transition = "opacity 0.5s";

            const currentCommandPromptDiv = commandPrompt;
            const allPrompts = Array.from(
              document.querySelectorAll(".welcome > .command-prompt")
            );
            const currentIndex = allPrompts.indexOf(currentCommandPromptDiv);

            if (currentIndex !== -1 && currentIndex < allPrompts.length - 1) {
              const nextCommandPromptDiv = allPrompts[currentIndex + 1];
              if (nextCommandPromptDiv) {
                nextCommandPromptDiv.style.display = "flex";
              }
            }
          }, 100);
        }, 500);
      }
    }
  }, 30);
}
