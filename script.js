// Project data - replace with your actual projects
const projects = [
  {
    id: "project-1",
    title: "Data Analysis Pipeline",
    description:
      "Built an end-to-end data analysis pipeline using Python, Pandas, and visualization libraries.",
    details: `# Data Analysis Pipeline

A robust data processing and visualization system that streamlines the analysis workflow.

## Technologies Used
- Python
- Pandas
- NumPy
- Matplotlib
- Seaborn

## Features
- Automated data cleaning and preprocessing
- Statistical analysis modules
- Interactive visualization dashboard
- Export capabilities for various formats

This project demonstrates my ability to handle large datasets efficiently while creating meaningful insights through visualization.`,
    link: "#",
    image: null,
  },
  {
    id: "project-2",
    title: "DevOps Automation Tools",
    description:
      "Created a suite of DevOps tools for continuous integration and deployment using Docker and Ansible.",
    details: `# DevOps Automation Tools

A collection of tools designed to streamline CI/CD pipelines and infrastructure management.

## Technologies Used
- Docker
- Ansible
- Python
- Bash scripting
- Jenkins

## Features
- Containerized application deployment
- Infrastructure as Code (IaC) implementations
- Automated testing and validation
- Monitoring and alerting systems

This project showcases my DevOps skills and ability to automate complex deployment processes.`,
    link: "#",
    image: null,
  },
  {
    id: "project-3",
    title: "Machine Learning Model",
    description:
      "Developed a predictive machine learning model for customer behavior analysis.",
    details: `# Machine Learning for Customer Behavior

A predictive analytics system that helps businesses understand and forecast customer actions.

## Technologies Used
- Python
- Scikit-learn
- TensorFlow
- Jupyter Notebooks
- SQL

## Features
- Customer segmentation algorithms
- Purchase prediction models
- Churn risk assessment
- Recommendation engine

This project demonstrates my capability in applying machine learning techniques to solve real business problems.`,
    link: "#",
    image: null,
  },
];

// DOM elements
const projectItems = document.querySelectorAll(".project-item");
const modal = document.getElementById("modal");
const modalContent = document.getElementById("modal-content");
const closeModal = document.querySelector(".close-modal");

// Command line effect
document.addEventListener("DOMContentLoaded", function () {
  // Typing effect for commands
  const commandElements = document.querySelectorAll(".command:not(.blink)");

  commandElements.forEach((element, index) => {
    const originalText = element.textContent;
    element.textContent = "";

    // Delay each command typing to create a sequence
    setTimeout(() => {
      typeText(element, originalText);
    }, index * 2000); // 2 seconds delay between commands
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
        setTimeout(() => {
          commandPrompt.nextElementSibling.style.opacity = "0";
          commandPrompt.nextElementSibling.style.display = "block";

          // Fade in effect
          setTimeout(() => {
            commandPrompt.nextElementSibling.style.opacity = "1";
            commandPrompt.nextElementSibling.style.transition = "opacity 0.5s";
          }, 100);
        }, 500);
      }
    }
  }, 40); // 40ms between characters
}

// Project modal handling
projectItems.forEach((item) => {
  item.addEventListener("click", function () {
    const projectName = this.textContent.trim();
    const projectId = projectName.split(".")[0]; // Extract 'project-1' from 'project-1.md'
    const project = projects.find((p) => p.id === projectId);

    if (project) {
      // Convert markdown to HTML (simple implementation)
      const converter = new showdown.Converter();
      const htmlContent = converter.makeHtml(project.details);

      modalContent.innerHTML = htmlContent;
      modal.style.display = "block";
    }
  });
});

// Close modal
closeModal.addEventListener("click", function () {
  modal.style.display = "none";
});

window.addEventListener("click", function (event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

// Initialize content sections as hidden
document.addEventListener("DOMContentLoaded", function () {
  const contentSections = document.querySelectorAll(
    ".about-content, .professional-content, .projects-content, .contact-content"
  );
  contentSections.forEach((section) => {
    section.style.display = "none";
    section.style.opacity = "0";
  });
});
