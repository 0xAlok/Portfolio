// Command line effect
document.addEventListener("DOMContentLoaded", function () {
  // Initialize content sections as hidden
  const contentSections = document.querySelectorAll(
    ".about-content, .skills-content, .projects-content, .contact-content"
  );
  contentSections.forEach((section) => {
    section.style.display = "none";
    section.style.opacity = "0";
  });

  // Make only the first command prompt visible initially
  const allCommandPromptDivs = document.querySelectorAll(
    ".welcome > .command-prompt"
  );
  if (allCommandPromptDivs.length > 0) {
    allCommandPromptDivs[0].style.display = "flex";
  }
  // All other prompts, including the final blinking one, remain hidden by CSS.

  // Typing effect for commands
  const commandElements = document.querySelectorAll(".command:not(.blink)");

  commandElements.forEach((element, index) => {
    const originalText = element.textContent;
    element.textContent = "";

    // Delay each command typing to create a sequence
    setTimeout(() => {
      typeText(element, originalText);
    }, index * 1500); // 2 seconds delay between commands
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
      // Show the corresponding content section after typing is complete
      const commandPrompt = element.closest(".command-prompt");
      if (commandPrompt && commandPrompt.nextElementSibling) {
        const sectionToDisplay = commandPrompt.nextElementSibling;
        // console.log removed
        setTimeout(() => {
          sectionToDisplay.style.opacity = "0";
          // Ensure the section is set to display: flex for skills-content, or block for others
          if (
            sectionToDisplay.classList.contains(
              "skills-content"
            ) /* Removed || sectionToDisplay.classList.contains("project-card-container") as project-card-container is a child */
          ) {
            sectionToDisplay.style.display = "flex";
          } else if (sectionToDisplay.classList.contains("projects-content")) {
            // projects-content is the wrapper for project-card-container
            sectionToDisplay.style.display = "block";
            // And then ensure its child project-card-container is grid
            const projectCardContainer = sectionToDisplay.querySelector(
              ".project-card-container"
            );
            if (projectCardContainer)
              projectCardContainer.style.display = "grid";
          } else {
            sectionToDisplay.style.display = "block"; // Default for .about-content, .contact-content
          }

          // Fade in effect
          setTimeout(() => {
            sectionToDisplay.style.opacity = "1";
            sectionToDisplay.style.transition = "opacity 0.5s";

            // After this section is revealed, show the next command prompt
            const currentCommandPromptDiv = commandPrompt; // commandPrompt is element.closest(".command-prompt")
            const allPrompts = Array.from(
              document.querySelectorAll(".welcome > .command-prompt")
            );
            const currentIndex = allPrompts.indexOf(currentCommandPromptDiv);

            if (currentIndex !== -1 && currentIndex < allPrompts.length - 1) {
              const nextCommandPromptDiv = allPrompts[currentIndex + 1];
              if (nextCommandPromptDiv) {
                // This will now also show the blinking prompt when it's next
                nextCommandPromptDiv.style.display = "flex";
              }
            }
          }, 100); // End of fade-in timeout
        }, 500); // End of section display timeout
      }
    }
  }, 40); // 40ms between characters
}
