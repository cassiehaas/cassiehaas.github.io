document.addEventListener("DOMContentLoaded", function() {
    let sections = [
        document.getElementById("writers"),
        document.getElementById("voice-actors"),
        document.getElementById("programmer")
    ];

    sections.forEach((section, index) => {
        setTimeout(() => {
            section.style.display = "block"; // Show section
            setTimeout(() => {
                section.classList.add("fade-in"); // Fade in effect
            }, 100);
        }, index * 1500); // Delay each section by 3 seconds
    });
});