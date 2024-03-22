
document.addEventListener("DOMContentLoaded", function() {
    const ageSelect = document.getElementById("age");

    for (let i = 10; i <= 100; i++) {
        const option = document.createElement("option");
        option.value = i;
        option.text = i.toString();
        ageSelect.appendChild(option);
    }
});
