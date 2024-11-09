document.addEventListener("DOMContentLoaded", function () {
    const symptoms = document.querySelectorAll(".symptom");
    const dropZones = document.querySelectorAll(".drop-zone");
    const resetButton = document.getElementById("reset-game");
    const checkAnswersButton = document.getElementById("check-answers");
    // const s1 = document.getElementById("s1");const s2 = document.getElementById("s2");const s3 = document.getElementById("s3");const s4 = document.getElementById("s4");const s5 = document.getElementById("s5");const s6 = document.getElementById("s6");const s7 = document.getElementById("s7");const s8 = document.getElementById("s8");const s9 = document.getElementById("s9");const s10 = document.getElementById("s10");

    // Correct classification for the symptoms
    const correctAnswers = {
        physical: ["Acne", "Hair Loss", "Weight Gain", "Fatigue", "Excess Facial Hair", "Skin Darkening"],
        hormonal: ["Mood Swings", "Cravings", "Infertility", "Irregular Cycle"]
    };

    let draggedElement = null;

    symptoms.forEach(symptom => {
        symptom.addEventListener("dragstart", dragStart);
        symptom.addEventListener("dragend", dragEnd);
    });

    dropZones.forEach(zone => {
        zone.addEventListener("dragover", dragOver);
        zone.addEventListener("drop", dropItem);
    });

    resetButton.addEventListener("click", resetGame);
    checkAnswersButton.addEventListener("click", checkAnswers);

    function dragStart(e) {
        draggedElement = e.target;
        e.dataTransfer.setData("text", e.target.id); // Store element ID in drag data
    }

    function dragEnd(e) {
        draggedElement = null;
    }

    function dragOver(e) {
        e.preventDefault();
    }

    function dropItem(e) {
        e.preventDefault();
        const dropZone = e.target.closest(".drop-zone");

        // Remove the dragged element from its previous parent
        if (draggedElement && draggedElement.parentNode) {
            draggedElement.parentNode.removeChild(draggedElement);
        }

        // Append the dragged element to the new drop zone
        dropZone.appendChild(draggedElement);

        // Minimize icon size when dropped into drop zone
        draggedElement.style.width = "50px";
        draggedElement.style.height = "50px";
        draggedElement.style.margin = "5px";
    }

    function resetGame() {
        const symptomsContainer = document.querySelector(".symptoms-container");
        symptomsContainer.innerHTML = `
    <div class="symptom" id="acne" draggable="true">
        <img src="images/acne.png" alt="Acne" draggable="false">
        <p>Acne</p>
    </div>
    <div class="symptom" id="hair_loss" draggable="true">
        <img src="images/Hair Loss.svg" alt="Hair Loss" draggable="false">
        <p>Hair Loss</p>
    </div>
    <div class="symptom" id="weight_gain" draggable="true">
        <img src="images/Weight Gain.svg" alt="Weight Gain" draggable="false">
        <p>Weight Gain</p>
    </div>
    <div class="symptom" id="fatigue" draggable="true">
        <img src="images/Fatigue.svg" alt="Fatigue" draggable="false">
        <p>Fatigue</p>
    </div>
    <div class="symptom" id="irregular_cycle" draggable="true">
        <img src="images/Irregular period.svg" alt="Irregular Cycle" draggable="false">
        <p>Irregular Cycle</p>
    </div>
    <div class="symptom" id="skin_darkening" draggable="true">
        <img src="images/Skin Darkening.svg" alt="Skin Darkening" draggable="false">
        <p>Skin Darkening</p>
    </div>
    <div class="symptom" id="mood_swings" draggable="true">
        <img src="images/Mood swings.svg" alt="Mood Swings" draggable="false">
        <p>Mood Swings</p>
    </div>
    <div class="symptom" id="cravings" draggable="true">
        <img src="images/Cravings.svg" alt="Cravings" draggable="false">
        <p>Cravings</p>
    </div>
    <div class="symptom" id="infertility" draggable="true">
        <img src="images/Infertility.svg" alt="Infertility" draggable="false">
        <p>Infertility</p>
    </div>
    <div class="symptom" id="excess_facial_hair" draggable="true">
        <img src="images/Facial Hair.svg" alt="Excess Facial Hair" draggable="false">
        <p>Excess Facial Hair</p>
    </div>
`;
        symptomsContainer.querySelectorAll(".symptom").forEach(symptom => {
            symptom.addEventListener("dragstart", dragStart);
            symptom.addEventListener("dragend", dragEnd);
        });

        // Clear the drop zones
        dropZones.forEach(zone => {
            zone.innerHTML = `<h3>${zone.querySelector("h3").textContent}</h3>`;
        });

        // Clear feedback message
        document.getElementById("feedback-message").textContent = "";
    }

    function checkAnswers() {
        let correctCount = 0;
        let wrongCount = 0;

        dropZones.forEach(zone => {
            const category = zone.id === "physical-symptoms" ? "physical" : "hormonal";
            const droppedItems = zone.querySelectorAll(".symptom p");
            const droppedItemNames = Array.from(droppedItems).map(item => item.textContent);

            droppedItemNames.forEach(name => {
                if (correctAnswers[category].includes(name)) {
                    correctCount++;
                } else {
                    wrongCount++;
                }
            });

            const isCorrect = droppedItemNames.every(name => correctAnswers[category].includes(name));
            if (isCorrect) {
                zone.style.borderColor = "green";
            } else {
                zone.style.borderColor = "red";
            }
        });

        const feedbackMessage = document.getElementById("feedback-message");
        feedbackMessage.textContent = `You got ${correctCount} correct and ${wrongCount} wrong.`;
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const quizAnswers = document.querySelectorAll(".quiz-answer");
    const quizFeedback = document.getElementById("quiz-feedback");

    quizAnswers.forEach(answer => {
        answer.addEventListener("click", function () {
            if (this.getAttribute("data-correct") === "true") {
                quizFeedback.textContent = "Correct! Machine learning helps in better diagnosis and predicting health conditions like PCOS.";
                quizFeedback.style.color = "green";
            } else {
                quizFeedback.textContent = "Oops! That's not correct. Try again.";
                quizFeedback.style.color = "red";
            }
        });
    });
});

