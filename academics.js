/* =========================================================
   SKILL UP — ACADEMICS PAGE JS
   FINAL STABLE VERSION
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       1. SAFE STORAGE
    ===================================================== */

    function getStorage(key, fallback = {}) {
        try {
            const data = JSON.parse(localStorage.getItem(key));
            return data ?? fallback;
        } catch (error) {
            console.warn(`Storage error: ${key}`, error);
            return fallback;
        }
    }


    /* =====================================================
       2. PROFILE DATA
    ===================================================== */

    const userData = getStorage("user", {});
    const profileData = getStorage("skillUpProfile", {});

    const profile = {
        ...userData,
        ...profileData
    };


    /* =====================================================
       3. DOM ELEMENTS
    ===================================================== */

    const studentName =
        document.getElementById("studentName");

    const studentCollege =
        document.getElementById("studentCollege");

    const studentBranch =
        document.getElementById("studentBranch");

    const studentYear =
        document.getElementById("studentYear");

    const studentSemester =
        document.getElementById("studentSemester");

    const studentCGPA =
        document.getElementById("studentCGPA");

    const semesterSelect =
        document.getElementById("semesterSelect");

    const subjectsContainer =
        document.getElementById("subjectsContainer");

    const overallProgress =
        document.getElementById("overallProgress");

    const progressFill =
        document.getElementById("progressFill");

    const completedSubjects =
        document.getElementById("completedSubjects");

    const totalSubjects =
        document.getElementById("totalSubjects");

    const strongSubjects =
        document.getElementById("strongSubjects");

    const improvementSubjects =
        document.getElementById("improvementSubjects");

    const mappingContainer =
        document.getElementById("mappingContainer");

    const recommendedContainer =
        document.getElementById("recommendedSkills");


    /* =====================================================
       4. ORDINAL HELPER
    ===================================================== */

    function getOrdinal(number) {

        const n = Number(number);

        if (n === 1) return "1st";
        if (n === 2) return "2nd";
        if (n === 3) return "3rd";

        return `${n}th`;
    }


    /* =====================================================
       5. PROFILE SYNC
    ===================================================== */

    function syncProfileData() {

        if (studentName) {
            studentName.textContent =
                profile.name ||
                profile.studentName ||
                "Student";
        }

        if (studentCollege) {
            studentCollege.textContent =
                profile.college ||
                profile.collegeName ||
                "Your College";
        }

        if (studentBranch) {
            studentBranch.textContent =
                profile.branch ||
                profile.stream ||
                "IT";
        }

        if (studentYear) {
            studentYear.textContent =
                profile.year ||
                profile.studyYear ||
                "2nd Year";
        }

        if (studentSemester) {
            studentSemester.textContent =
                profile.semester ||
                "2nd Semester";
        }

        if (studentCGPA) {
            studentCGPA.textContent =
                profile.cgpa ||
                "—";
        }
    }

    syncProfileData();


    /* =====================================================
       6. ACADEMIC DATA
    ===================================================== */

    const academicData = {

        "1": [

            {
                name: "Engineering Mathematics-I",
                credits: 4,
                marks: 78,
                status: "Completed",

                units: [
                    "Differential Calculus",
                    "Integral Calculus",
                    "Matrices",
                    "Differential Equations",
                    "Vector Calculus"
                ],

                skills: [
                    "Mathematical Problem Solving",
                    "Logical Thinking"
                ],

                course: "Data Analytics"
            },

            {
                name: "Engineering Physics",
                credits: 3,
                marks: 72,
                status: "Completed",

                units: [
                    "Wave Optics",
                    "Quantum Physics",
                    "Lasers",
                    "Fiber Optics",
                    "Modern Physics"
                ],

                skills: [
                    "Analytical Thinking",
                    "Problem Solving"
                ],

                course: "Data Analytics"
            },

            {
                name: "Basic Electrical Engineering",
                credits: 3,
                marks: 70,
                status: "Completed",

                units: [
                    "Basic Circuits",
                    "AC Fundamentals",
                    "Transformers",
                    "Electrical Machines",
                    "Measurements"
                ],

                skills: [
                    "Technical Fundamentals"
                ],

                course: "Computer Networking"
            },

            {
                name: "Programming Fundamentals",
                credits: 4,
                marks: 82,
                status: "Completed",

                units: [
                    "Programming Basics",
                    "Control Statements",
                    "Functions",
                    "Arrays",
                    "Pointers"
                ],

                skills: [
                    "Programming",
                    "Problem Solving"
                ],

                course: "JavaScript"
            },

            {
                name: "Engineering Graphics",
                credits: 2,
                marks: 68,
                status: "Completed",

                units: [
                    "Engineering Drawing",
                    "Projection",
                    "Sections",
                    "Isometric Views",
                    "Computer Aided Drawing"
                ],

                skills: [
                    "Visualization",
                    "Technical Drawing"
                ],

                course: "UI/UX Design"
            }
        ],


        "2": [

            {
                name: "Data Structures",
                credits: 4,
                marks: 76,
                status: "In Progress",

                units: [
                    "Introduction & Arrays",
                    "Linked Lists",
                    "Stacks & Queues",
                    "Trees",
                    "Graphs"
                ],

                skills: [
                    "Data Structures",
                    "Problem Solving",
                    "Algorithms"
                ],

                course: "JavaScript"
            },

            {
                name: "Object Oriented Programming",
                credits: 4,
                marks: 81,
                status: "In Progress",

                units: [
                    "Classes & Objects",
                    "Constructors",
                    "Inheritance",
                    "Polymorphism",
                    "Exception Handling"
                ],

                skills: [
                    "OOP",
                    "Programming",
                    "Problem Solving"
                ],

                course: "JavaScript"
            },

            {
                name: "Discrete Structures",
                credits: 3,
                marks: 74,
                status: "In Progress",

                units: [
                    "Set Theory",
                    "Relations & Functions",
                    "Logic",
                    "Graph Theory",
                    "Combinatorics"
                ],

                skills: [
                    "Logical Thinking",
                    "Mathematical Reasoning"
                ],

                course: "Data Analytics"
            },

            {
                name: "Digital Logic Design",
                credits: 3,
                marks: 79,
                status: "In Progress",

                units: [
                    "Number Systems",
                    "Boolean Algebra",
                    "Logic Gates",
                    "Combinational Circuits",
                    "Sequential Circuits"
                ],

                skills: [
                    "Digital Logic",
                    "Computer Fundamentals"
                ],

                course: "Computer Networking"
            },

            {
                name: "Professional Communication",
                credits: 2,
                marks: 85,
                status: "In Progress",

                units: [
                    "Communication Basics",
                    "Letter Writing",
                    "Resume Writing",
                    "Presentation Skills",
                    "Professional Communication"
                ],

                skills: [
                    "Communication",
                    "Presentation",
                    "Professional Skills"
                ],

                course: "UI/UX Design"
            }
        ],


        "3": [

            {
                name: "Database Management System",
                credits: 4,
                marks: 0,
                status: "In Progress",

                units: [
                    "Database Fundamentals",
                    "ER Model",
                    "SQL",
                    "Normalization",
                    "Transactions"
                ],

                skills: [
                    "SQL",
                    "Database Design",
                    "Normalization"
                ],

                course: "SQL & Databases"
            },

            {
                name: "Operating System",
                credits: 4,
                marks: 0,
                status: "In Progress",

                units: [
                    "OS Fundamentals",
                    "Process Management",
                    "Memory Management",
                    "File Systems",
                    "Deadlocks"
                ],

                skills: [
                    "Operating Systems",
                    "System Fundamentals"
                ],

                course: "Cloud Computing"
            },

            {
                name: "Computer Networks",
                credits: 4,
                marks: 0,
                status: "In Progress",

                units: [
                    "Networking Fundamentals",
                    "Data Link Layer",
                    "Network Layer",
                    "Transport Layer",
                    "Network Security"
                ],

                skills: [
                    "Networking",
                    "TCP/IP",
                    "Network Security"
                ],

                course: "Computer Networking"
            },

            {
                name: "Design and Analysis of Algorithms",
                credits: 4,
                marks: 0,
                status: "In Progress",

                units: [
                    "Algorithm Analysis",
                    "Divide & Conquer",
                    "Greedy Algorithms",
                    "Dynamic Programming",
                    "Graph Algorithms"
                ],

                skills: [
                    "Algorithms",
                    "Problem Solving",
                    "Optimization"
                ],

                course: "JavaScript"
            },

            {
                name: "Web Technology",
                credits: 3,
                marks: 0,
                status: "In Progress",

                units: [
                    "HTML",
                    "CSS",
                    "JavaScript",
                    "Frontend Development",
                    "Web Applications"
                ],

                skills: [
                    "HTML",
                    "CSS",
                    "JavaScript",
                    "Web Development"
                ],

                course: "JavaScript"
            }
        ],


        "4": [

            {
                name: "Software Engineering",
                credits: 4,
                marks: 0,
                status: "Upcoming",

                units: [
                    "Software Processes",
                    "Requirements Engineering",
                    "System Design",
                    "Testing",
                    "Project Management"
                ],

                skills: [
                    "Software Development",
                    "Project Management"
                ],

                course: "Git & GitHub"
            },

            {
                name: "Computer Architecture",
                credits: 4,
                marks: 0,
                status: "Upcoming",

                units: [
                    "Computer Organization",
                    "CPU Architecture",
                    "Memory",
                    "I/O Organization",
                    "Parallel Processing"
                ],

                skills: [
                    "Computer Architecture",
                    "System Design"
                ],

                course: "Computer Networking"
            },

            {
                name: "Theory of Computation",
                credits: 4,
                marks: 0,
                status: "Upcoming",

                units: [
                    "Finite Automata",
                    "Regular Languages",
                    "Context Free Grammar",
                    "Pushdown Automata",
                    "Turing Machines"
                ],

                skills: [
                    "Logic",
                    "Computational Thinking"
                ],

                course: "Machine Learning"
            },

            {
                name: "Artificial Intelligence",
                credits: 4,
                marks: 0,
                status: "Upcoming",

                units: [
                    "AI Fundamentals",
                    "Search Algorithms",
                    "Knowledge Representation",
                    "Machine Learning Basics",
                    "AI Applications"
                ],

                skills: [
                    "Artificial Intelligence",
                    "Machine Learning"
                ],

                course: "Machine Learning"
            }
        ]
    };


    /* =====================================================
       7. INDUSTRY MAPPING
    ===================================================== */

    const industryMapping = {

        "Data Structures": {
            skills: [
                "Data Structures",
                "Algorithms",
                "Problem Solving"
            ],

            roles: [
                "Software Developer",
                "Backend Developer",
                "Full Stack Developer"
            ]
        },

        "Object Oriented Programming": {
            skills: [
                "OOP",
                "Programming",
                "Problem Solving"
            ],

            roles: [
                "Software Developer",
                "Application Developer"
            ]
        },

        "Database Management System": {
            skills: [
                "SQL",
                "Database Design",
                "Normalization",
                "Transactions"
            ],

            roles: [
                "Backend Developer",
                "Database Developer",
                "Data Analyst"
            ]
        },

        "Operating System": {
            skills: [
                "Operating Systems",
                "System Fundamentals",
                "Process Management"
            ],

            roles: [
                "Software Developer",
                "System Engineer",
                "Cloud Engineer"
            ]
        },

        "Computer Networks": {
            skills: [
                "Networking",
                "TCP/IP",
                "Network Security"
            ],

            roles: [
                "Network Engineer",
                "Cloud Engineer",
                "Cyber Security Analyst"
            ]
        },

        "Design and Analysis of Algorithms": {
            skills: [
                "Algorithms",
                "Optimization",
                "Problem Solving"
            ],

            roles: [
                "Software Developer",
                "Software Engineer"
            ]
        },

        "Web Technology": {
            skills: [
                "HTML",
                "CSS",
                "JavaScript",
                "Responsive Design"
            ],

            roles: [
                "Frontend Developer",
                "Full Stack Developer",
                "Web Developer"
            ]
        }
    };


    /* =====================================================
       8. SAVED PROGRESS
    ===================================================== */

    let savedProgress =
        getStorage(
            "skillUpAcademicProgress",
            {}
        );


    /* =====================================================
       9. SAVE PROGRESS
    ===================================================== */

    function saveProgress() {

        localStorage.setItem(
            "skillUpAcademicProgress",
            JSON.stringify(savedProgress)
        );
    }


    /* =====================================================
       10. GET SUBJECT PROGRESS
    ===================================================== */

    function getSubjectProgress(
        semester,
        subjectIndex,
        subject
    ) {

        const key =
            `${semester}_${subjectIndex}`;

        if (
            savedProgress[key] &&
            Array.isArray(savedProgress[key])
        ) {
            return savedProgress[key];
        }

        if (subject.status === "Completed") {
            return subject.units.map(() => true);
        }

        return subject.units.map(() => false);
    }


    /* =====================================================
       11. SUBJECT PROGRESS %
    ===================================================== */

    function calculateSubjectProgress(
        semester,
        subjectIndex,
        subject
    ) {

        const progress =
            getSubjectProgress(
                semester,
                subjectIndex,
                subject
            );

        if (!progress.length) {
            return 0;
        }

        const completed =
            progress.filter(Boolean).length;

        return Math.round(
            (completed / progress.length) * 100
        );
    }


    /* =====================================================
       12. SAVE COMPLETE ACADEMIC PROFILE
    ===================================================== */

    function saveAcademicData() {

        const semester =
            semesterSelect
                ? semesterSelect.value
                : "2";

        const currentSubjects =
            academicData[semester] || [];

        let currentCompletedUnits = 0;
        let currentTotalUnits = 0;

        currentSubjects.forEach(
            (subject, index) => {

                const progress =
                    getSubjectProgress(
                        semester,
                        index,
                        subject
                    );

                currentTotalUnits +=
                    progress.length;

                currentCompletedUnits +=
                    progress.filter(Boolean).length;
            }
        );

        const currentProgress =
            currentTotalUnits
                ? Math.round(
                    (
                        currentCompletedUnits /
                        currentTotalUnits
                    ) * 100
                )
                : 0;

        const academicProfile = {

            semester,

            progress:
                currentProgress,

            completedUnits:
                currentCompletedUnits,

            totalUnits:
                currentTotalUnits,

            lastUpdated:
                new Date().toISOString(),

            unitProgress:
                savedProgress
        };

        localStorage.setItem(
            "skillUpAcademics",
            JSON.stringify(
                academicProfile
            )
        );


        /* =================================================
           SYNC PROFILE
        ================================================= */

        const currentProfile =
            getStorage(
                "skillUpProfile",
                {}
            );

        currentProfile.academicProgress =
            currentProgress;

        currentProfile.academicSemester =
            semester;

        currentProfile.academicCompletedUnits =
            currentCompletedUnits;

        currentProfile.academicTotalUnits =
            currentTotalUnits;

        localStorage.setItem(
            "skillUpProfile",
            JSON.stringify(currentProfile)
        );
    }


    /* =====================================================
       13. RENDER SUBJECTS
    ===================================================== */

    function renderSubjects(
        semester = "2"
    ) {

        if (!subjectsContainer) {
            return;
        }

        const subjects =
            academicData[semester] || [];

        subjectsContainer.innerHTML = "";

        if (totalSubjects) {
            totalSubjects.textContent =
                subjects.length;
        }


        subjects.forEach(
            (subject, subjectIndex) => {

                const progress =
                    calculateSubjectProgress(
                        semester,
                        subjectIndex,
                        subject
                    );

                let statusText =
                    "Not Started";

                if (progress === 100) {
                    statusText = "Completed";
                }
                else if (progress > 0) {
                    statusText = "In Progress";
                }


                const statusClass =
                    statusText
                        .toLowerCase()
                        .replace(/\s+/g, "-");


                const marksText =
                    subject.marks > 0
                        ? `${subject.marks}%`
                        : "—";


                const skillsHTML =
                    subject.skills
                        .map(
                            skill => `
                                <span class="skill-tag">
                                    ${skill}
                                </span>
                            `
                        )
                        .join("");


                const units =
                    getSubjectProgress(
                        semester,
                        subjectIndex,
                        subject
                    );


                const unitHTML =
                    subject.units
                        .map(
                            (unit, unitIndex) => {

                                const completed =
                                    units[unitIndex] === true;

                                return `
                                    <div
                                        class="academic-unit"
                                        data-semester="${semester}"
                                        data-subject="${subjectIndex}"
                                        data-unit="${unitIndex}"
                                    >

                                        <div class="unit-left">

                                            <span
                                                class="unit-check ${completed ? "completed" : ""}"
                                            >
                                                ${completed ? "✓" : ""}
                                            </span>

                                            <span>
                                                Unit ${unitIndex + 1}
                                                — ${unit}
                                            </span>

                                        </div>

                                    </div>
                                `;
                            }
                        )
                        .join("");


                const card =
                    document.createElement("div");

                card.className =
                    "subject-card";


                card.innerHTML = `

                    <div class="subject-header">

                        <div>

                            <h3>
                                ${subject.name}
                            </h3>

                            <span class="subject-credits">
                                ${subject.credits} Credits
                            </span>

                        </div>

                        <span
                            class="subject-status ${statusClass}"
                        >
                            ${statusText}
                        </span>

                    </div>


                    <div class="academic-subject-progress">

                        <div class="progress-top">

                            <span>
                                Subject Progress
                            </span>

                            <strong>
                                ${progress}%
                            </strong>

                        </div>

                        <div class="subject-progress-bar">

                            <div
                                class="subject-progress-fill"
                                style="width:${progress}%"
                            ></div>

                        </div>

                    </div>


                    <div class="subject-info">

                        <div>

                            <small>
                                Marks
                            </small>

                            <strong>
                                ${marksText}
                            </strong>

                        </div>


                        <div>

                            <small>
                                Industry Skills
                            </small>

                            <div class="skill-tags">
                                ${skillsHTML}
                            </div>

                        </div>

                    </div>


                    <div class="academic-units">

                        <div class="units-title">

                            <strong>
                                Unit Progress
                            </strong>

                            <span>
                                Click a unit to update
                            </span>

                        </div>

                        <div class="units-list">
                            ${unitHTML}
                        </div>

                    </div>


                    <div class="subject-footer">

                        <a
                            href="courses.html?course=${encodeURIComponent(subject.course)}"
                            class="course-link"
                        >
                            Learn ${subject.course} →
                        </a>

                    </div>
                `;


                subjectsContainer.appendChild(card);
            }
        );


        attachUnitEvents();

        updateProgress(
            subjects,
            semester
        );

        updatePerformance(
            subjects,
            semester
        );

        renderIndustryMapping(
            subjects
        );

        renderRecommendations(
            subjects
        );
    }


    /* =====================================================
       14. UNIT CLICK EVENTS
    ===================================================== */

    function attachUnitEvents() {

        const units =
            document.querySelectorAll(
                ".academic-unit"
            );

        units.forEach(unit => {

            unit.addEventListener(
                "click",
                function () {

                    const semester =
                        this.dataset.semester;

                    const subjectIndex =
                        Number(
                            this.dataset.subject
                        );

                    const unitIndex =
                        Number(
                            this.dataset.unit
                        );

                    const subject =
                        academicData[
                            semester
                        ][subjectIndex];

                    const progress =
                        getSubjectProgress(
                            semester,
                            subjectIndex,
                            subject
                        );

                    progress[unitIndex] =
                        !progress[unitIndex];


                    savedProgress[
                        `${semester}_${subjectIndex}`
                    ] = progress;


                    saveProgress();

                    saveAcademicData();


                    renderSubjects(
                        semester
                    );
                }
            );
        });
    }


    /* =====================================================
       15. OVERALL PROGRESS
    ===================================================== */

    function updateProgress(
        subjects,
        semester
    ) {

        if (!subjects.length) {
            return;
        }

        let totalUnits = 0;
        let completedUnits = 0;
        let completedSubjectsCount = 0;


        subjects.forEach(
            (subject, index) => {

                const unitProgress =
                    getSubjectProgress(
                        semester,
                        index,
                        subject
                    );

                totalUnits +=
                    unitProgress.length;

                completedUnits +=
                    unitProgress.filter(Boolean).length;


                const subjectPercentage =
                    unitProgress.length
                        ? (
                            unitProgress.filter(Boolean)
                                .length /
                            unitProgress.length
                        ) * 100
                        : 0;


                if (subjectPercentage === 100) {
                    completedSubjectsCount++;
                }
            }
        );


        const progress =
            totalUnits
                ? Math.round(
                    (
                        completedUnits /
                        totalUnits
                    ) * 100
                )
                : 0;


        if (completedSubjects) {
            completedSubjects.textContent =
                completedSubjectsCount;
        }

        if (totalSubjects) {
            totalSubjects.textContent =
                subjects.length;
        }

        if (overallProgress) {
            overallProgress.textContent =
                `${progress}%`;
        }

        if (progressFill) {
            progressFill.style.width =
                `${progress}%`;
        }


        /* =================================================
           UPDATE CIRCULAR PROGRESS IF PRESENT
           ================================================= */

        const progressCircle =
            document.querySelector(
                ".progress-circle"
            );

        if (progressCircle) {

            progressCircle.style.background =
                `conic-gradient(
                    #f97316 ${progress * 3.6}deg,
                    #e8edf5 ${progress * 3.6}deg
                )`;
        }


        /* =================================================
           SYNC PROFILE
           ================================================= */

        const currentProfile =
            getStorage(
                "skillUpProfile",
                {}
            );

        currentProfile.academicProgress =
            progress;

        currentProfile.academicSemester =
            semester;

        localStorage.setItem(
            "skillUpProfile",
            JSON.stringify(currentProfile)
        );
    }


    /* =====================================================
       16. PERFORMANCE
    ===================================================== */

    function updatePerformance(
        subjects,
        semester
    ) {

        if (strongSubjects) {
            strongSubjects.innerHTML = "";
        }

        if (improvementSubjects) {
            improvementSubjects.innerHTML = "";
        }


        const strong = [];
        const improvement = [];


        subjects.forEach(
            (subject, index) => {

                const progress =
                    calculateSubjectProgress(
                        semester,
                        index,
                        subject
                    );


                if (progress >= 70) {

                    strong.push({
                        name: subject.name,
                        progress
                    });

                } else {

                    improvement.push({
                        name: subject.name,
                        progress
                    });
                }
            }
        );


        if (strongSubjects) {

            if (!strong.length) {

                strongSubjects.innerHTML = `
                    <span class="empty-message">
                        No strong subjects yet.
                    </span>
                `;

            } else {

                strong.forEach(
                    subject => {

                        strongSubjects.innerHTML += `

                            <div class="performance-item">

                                <span>
                                    ${subject.name}
                                </span>

                                <strong>
                                    ${subject.progress}%
                                </strong>

                            </div>

                        `;
                    }
                );
            }
        }


        if (improvementSubjects) {

            if (!improvement.length) {

                improvementSubjects.innerHTML = `
                    <span class="empty-message">
                        No improvement area identified.
                    </span>
                `;

            } else {

                improvement.forEach(
                    subject => {

                        improvementSubjects.innerHTML += `

                            <div class="performance-item">

                                <span>
                                    ${subject.name}
                                </span>

                                <strong>
                                    ${subject.progress}%
                                </strong>

                            </div>

                        `;
                    }
                );
            }
        }
    }


    /* =====================================================
       17. INDUSTRY MAPPING
    ===================================================== */

    function renderIndustryMapping(
        subjects
    ) {

        if (!mappingContainer) {
            return;
        }

        mappingContainer.innerHTML = "";


        subjects.forEach(
            subject => {

                const mapping =
                    industryMapping[
                        subject.name
                    ];


                if (!mapping) {
                    return;
                }


                const skillsHTML =
                    mapping.skills
                        .map(
                            skill => `
                                <span class="skill-tag">
                                    ${skill}
                                </span>
                            `
                        )
                        .join("");


                const rolesHTML =
                    mapping.roles
                        .map(
                            role => `
                                <span class="role-tag">
                                    ${role}
                                </span>
                            `
                        )
                        .join("");


                const card =
                    document.createElement("div");

                card.className =
                    "mapping-card";


                card.innerHTML = `

                    <div class="mapping-icon">
                        🎓
                    </div>

                    <div class="mapping-content">

                        <h3>
                            ${subject.name}
                        </h3>

                        <p>
                            Academic Subject
                            → Industry Skill
                            → Career Role
                        </p>


                        <div class="mapping-section">

                            <strong>
                                Industry Skills
                            </strong>

                            <div class="skill-tags">
                                ${skillsHTML}
                            </div>

                        </div>


                        <div class="mapping-section">

                            <strong>
                                Relevant Roles
                            </strong>

                            <div class="role-tags">
                                ${rolesHTML}
                            </div>

                        </div>

                    </div>
                `;


                mappingContainer.appendChild(card);
            }
        );
    }


    /* =====================================================
       18. ASSESSMENT DATA
    ===================================================== */

    const assessmentData =
        getStorage(
            "skillUpProfile",
            {}
        );

    const assessmentResult =
        getStorage(
            "assessmentResult",
            {}
        );


    let assessmentGaps = [];


    if (
        Array.isArray(
            assessmentData.skillGap
        )
    ) {

        assessmentGaps =
            assessmentData.skillGap;

    } else if (
        Array.isArray(
            assessmentResult.skillGap
        )
    ) {

        assessmentGaps =
            assessmentResult.skillGap;
    }


    assessmentGaps =
        assessmentGaps
            .map(item => {

                if (
                    typeof item === "string"
                ) {
                    return item;
                }

                return (
                    item.skill ||
                    item.name ||
                    item.title ||
                    ""
                );
            })
            .filter(Boolean);


    /* =====================================================
       19. COURSE MAPPING
    ===================================================== */

    const courseMap = {

        "HTML":
            "HTML & CSS",

        "CSS":
            "HTML & CSS",

        "JavaScript":
            "JavaScript",

        "React":
            "React",

        "SQL":
            "SQL & Databases",

        "Database":
            "SQL & Databases",

        "Machine Learning":
            "Machine Learning",

        "Deep Learning":
            "Deep Learning",

        "Cloud":
            "Cloud Computing",

        "Cloud Computing":
            "Cloud Computing",

        "Networking":
            "Computer Networking",

        "Computer Networking":
            "Computer Networking",

        "Cyber Security":
            "Cyber Security",

        "Git":
            "Git & GitHub",

        "Git & GitHub":
            "Git & GitHub",

        "Data Analytics":
            "Data Analytics",

        "Power BI":
            "Power BI",

        "AWS":
            "AWS Fundamentals",

        "AWS Fundamentals":
            "AWS Fundamentals",

        "UI/UX":
            "UI/UX Design"
    };


    /* =====================================================
       20. RECOMMENDATIONS
    ===================================================== */

    function renderRecommendations(
        subjects
    ) {

        if (!recommendedContainer) {
            return;
        }

        recommendedContainer.innerHTML = "";


        const recommendations = [];


        /* Assessment skill gaps first */

        assessmentGaps.forEach(
            gap => {

                if (
                    gap &&
                    !recommendations.includes(gap)
                ) {
                    recommendations.push(gap);
                }
            }
        );


        /* Academic courses second */

        subjects.forEach(
            subject => {

                if (
                    subject.course &&
                    !recommendations.includes(
                        subject.course
                    )
                ) {

                    recommendations.push(
                        subject.course
                    );
                }
            }
        );


        if (!recommendations.length) {

            recommendedContainer.innerHTML = `

                <p class="empty-message">
                    Complete your skill assessment
                    to receive personalized recommendations.
                </p>

            `;

            return;
        }


        recommendations
            .slice(0, 6)
            .forEach(
                recommendation => {

                    const card =
                        document.createElement(
                            "div"
                        );

                    card.className =
                        "recommendation-card";


                    const course =
                        courseMap[
                            recommendation
                        ] ||
                        recommendation;


                    card.innerHTML = `

                        <div class="recommendation-icon">
                            🚀
                        </div>

                        <div>

                            <h3>
                                ${recommendation}
                            </h3>

                            <p>
                                Recommended from your
                                academic and skill profile.
                            </p>

                            <a
                                href="courses.html?course=${encodeURIComponent(course)}"
                            >
                                Start Learning →
                            </a>

                        </div>

                    `;


                    recommendedContainer
                        .appendChild(card);
                }
            );
    }


    /* =====================================================
       21. SEMESTER CHANGE
    ===================================================== */

    if (semesterSelect) {

        semesterSelect.addEventListener(
            "change",
            function () {

                const semester =
                    this.value;


                renderSubjects(
                    semester
                );


                if (studentSemester) {

                    studentSemester.textContent =
                        `${getOrdinal(semester)} Semester`;
                }


                saveAcademicData();
            }
        );
    }


    /* =====================================================
       22. LOAD SAVED ACADEMIC DATA
    ===================================================== */

    function loadSavedAcademicData() {

        const saved =
            getStorage(
                "skillUpAcademics",
                {}
            );


        if (
            saved.semester &&
            semesterSelect &&
            academicData[
                saved.semester
            ]
        ) {

            semesterSelect.value =
                saved.semester;
        }


        if (
            saved.unitProgress &&
            typeof saved.unitProgress === "object"
        ) {

            savedProgress =
                saved.unitProgress;

            saveProgress();
        }
    }


    /* =====================================================
       23. INITIAL LOAD
    ===================================================== */

    loadSavedAcademicData();


    const selectedSemester =
        semesterSelect
            ? semesterSelect.value
            : "2";


    if (studentSemester) {

        studentSemester.textContent =
            `${getOrdinal(selectedSemester)} Semester`;
    }


    renderSubjects(
        selectedSemester
    );


    /* =====================================================
       24. SAVE BEFORE LEAVING
    ===================================================== */

    window.addEventListener(
        "beforeunload",
        saveAcademicData
    );


    /* =====================================================
       25. GLOBAL REFRESH
    ===================================================== */

    window.refreshAcademics =
        function () {

            syncProfileData();

            const semester =
                semesterSelect
                    ? semesterSelect.value
                    : "2";

            renderSubjects(
                semester
            );
        };


    /* =====================================================
       26. DEBUG
    ===================================================== */

    console.log(
        "Skill Up Academics — Final JS Loaded 🚀"
    );

});