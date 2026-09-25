(function () {

    "use strict";

    // =====================================================
    // SKILL UP - AUTH / PAGE PROTECTION
    // =====================================================

    const token =
        localStorage.getItem("token");

    const loggedIn =
        localStorage.getItem("loggedIn");

    // =====================================================
    // CHECK LOGIN
    // =====================================================

    if (
        !token ||
        loggedIn !== "true"
    ) {

        redirectToLogin();

        return;
    }


    // =====================================================
    // REDIRECT TO LOGIN
    // =====================================================

    function redirectToLogin() {

        // Clear invalid session
        localStorage.removeItem("token");
        localStorage.removeItem("loggedIn");

        // Prevent redirect loop
        if (
            !window.location.pathname.endsWith(
                "/login.html"
            )
        ) {

            window.location.href =
                "login.html";

        }

    }


    // =====================================================
    // VERIFY TOKEN WITH BACKEND
    // =====================================================

    async function verifySession() {

        try {

            const response =
                await fetch(
                    "/api/user",
                    {
                        method: "GET",

                        headers: {
                            "Authorization":
                                "Bearer " + token
                        }
                    }
                );

            // Token invalid / expired
            if (
                response.status === 401
            ) {

                redirectToLogin();

                return;
            }

            // Backend/database problem
            if (!response.ok) {

                console.warn(
                    "Session verification failed."
                );

                return;
            }

            const data =
                await response.json();

            if (
                !data.success ||
                !data.user
            ) {

                redirectToLogin();

                return;
            }


            // =================================================
            // SYNC USER DATA
            // =================================================

            const oldUser =
                JSON.parse(
                    localStorage.getItem(
                        "user"
                    ) || "{}"
                );

            const updatedUser = {

                ...oldUser,

                id:
                    data.user._id ||
                    data.user.id ||
                    oldUser.id,

                name:
                    data.user.name ||
                    oldUser.name ||
                    "",

                email:
                    data.user.email ||
                    oldUser.email ||
                    "",

                college:
                    data.user.college ||
                    oldUser.college ||
                    "",

                branch:
                    data.user.branch ||
                    oldUser.branch ||
                    "",

                year:
                    data.user.year ||
                    oldUser.year ||
                    "",

                careerGoal:
                    data.user.careerGoal ||
                    oldUser.careerGoal ||
                    ""

            };


            localStorage.setItem(
                "user",
                JSON.stringify(
                    updatedUser
                )
            );


            // =================================================
            // SYNC CENTRAL PROFILE
            // =================================================

            const profile =
                JSON.parse(
                    localStorage.getItem(
                        "skillUpProfile"
                    ) || "{}"
                );

            const updatedProfile = {

                ...profile,

                name:
                    data.user.name ||
                    profile.name ||
                    "",

                studentName:
                    data.user.name ||
                    profile.studentName ||
                    "",

                email:
                    data.user.email ||
                    profile.email ||
                    "",

                college:
                    data.user.college ||
                    profile.college ||
                    "",

                branch:
                    data.user.branch ||
                    profile.branch ||
                    "",

                year:
                    data.user.year ||
                    profile.year ||
                    ""

            };


            localStorage.setItem(
                "skillUpProfile",
                JSON.stringify(
                    updatedProfile
                )
            );


        } catch (error) {

            console.error(
                "AUTH CHECK ERROR:",
                error
            );

            // Do NOT immediately logout just
            // because backend is temporarily unavailable.

        }

    }


    // =====================================================
    // LOGOUT FUNCTION
    // =====================================================

    window.skillUpLogout =
        function () {

            localStorage.removeItem(
                "token"
            );

            localStorage.removeItem(
                "loggedIn"
            );

            localStorage.removeItem(
                "user"
            );

            window.location.href =
                "login.html";

        };


    // =====================================================
    // AUTO LOGOUT BUTTON SUPPORT
    // =====================================================

    document.addEventListener(
        "click",
        function (event) {

            const logoutButton =
                event.target.closest(
                    "#logoutBtn, .logout-btn, [data-logout]"
                );

            if (!logoutButton) {
                return;
            }

            event.preventDefault();

            window.skillUpLogout();

        }
    );


    // =====================================================
    // CHECK SESSION
    // =====================================================

    verifySession();


})();