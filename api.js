(function () {

    "use strict";

    // =====================================================
    // SKILL UP - CENTRAL API HELPER
    // =====================================================

    // LIVE RAILWAY BACKEND
    const API_BASE =
       "https://skill-up-portal-backend.onrender.com/api"


    // =====================================================
    // GET TOKEN
    // =====================================================

    function getToken() {

        return localStorage.getItem("token");

    }


    // =====================================================
    // API REQUEST
    // =====================================================

    async function apiRequest(
        endpoint,
        options = {}
    ) {

        const token =
            getToken();

        const headers = {

            "Content-Type":
                "application/json",

            ...(options.headers || {})

        };


        // =================================================
        // ADD JWT TOKEN AUTOMATICALLY
        // =================================================

        if (token) {

            headers.Authorization =
                "Bearer " + token;

        }


        // =================================================
        // SEND REQUEST TO LIVE RAILWAY BACKEND
        // =================================================

        const response =
            await fetch(
                API_BASE + endpoint,
                {
                    ...options,
                    headers
                }
            );


        // =================================================
        // TOKEN EXPIRED / INVALID
        // =================================================

        if (
            response.status === 401
        ) {

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

            return null;
        }


        // =================================================
        // JSON RESPONSE
        // =================================================

        let data = null;

        try {

            data =
                await response.json();

        } catch (error) {

            data = null;

        }


        // =================================================
        // RETURN RESPONSE
        // =================================================

        return {

            response,

            data,

            ok:
                response.ok

        };

    }


    // =====================================================
    // GET
    // =====================================================

    async function apiGet(
        endpoint
    ) {

        return apiRequest(
            endpoint,
            {
                method: "GET"
            }
        );

    }


    // =====================================================
    // POST
    // =====================================================

    async function apiPost(
        endpoint,
        body
    ) {

        return apiRequest(
            endpoint,
            {

                method: "POST",

                body:
                    JSON.stringify(
                        body
                    )

            }
        );

    }


    // =====================================================
    // PUT
    // =====================================================

    async function apiPut(
        endpoint,
        body
    ) {

        return apiRequest(
            endpoint,
            {

                method: "PUT",

                body:
                    JSON.stringify(
                        body
                    )

            }
        );

    }


    // =====================================================
    // DELETE
    // =====================================================

    async function apiDelete(
        endpoint
    ) {

        return apiRequest(
            endpoint,
            {
                method: "DELETE"
            }
        );

    }


    // =====================================================
    // GLOBAL ACCESS
    // =====================================================

    window.SkillUpAPI = {

        request:
            apiRequest,

        get:
            apiGet,

        post:
            apiPost,

        put:
            apiPut,

        delete:
            apiDelete,

        getToken

    };


})();
