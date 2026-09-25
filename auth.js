/* =========================================================
   SKILL UP - AUTH.JS
   REGISTER + LOGIN + LOGOUT
========================================================= */

const API = window.location.origin;


/* =========================================================
   MESSAGE
========================================================= */

function showMessage(message, type = "error") {

    const box = document.getElementById("registerMessage");

    if (!box) return;

    box.textContent = message;

    box.style.display = "block";

    if (type === "success") {
        box.style.color = "#15803d";
        box.style.background = "#dcfce7";
        box.style.border = "1px solid #86efac";
    } else {
        box.style.color = "#b91c1c";
        box.style.background = "#fee2e2";
        box.style.border = "1px solid #fecaca";
    }
}


/* =========================================================
   REGISTER
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const registerForm = document.getElementById("registerForm");

    if (registerForm) {

        registerForm.addEventListener("submit", async function (event) {

            /* VERY IMPORTANT */
            event.preventDefault();
            event.stopPropagation();

            console.log("REGISTER FORM SUBMITTED");

            const name = document.getElementById("registerName")?.value.trim();
            const email = document.getElementById("registerEmail")?.value.trim();
            const password = document.getElementById("registerPassword")?.value;
            const college = document.getElementById("registerCollege")?.value.trim();
            const branch = document.getElementById("registerBranch")?.value;
            const year = document.getElementById("registerYear")?.value;


            /* =================================================
               VALIDATION
            ================================================= */

            if (!name || !email || !password) {

                showMessage(
                    "Please enter Name, Email and Password."
                );

                return;
            }


            if (password.length < 6) {

                showMessage(
                    "Password must be at least 6 characters."
                );

                return;
            }


            try {

                console.log("Sending registration request...");
                console.log("API:", API + "/api/register");


                /* =================================================
                   API REQUEST
                ================================================= */

                const response = await fetch(API + "/api/register", {

                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({

                        name: name,
                        email: email,
                        password: password,
                        college: college,
                        branch: branch,
                        year: year

                    })

                });


                console.log(
                    "Register response status:",
                    response.status
                );


                /* =================================================
                   RESPONSE
                ================================================= */

                let data;

                try {

                    data = await response.json();

                } catch (error) {

                    data = {
                        success: false,
                        message: "Server returned an invalid response."
                    };

                }


                console.log("Register response:", data);


                /* =================================================
                   ERROR
                ================================================= */

                if (!response.ok || !data.success) {

                    showMessage(
                        data.message || "Registration failed."
                    );

                    return;
                }


                /* =================================================
                   SUCCESS
                ================================================= */

                showMessage(
                    "Account created successfully! Redirecting...",
                    "success"
                );


                /* Save login information */

                if (data.token) {

                    localStorage.setItem(
                        "token",
                        data.token
                    );

                }


                if (data.user) {

                    localStorage.setItem(
                        "user",
                        JSON.stringify(data.user)
                    );

                }


                localStorage.setItem(
                    "loggedIn",
                    "true"
                );


                /* =================================================
                   REDIRECT
                ================================================= */

                setTimeout(function () {

                    window.location.href = "./login.html";

                }, 1000);


            } catch (error) {

                console.error(
                    "REGISTER ERROR:",
                    error
                );


                showMessage(
                    "Cannot connect to server. Please make sure backend is running."
                );

            }

        });

    }


    /* =========================================================
       LOGIN
    ========================================================= */

    const loginForm = document.getElementById("loginForm");

    if (loginForm) {

        loginForm.addEventListener("submit", async function (event) {

            event.preventDefault();
            event.stopPropagation();


            const email =
                document.getElementById("loginEmail")?.value.trim();

            const password =
                document.getElementById("loginPassword")?.value;


            if (!email || !password) {

                const message =
                    document.getElementById("loginMessage");

                if (message) {

                    message.textContent =
                        "Please enter email and password.";

                    message.style.display = "block";

                }

                return;
            }


            try {

                const response = await fetch(
                    API + "/api/login",
                    {

                        method: "POST",

                        headers: {
                            "Content-Type": "application/json"
                        },

                        body: JSON.stringify({

                            email: email,
                            password: password

                        })

                    }
                );


                const data = await response.json();


                if (!response.ok || !data.success) {

                    const message =
                        document.getElementById("loginMessage");

                    if (message) {

                        message.textContent =
                            data.message || "Login failed.";

                        message.style.display = "block";

                    }

                    return;
                }


                /* Save login */

                if (data.token) {

                    localStorage.setItem(
                        "token",
                        data.token
                    );

                }


                if (data.user) {

                    localStorage.setItem(
                        "user",
                        JSON.stringify(data.user)
                    );

                }


                localStorage.setItem(
                    "loggedIn",
                    "true"
                );


                /* Redirect */

                window.location.href =
                    "./dashboard.html";


            } catch (error) {

                console.error(
                    "LOGIN ERROR:",
                    error
                );


                const message =
                    document.getElementById("loginMessage");

                if (message) {

                    message.textContent =
                        "Cannot connect to server.";

                    message.style.display = "block";

                }

            }

        });

    }

});


/* =========================================================
   LOGOUT
========================================================= */

function logout() {

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("loggedIn");

    window.location.href = "./login.html";
}