/* ==========================================
   PIANO ACADEMY — MODE SOMBRE GLOBAL
========================================== */

(function () {
    "use strict";

    const STORAGE_KEY = "pianoAcademyTheme";

    function getTheme() {
        try {
            return localStorage.getItem(STORAGE_KEY) === "dark"
                ? "dark"
                : "light";
        } catch (error) {
            return "light";
        }
    }

    function applyTheme(theme) {

        const dark = theme === "dark";

        document.documentElement.setAttribute(
            "data-theme",
            dark ? "dark" : "light"
        );

        document.documentElement.classList.toggle(
            "dark",
            dark
        );

        if (document.body) {
            document.body.classList.toggle("dark", dark);
        }

        const button = document.getElementById("themeButton");

        if (button) {
            button.textContent = dark ? "☀️" : "🌙";

            button.setAttribute(
                "aria-label",
                dark ? "Activer le mode clair" : "Activer le mode sombre"
            );
        }
    }

    function setTheme(theme) {

        const mode = theme === "dark" ? "dark" : "light";

        try {
            localStorage.setItem(STORAGE_KEY, mode);
        } catch (error) {}

        applyTheme(mode);
    }

    function toggleTheme() {

        const current = document.documentElement.getAttribute("data-theme");

        setTheme(current === "dark" ? "light" : "dark");
    }

    window.PianoTheme = {
        get: getTheme,
        set: setTheme,
        toggle: toggleTheme,
        apply: applyTheme
    };

    applyTheme(getTheme());

    document.addEventListener("DOMContentLoaded", function () {

        applyTheme(getTheme());

        const button = document.getElementById("themeButton");

        if (button) {
            button.addEventListener("click", toggleTheme);
        }

    });

    window.addEventListener("storage", function (event) {

        if (event.key === STORAGE_KEY) {
            applyTheme(getTheme());
        }

    });

})();