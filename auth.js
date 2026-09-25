/* =========================================================
SKILL UP - AUTH.JS
LIVE RENDER BACKEND
========================================================= */

const API =
"https://skill-up-portal-backend.onrender.com";

/* =========================================================
MESSAGE
========================================================= */

function showMessage(message, type = "error") {

```
const box =
    document.getElementById("registerMessage");

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
```

}

/* =========================================================
PAGE LOAD
========================================================= */

document.addEventListener(
"DOMContentLoaded",
function () {

```
    /* =================================================
       REGISTER
    ================================================= */

    const registerForm =
        document.getElementById("registerForm");


    if (registerForm) {

        registerForm.addEventListener(
            "submit",
            async function (event) {

                event.preventDefault();
                event.stopPropagation();


                const name =
                    document
                        .getElementById("registerName")
                        ?.value
                        .trim();

                const email =
                    document
                        .getElementById("registerEmail")
                        ?.value
                        .trim();

                const password =
                    document
                        .getElementById("registerPassword")
                        ?.value;

                const college =
                    document
                        .getElementById("registerCollege")
                        ?.value
                        .trim();

                const branch =
                    document
                        .getElementById("registerBranch")
                        ?.value;

                const year =
                    document
                        .getElementById("registerYear")
                        ?.value;


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

                    console.log(
                        "REGISTER URL:",
                        API + "/api/register"
                    );


                    const response =
                        await fetch(
                            API + "/api/register",
                            {

                                method: "POST",

                                headers: {
                                    "Content-Type":
                                        "application/json"
                                },

                                body:
                                    JSON.stringify({

                                        name:
                                            name,

                                        email:
                                            email,

                                        password:
                                            password,

                                        college:
                                            college,

                                        branch:
                                            branch,

                                        year:
                                            year

                                    })

                            }
                        );


                    const raw =
                        await response.text();


                    console.log(
                        "REGISTER STATUS:",
                        response.status
                    );

                    console.log(
                        "REGISTER RESPONSE:",
                        raw
                    );


                    let data = null;


                    try {

                        data =
                            JSON.parse(raw);

                    } catch (error) {

                        data = null;

                    }


                    if (!response.ok) {

                        showMessage(
                            data?.message ||
                            `Registration failed (${response.status})`
                        );

                        return;
                    }


                    showMessage(
                        data?.message ||
                        "Account created successfully!",
                        "success"
                    );


                    if (data?.token) {

                        localStorage.setItem(
                            "token",
                            data.token
                        );

                    }


                    if (data?.user) {

                        localStorage.setItem(
                            "user",
                            JSON.stringify(
                                data.user
                            )
                        );

                    }


                    localStorage.setItem(
                        "loggedIn",
                        "true"
                    );


                    setTimeout(
                        function () {

                            window.location.href =
                                "./login.html";

                        },
                        1000
                    );


                } catch (error) {

                    console.error(
                        "REGISTER ERROR:",
                        error
                    );


                    showMessage(
                        "Cannot connect to server."
                    );

                }

            }
        );

    }


    /* =================================================
       LOGIN
    ================================================= */

    const loginForm =
        document.getElementById("loginForm");


    if (loginForm) {

        loginForm.addEventListener(
            "submit",
            async function (event) {

                event.preventDefault();
                event.stopPropagation();


                const email =
                    document
                        .getElementById("loginEmail")
                        ?.value
                        .trim();

                const password =
                    document
                        .getElementById("loginPassword")
                        ?.value;


                const message =
                    document.getElementById(
                        "loginMessage"
                    );


                if (!email || !password) {

                    if (message) {

                        message.textContent =
                            "Please enter email and password.";

                        message.style.display =
                            "block";

                    }

                    return;
                }


                try {

                    console.log(
                        "LOGIN URL:",
                        API + "/api/login"
                    );


                    const response =
                        await fetch(
                            API + "/api/login",
                            {

                                method: "POST",

                                headers: {
                                    "Content-Type":
                                        "application/json"
                                },

                                body:
                                    JSON.stringify({

                                        email:
                                            email,

                                        password:
                                            password

                                    })

                            }
                        );


                    const raw =
                        await response.text();


                    console.log(
                        "LOGIN STATUS:",
                        response.status
                    );

                    console.log(
                        "LOGIN RESPONSE:",
                        raw
                    );


                    let data = null;


                    try {

                        data =
                            JSON.parse(raw);

                    } catch (error) {

                        data = null;

                    }


                    /* =================================
                       LOGIN ERROR
                    ================================= */

                    if (!response.ok) {

                        if (message) {

                            message.textContent =
                                data?.message ||
                                `Login failed (${response.status})`;

                            message.style.display =
                                "block";

                        }

                        return;
                    }


                    /* =================================
                       SAVE TOKEN
                    ================================= */

                    if (data?.token) {

                        localStorage.setItem(
                            "token",
                            data.token
                        );

                    }


                    /* =================================
                       SAVE USER
                    ================================= */

                    if (data?.user) {

                        localStorage.setItem(
                            "user",
                            JSON.stringify(
                                data.user
                            )
                        );

                    }


                    localStorage.setItem(
                        "loggedIn",
                        "true"
                    );


                    /* =================================
                       SUCCESS MESSAGE
                    ================================= */

                    if (message) {

                        message.textContent =
                            data?.message ||
                            "Login successful!";

                        message.style.display =
                            "block";

                        message.style.color =
                            "#15803d";

                        message.style.background =
                            "#dcfce7";

                        message.style.border =
                            "1px solid #86efac";

                    }


                    /* =================================
                       REDIRECT
                    ================================= */

                    setTimeout(
                        function () {

                            window.location.href =
                                "./index.html";

                        },
                        800
                    );


                } catch (error) {

                    console.error(
                        "LOGIN ERROR:",
                        error
                    );


                    if (message) {

                        message.textContent =
                            "Cannot connect to server.";

                        message.style.display =
                            "block";

                    }

                }

            }
        );

    }

}
```

);

/* =========================================================
LOGOUT
========================================================= */

function logout() {

```
localStorage.removeItem("token");

localStorage.removeItem("user");

localStorage.removeItem("loggedIn");

window.location.href =
    "./login.html";
```

}
