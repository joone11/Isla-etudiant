

const DEFAULT_DATA = {
    student: {
        id: "ISLA-2026-001",
        nom: "Kossi Mensah",
        prenom: "Jean",
        matricule: "ISLA2026001",
        filiere: "Informatique",
        niveau: "Licence 2",
        email: "etudiant@isla.tg",
        telephone: "+228 90 00 00 00",
        dateNaissance: "15/03/2005",
        statut: "Étudiant actif",
        campus: "Abidjan Plateau",
        responsable: "Prof. Koné",
        contactParent: "Mme Dupont",
        anneeAcademique: "2025–2026",
        specialite: "Développement logiciel",
        option: "Cybersécurité"
    },
    dashboard: {
        coursCetteSemaine: 8,
        examensAVenir: 2,
        moyenneGenerale: 14.5,
        solde: 200000
    },
    emploiDuTemps: [
        { jour: "Lundi", date: "10/08/2026", heureDebut: "08:00", heureFin: "10:00", matiere: "Programmation Web", enseignant: "M. Koffi", salle: "Salle A12" },
        { jour: "Lundi", date: "10/08/2026", heureDebut: "10:30", heureFin: "12:30", matiere: "Base de données", enseignant: "Mme Mensah", salle: "Salle B04" },
        { jour: "Mardi", date: "11/08/2026", heureDebut: "08:00", heureFin: "10:00", matiere: "Réseaux", enseignant: "M. Lawson", salle: "Salle A08" },
        { jour: "Mercredi", date: "12/08/2026", heureDebut: "09:00", heureFin: "11:00", matiere: "Systèmes d'information", enseignant: "M. Agbeko", salle: "Salle C02" },
        { jour: "Jeudi", date: "13/08/2026", heureDebut: "13:00", heureFin: "15:00", matiere: "Algorithmique", enseignant: "Mme Yao", salle: "Salle D03" },
        { jour: "Vendredi", date: "14/08/2026", heureDebut: "10:00", heureFin: "12:00", matiere: "Anglais technique", enseignant: "M. Soro", salle: "Salle E01" }
    ],
    examens: [
        { matiere: "Programmation Web", date: "18/08/2026", heure: "08:00", salle: "Salle A12", statut: "À venir" },
        { matiere: "Base de données", date: "21/08/2026", heure: "10:00", salle: "Salle B04", statut: "À venir" }
    ],
    resultats: {
        moyenneGenerale: 14.5,
        matieresValidees: 6,
        matieresARevalider: 2,
        totalMatieres: 8,
        matieres: [
            { code: "INF101", matiere: "Programmation Web", note: 16, credit: 4, statut: "Validée" },
            { code: "INF102", matiere: "Base de données", note: 15, credit: 4, statut: "Validée" },
            { code: "INF103", matiere: "Réseaux", note: 14, credit: 3, statut: "Validée" },
            { code: "INF104", matiere: "Systèmes d'information", note: 13, credit: 3, statut: "Validée" },
            { code: "INF105", matiere: "Algorithmique", note: 12, credit: 4, statut: "Validée" },
            { code: "INF106", matiere: "Architecture des ordinateurs", note: 14, credit: 3, statut: "Validée" },
            { code: "INF107", matiere: "Mathématiques", note: 9, credit: 3, statut: "À revalider" },
            { code: "INF108", matiere: "Anglais", note: 8, credit: 2, statut: "À revalider" }
        ]
    },
    finances: {
        montantTotal: 650000,
        montantPaye: 450000,
        resteAPayer: 200000,
        pourcentagePaye: 69.23
    },
    evenements: [
        { id: 1, titre: "Journée d'intégration", date: "15/08/2026", description: "Activité destinée aux étudiants de l'établissement.", lieu: "ISLA" },
        { id: 2, titre: "Rencontre étudiante", date: "22/08/2026", description: "Rencontre et échanges autour de la vie universitaire.", lieu: "Salle polyvalente" },
        { id: 3, titre: "Activité académique", date: "28/08/2026", description: "Activité liée à la vie académique de l'établissement.", lieu: "ISLA" }
    ]
};

const STAFF_PROFILES = {
    admin: { role: "Administrateur", label: "Administrateur", usernameLabel: "Identifiant professionnel", destination: "admin.html" },
    direction: { role: "Responsable d'établissement / DG", label: "Responsable d'établissement / DG", usernameLabel: "Matricule professionnel", destination: "staff_dashboard.html?role=direction" },
    secretary: { role: "Secrétaire", label: "Secrétaire", usernameLabel: "Matricule professionnel", destination: "staff_dashboard.html?role=secretary" },
    animation: { role: "Personnel d'animation", label: "Personnel d'animation", usernameLabel: "Identifiant professionnel", destination: "staff_dashboard.html?role=animation" },
    accounting: { role: "Comptable", label: "Comptable", usernameLabel: "Matricule professionnel", destination: "staff_dashboard.html?role=accounting" },
    medical: { role: "Médecin / Service médical", label: "Médecin / Service médical", usernameLabel: "Matricule professionnel", destination: "staff_dashboard.html?role=medical" }
};

const STAFF_ROLES = Object.values(STAFF_PROFILES).map((profile) => profile.role);

function getStaffProfileByRole(role) {
    return Object.values(STAFF_PROFILES).find((profile) => profile.role === role);
}

function getStoredStudentForCurrentUser() {
    let currentUser = null;
    let students = [];
    try { currentUser = JSON.parse(localStorage.getItem('islaCurrentUser') || 'null'); } catch (error) { currentUser = null; }
    try { students = JSON.parse(localStorage.getItem('islaStudents') || '[]'); } catch (error) { students = []; }
    if (!currentUser || currentUser.role !== 'Étudiant') return null;
    return students.find((student) => student.id === currentUser.studentId || student.username === currentUser.username) || null;
}

function studentProfileData(student, fallback) {
    if (!student) return fallback;
    return {
        ...fallback,
        prenom: student.firstName,
        nom: student.lastName,
        matricule: student.matricule,
        filiere: student.program,
        niveau: student.level,
        email: student.email,
        telephone: student.phone,
        dateNaissance: student.birthDate,
        statut: student.status,
        campus: `${student.city}, ${student.country}`,
        responsable: 'Administration ISLA',
        contactParent: 'Non renseigné',
        anneeAcademique: student.academicYear,
        specialite: student.program,
        option: student.className,
        address: [student.district, student.address, student.city, student.country].filter(Boolean).join(', ')
    };
}

function formatCurrency(value) {
    return `${value.toLocaleString("fr-FR")} FCFA`;
}

function escapeHTML(value) {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

async function hashPassword(password, salt) {
    const bytes = new TextEncoder().encode(`${salt}:${password}`);
    const digest = await crypto.subtle.digest("SHA-256", bytes);
    return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

function createPasswordSalt() {
    const bytes = crypto.getRandomValues(new Uint8Array(16));
    return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
}

async function ensureDemoAdministrator() {
    let users = [];
    try { users = JSON.parse(localStorage.getItem('islaUsers') || '[]'); } catch (error) { users = []; }
    if (users.some((user) => user.role === STAFF_PROFILES.admin.role)) return;

    const passwordSalt = createPasswordSalt();
    users.push({
        username: 'admin.isla',
        email: 'admin@isla.local',
        fullName: 'Administrateur ISLA',
        role: STAFF_PROFILES.admin.role,
        accountActive: true,
        passwordSalt,
        passwordHash: await hashPassword('AdminISLA2026!', passwordSalt)
    });
    localStorage.setItem('islaUsers', JSON.stringify(users));
}

function renderProfile(data) {
    const student = studentProfileData(getStoredStudentForCurrentUser(), data.student);

    const profileName = document.getElementById("profileName");
    const profileSubtitle = document.getElementById("profileSubtitle");
    const profileFirstName = document.getElementById("profileFirstName");
    const profileLastName = document.getElementById("profileLastName");
    const profileAge = document.getElementById("profileAge");
    const profileBirthDate = document.getElementById("profileBirthDate");
    const profileFiliere = document.getElementById("profileFiliere");
    const profileNiveau = document.getElementById("profileNiveau");
    const profileSpecialite = document.getElementById("profileSpecialite");
    const profileOption = document.getElementById("profileOption");
    const profileEmail = document.getElementById("profileEmail");
    const profilePhone = document.getElementById("profilePhone");
    const profileAddress = document.getElementById("profileAddress");
    const profileCampus = document.getElementById("profileCampus");
    const profileResponsable = document.getElementById("profileResponsable");
    const profileContactParent = document.getElementById("profileContactParent");
    const profileStatut = document.getElementById("profileStatut");
    const profileAcademicYear = document.getElementById("profileAcademicYear");
    const profileMatricule = document.getElementById("profileMatricule");

    if (profileName) profileName.textContent = `${student.prenom} ${student.nom}`;
    if (profileSubtitle) profileSubtitle.textContent = `Étudiant en ${student.filiere} · Promotion 2026`;
    if (profileFirstName) profileFirstName.textContent = student.prenom;
    if (profileLastName) profileLastName.textContent = student.nom;
    if (profileAge) {
        const birthYear = Number(String(student.dateNaissance).slice(0, 4));
        profileAge.textContent = birthYear ? `${new Date().getFullYear() - birthYear} ans` : 'Non renseigné';
    }
    if (profileBirthDate) profileBirthDate.textContent = student.dateNaissance;
    if (profileFiliere) profileFiliere.textContent = student.filiere;
    if (profileNiveau) profileNiveau.textContent = student.niveau;
    if (profileSpecialite) profileSpecialite.textContent = student.specialite;
    if (profileOption) profileOption.textContent = student.option;
    if (profileEmail) profileEmail.textContent = student.email;
    if (profilePhone) profilePhone.textContent = student.telephone;
    if (profileAddress) profileAddress.textContent = student.address || "Non renseignée";
    if (profileCampus) profileCampus.textContent = student.campus;
    if (profileResponsable) profileResponsable.textContent = student.responsable;
    if (profileContactParent) profileContactParent.textContent = student.contactParent;
    if (profileStatut) profileStatut.textContent = student.statut;
    if (profileAcademicYear) profileAcademicYear.textContent = student.anneeAcademique;
    if (profileMatricule) profileMatricule.textContent = student.matricule;
}

function renderDashboard(data) {
    const dashboard = data.dashboard;

    const welcomeMessage = document.getElementById("dashboardWelcome");
    const coursesCountValue = document.getElementById("coursesCountValue");
    const examCountValue = document.getElementById("examCountValue");
    const moyenneValue = document.getElementById("moyenneValue");
    const soldeValue = document.getElementById("soldeValue");

    if (welcomeMessage) {
        welcomeMessage.textContent = `Bienvenue ${data.student.prenom} dans votre espace étudiant ISLA.`;
    }
    if (coursesCountValue) coursesCountValue.textContent = `${dashboard.coursCetteSemaine} séances programmées`;
    if (examCountValue) examCountValue.textContent = `${dashboard.examensAVenir} examens programmés`;
    if (moyenneValue) moyenneValue.textContent = `${dashboard.moyenneGenerale.toFixed(1)} / 20`;
    if (soldeValue) soldeValue.textContent = formatCurrency(dashboard.solde);
}

function renderSchedule(data) {
    const body = document.getElementById("scheduleBody");
    if (!body) return;

    const joursOrdre = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"];
    const emploisParJour = joursOrdre.map((jour) => {
        return data.emploiDuTemps.filter((entry) => entry.jour === jour);
    });

    body.innerHTML = emploisParJour.map((entries) => {
        if (entries.length === 0) {
            return `
                <tr>
                    <th>${escapeHTML(joursOrdre[emploisParJour.indexOf(entries)])}</th>
                    <td colspan="4">Aucun cours prévu</td>
                </tr>
            `;
        }

        return entries.map((entry, index) => `
            <tr>
                ${index === 0 ? `<th rowspan="${entries.length}">${escapeHTML(entry.jour)}</th>` : ""}
                <td>${escapeHTML(entry.heureDebut)}–${escapeHTML(entry.heureFin)}</td>
                <td>${escapeHTML(entry.matiere)}</td>
                <td>${escapeHTML(entry.enseignant)}</td>
                <td>${escapeHTML(entry.salle)}</td>
            </tr>
        `).join("");
    }).join("");
}

function renderExams(data) {
    const list = document.getElementById("examsList");
    if (!list) return;

    list.innerHTML = data.examens.map((exam) => `
        <article class="feature-card">
            <h3>${escapeHTML(exam.matiere)}</h3>
            <p>Date : ${escapeHTML(exam.date)}</p>
            <p>Heure : ${escapeHTML(exam.heure)}</p>
            <p>Salle : ${escapeHTML(exam.salle)}</p>
            <p>Statut : ${escapeHTML(exam.statut)}</p>
        </article>
    `).join("");
}

function renderResults(data) {
    const results = data.resultats;

    const average = document.getElementById("resultsAverage");
    const validatedCount = document.getElementById("resultsValidatedCount");
    const semester = document.getElementById("resultsSemester");
    const validatedList = document.getElementById("resultsValidatedList");
    const toRetakeList = document.getElementById("resultsToRetakeList");

    if (average) average.textContent = `${results.moyenneGenerale.toFixed(1)} / 20`;
    if (validatedCount) validatedCount.textContent = `${results.matieresValidees} / ${results.totalMatieres}`;
    if (semester) semester.textContent = "Semestre 2";

    if (validatedList) {
        validatedList.innerHTML = results.matieres
            .filter((item) => item.statut === "Validée")
            .map((item) => `<li>${escapeHTML(item.matiere)} — ${escapeHTML(item.note)}/20</li>`)
            .join("");
    }

    if (toRetakeList) {
        toRetakeList.innerHTML = results.matieres
            .filter((item) => item.statut === "À revalider")
            .map((item) => `<li>${escapeHTML(item.matiere)} — ${escapeHTML(item.note)}/20</li>`)
            .join("");
    }
}

function renderFinances(data) {
    const finances = data.finances;

    const total = document.getElementById("financeTotal");
    const paid = document.getElementById("financePaid");
    const remaining = document.getElementById("financeRemaining");

    if (total) total.textContent = formatCurrency(finances.montantTotal);
    if (paid) paid.textContent = formatCurrency(finances.montantPaye);
    if (remaining) remaining.textContent = formatCurrency(finances.resteAPayer);
}

function renderEvents(data) {
    const list = document.getElementById("eventsList");
    if (!list) return;

    list.innerHTML = data.evenements.map((event) => `
        <article class="feature-card">
            <h3>${escapeHTML(event.titre)}</h3>
            <p>${escapeHTML(event.date)}</p>
            <p>${escapeHTML(event.description)}</p>
            <p><strong>Lieu :</strong> ${escapeHTML(event.lieu)}</p>
        </article>
    `).join("");
}

async function loadData() {
    try {
        const response = await fetch("data.json");
        if (!response.ok) throw new Error("Impossible de charger data.json");
        const data = await response.json();
        return data;
    } catch (error) {
        console.warn("Chargement du fichier JSON impossible, utilisation des données par défaut.", error);
        return DEFAULT_DATA;
    }
}

function updateAuthenticatedNavigation() {
    const isLoggedIn = localStorage.getItem('islaLoggedIn') === 'true';
    if (!isLoggedIn) return;

    const currentUser = (() => {
        try { return JSON.parse(localStorage.getItem('islaCurrentUser') || 'null'); } catch (error) { return null; }
    })();

    if (!currentUser) return;

    const currentPage = window.location.pathname.split('/').pop();

    if (currentUser.role === 'Étudiant') {
        const studentLinks = document.querySelectorAll('a[href="login.html"], a[href="register.html"], a[href="login.html?type=student"], .nav-link-auth');
        studentLinks.forEach((link) => {
            link.style.display = 'none';
        });
    }

    if (currentUser.role === STAFF_PROFILES.admin.role || STAFF_ROLES.includes(currentUser.role)) {
        const nav = document.querySelector('.main-nav');
        if (nav && (currentPage === 'staff_dashboard.html' || currentPage === 'staff.html' || currentPage === 'staff_login.html' || currentPage === 'admin.html' || currentPage === 'admin_users.html' || currentPage === 'admin_students.html' || currentPage === 'admin_staff.html' || currentPage === 'admin_roles.html')) {
            nav.innerHTML = `
                <a href="staff.html" class="active">Staff</a>
                <a href="index.html">Accueil</a>
                <button id="logoutButton" class="btn btn-secondary">Déconnexion</button>
            `;
            const logoutButton = document.getElementById('logoutButton');
            if (logoutButton) {
                logoutButton.addEventListener('click', () => {
                    localStorage.removeItem('islaLoggedIn');
                    localStorage.removeItem('islaUser');
                    localStorage.removeItem('islaCurrentUser');
                    window.location.href = 'login.html';
                });
            }
        }
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    await ensureDemoAdministrator();
    updateAuthenticatedNavigation();
    document.querySelectorAll('input[type="password"]').forEach((input) => {
        const wrapper = document.createElement('div');
        wrapper.className = 'password-field';
        input.parentNode.insertBefore(wrapper, input);
        wrapper.appendChild(input);

        const toggle = document.createElement('button');
        toggle.type = 'button';
        toggle.className = 'password-toggle';
        toggle.textContent = 'Afficher';
        toggle.setAttribute('aria-label', 'Afficher le mot de passe');
        toggle.addEventListener('click', () => {
            const isHidden = input.type === 'password';
            input.type = isHidden ? 'text' : 'password';
            toggle.textContent = isHidden ? 'Masquer' : 'Afficher';
            toggle.setAttribute('aria-label', isHidden ? 'Masquer le mot de passe' : 'Afficher le mot de passe');
        });
        wrapper.appendChild(toggle);
    });
    const loginForm = document.getElementById("loginForm");
    const loginMessage = document.getElementById("loginMessage");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const logoutButton = document.getElementById("logoutButton");

    const DEMO_USER = "etudiant";
    const DEMO_PASSWORD = "demo123";
    const privatePages = [
        "dashboard.html",
        "profil.html",
        "carte.html",
        "emploi.html",
        "examens.html",
        "resultats.html",
        "finances.html",
        "evenements.html",
        "admin.html",
        "admin_users.html",
        "admin_students.html",
        "admin_staff.html",
        "admin_roles.html",
        "staff_dashboard.html",
        "change_password.html"
    ];
    const currentPage = window.location.pathname.split("/").pop();
    const isPrivatePage = privatePages.includes(currentPage);
    const isLoggedIn = localStorage.getItem("islaLoggedIn") === "true";

    if (isPrivatePage && !isLoggedIn) {
        window.location.href = "login.html";
        return;
    }

    const data = await loadData();

    // Initialize dropdown toggles for Staff menus
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    dropdownToggles.forEach(btn => {
        const parent = btn.closest('.nav-dropdown');
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            parent.classList.toggle('open');
            parent.querySelector('.dropdown-menu').setAttribute('aria-hidden', String(!parent.classList.contains('open')));
        });
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', () => {
        document.querySelectorAll('.nav-dropdown.open').forEach(el => {
            el.classList.remove('open');
            const menu = el.querySelector('.dropdown-menu');
            if (menu) menu.setAttribute('aria-hidden', 'true');
        });
    });

    if (currentPage === "dashboard.html") {
        renderDashboard(data);
        // personalize if user is logged in
        const currentUserJson = localStorage.getItem('islaCurrentUser');
        if (currentUserJson) {
            try {
                const userObj = JSON.parse(currentUserJson);
                const welcomeMessage = document.getElementById('dashboardWelcome');
                if (welcomeMessage) welcomeMessage.textContent = `Bienvenue ${userObj.fullName || userObj.username} dans votre espace ISLA.`;
            } catch (e) {}
        }
    }

    // Protect admin pages: require staff role
    const adminPages = ["admin.html","admin_users.html","admin_students.html","admin_staff.html","admin_roles.html"];
    const isAdminPage = adminPages.includes(currentPage);
    if (isAdminPage && isLoggedIn) {
        const curUserJson = localStorage.getItem('islaCurrentUser');
        let curRole = null;
        try { curRole = curUserJson ? JSON.parse(curUserJson).role : null; } catch(e) { curRole = null; }
        if (curRole !== STAFF_PROFILES.admin.role) {
            window.location.href = 'dashboard.html';
            return;
        }
    }

    if (currentPage === "staff_dashboard.html") {
        const currentUser = localStorage.getItem('islaCurrentUser');
        let role = null;
        try { role = currentUser ? JSON.parse(currentUser).role : null; } catch (error) { role = null; }
        const requestedProfile = STAFF_PROFILES[new URLSearchParams(window.location.search).get('role')];
        const profile = getStaffProfileByRole(role);
        if (!profile || !requestedProfile || requestedProfile.role !== role) {
            window.location.href = 'staff.html';
            return;
        }

        const title = document.getElementById('staffDashboardTitle');
        const welcome = document.getElementById('staffDashboardWelcome');
        const actions = document.getElementById('staffDashboardActions');
        const user = JSON.parse(currentUser);
        if (title) title.textContent = `Espace ${profile.label}`;
        if (welcome) welcome.textContent = `Bienvenue ${user.fullName || user.username}. Voici les outils liés à votre fonction.`;
        const roleActions = {
            direction: [['Suivi académique', 'Consulter les indicateurs de scolarité.'], ['Décisions et rapports', 'Préparer les rapports de pilotage.']],
            secretary: [['Dossiers étudiants', 'Consulter et mettre à jour les dossiers.'], ['Courriers et demandes', 'Suivre les demandes administratives.']],
            animation: [['Événements', 'Organiser les activités étudiantes.'], ['Annonces', 'Publier les communications internes.']],
            accounting: [['Situation financière', 'Consulter les paiements et soldes.'], ['Règlements', 'Suivre les opérations financières.']],
            medical: [['Suivi médical', 'Consulter les dossiers autorisés.'], ['Rendez-vous', 'Organiser les consultations.']]
        };
        if (actions) actions.innerHTML = (roleActions[new URLSearchParams(window.location.search).get('role')] || [])
            .map(([heading, description], index) => `<article class="feature-card"><div class="feature-icon">0${index + 1}</div><h3>${escapeHTML(heading)}</h3><p>${escapeHTML(description)}</p></article>`)
            .join('');
    }

    if (currentPage === "profil.html") {
        renderProfile(data);
    }

    if (currentPage === "emploi.html") {
        renderSchedule(data);
    }

    if (currentPage === "examens.html") {
        renderExams(data);
    }

    if (currentPage === "resultats.html") {
        renderResults(data);
    }

    if (currentPage === "finances.html") {
        renderFinances(data);
    }

    if (currentPage === "evenements.html") {
        renderEvents(data);
    }

    if (loginForm && usernameInput && passwordInput && loginMessage) {
        loginForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            const username = usernameInput.value.trim();
            const password = passwordInput.value;

            // check stored users
            const usersJson = localStorage.getItem('islaUsers');
            let users = [];
            try { users = usersJson ? JSON.parse(usersJson) : []; } catch(e) { users = []; }

            const candidate = users.find((user) => user.username === username || user.email === username);
            let found = null;
            if (candidate?.passwordHash && candidate.passwordSalt) {
                const passwordHash = await hashPassword(password, candidate.passwordSalt);
                if (passwordHash === candidate.passwordHash) found = candidate;
            } else if (candidate?.password === password) {
                // Migration automatique des anciens comptes stockés en clair.
                const passwordSalt = createPasswordSalt();
                candidate.passwordSalt = passwordSalt;
                candidate.passwordHash = await hashPassword(password, passwordSalt);
                delete candidate.password;
                localStorage.setItem('islaUsers', JSON.stringify(users));
                found = candidate;
            }
            if (found) {
                if (found.accountActive === false) {
                    loginMessage.textContent = 'Ce compte est désactivé. Contactez l’administration.';
                    loginMessage.className = 'form-message error';
                    return;
                }
                localStorage.setItem('islaLoggedIn', 'true');
                localStorage.setItem('islaUser', found.username);
                localStorage.setItem('islaCurrentUser', JSON.stringify(found));

                loginMessage.textContent = 'Connexion réussie...';
                loginMessage.className = 'form-message success';

                // redirect based on role
                const role = found.role || 'Étudiant';
                const staffProfile = getStaffProfileByRole(role);
                setTimeout(() => {
                    if (role === 'Étudiant' && found.passwordResetRequired) {
                        window.location.href = 'change_password.html';
                        return;
                    }
                    if (staffProfile) {
                        window.location.href = staffProfile.destination;
                    } else {
                        window.location.href = 'dashboard.html';
                    }
                }, 400);
                return;
            }

            // fallback demo account
            if (username === DEMO_USER && password === DEMO_PASSWORD) {
                const demoObj = { username: DEMO_USER, fullName: 'Compte Démo', role: 'Étudiant' };
                localStorage.setItem('islaLoggedIn', 'true');
                localStorage.setItem('islaUser', DEMO_USER);
                localStorage.setItem('islaCurrentUser', JSON.stringify(demoObj));

                loginMessage.textContent = 'Connexion réussie...';
                loginMessage.className = 'form-message success';
                setTimeout(() => window.location.href = 'dashboard.html', 400);
                return;
            }

            loginMessage.textContent = 'Identifiant ou mot de passe incorrect.';
            loginMessage.className = 'form-message error';
        });
    }

    const staffLoginForm = document.getElementById('staffLoginForm');
    const staffRoleKey = new URLSearchParams(window.location.search).get('role');
    const requestedStaffProfile = STAFF_PROFILES[staffRoleKey];
    if (currentPage === 'staff_login.html' && !requestedStaffProfile) {
        window.location.href = 'staff.html';
        return;
    }
    if (staffLoginForm && requestedStaffProfile) {
        document.getElementById('staffRoleKey').value = staffRoleKey;
        document.getElementById('staffLoginTitle').textContent = `Connexion — ${requestedStaffProfile.label}`;
        document.getElementById('staffLoginDescription').textContent = `Saisissez les identifiants remis pour le profil ${requestedStaffProfile.label}.`;
        document.getElementById('staffUsernameLabel').textContent = requestedStaffProfile.usernameLabel;
        document.getElementById('staffUsername').placeholder = requestedStaffProfile.usernameLabel;
        staffLoginForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const username = document.getElementById('staffUsername').value.trim();
            const password = document.getElementById('staffPassword').value;
            const message = document.getElementById('staffLoginMessage');
            let users = [];
            try { users = JSON.parse(localStorage.getItem('islaUsers') || '[]'); } catch (error) { users = []; }
            const candidate = users.find((user) => user.username === username || user.email === username);
            const passwordMatches = candidate?.passwordHash && candidate?.passwordSalt
                ? await hashPassword(password, candidate.passwordSalt) === candidate.passwordHash
                : candidate?.password === password;
            if (!candidate || !passwordMatches || candidate.role !== requestedStaffProfile.role) {
                message.textContent = 'Identifiant, mot de passe ou profil incorrect.';
                message.className = 'form-message error';
                return;
            }
            if (candidate.accountActive === false) {
                message.textContent = 'Ce compte est désactivé. Contactez l’administration.';
                message.className = 'form-message error';
                return;
            }
            localStorage.setItem('islaLoggedIn', 'true');
            localStorage.setItem('islaUser', candidate.username);
            localStorage.setItem('islaCurrentUser', JSON.stringify(candidate));
            message.textContent = 'Connexion réussie…';
            message.className = 'form-message success';
            setTimeout(() => { window.location.href = requestedStaffProfile.destination; }, 350);
        });
    }

    const adminUserForm = document.getElementById('adminUserForm');
    const adminUserList = document.getElementById('adminUserList');
    const adminStaffList = document.getElementById('adminStaffList');
    function getStoredUsers() {
        try { return JSON.parse(localStorage.getItem('islaUsers') || '[]'); } catch (error) { return []; }
    }
    function renderAdminUsers() {
        const users = getStoredUsers();
        if (adminUserList) {
            adminUserList.innerHTML = users.length
                ? users.map((user) => `<article class="admin-list__item"><div><strong>${escapeHTML(user.fullName || user.username)}</strong><span>${escapeHTML(user.username)} · ${escapeHTML(user.role || 'Étudiant')} · ${user.accountActive === false ? 'inactif' : 'actif'}</span></div><div class="management-actions"><button type="button" class="btn btn-secondary admin-toggle-user" data-username="${escapeHTML(user.username)}">${user.accountActive === false ? 'Activer' : 'Désactiver'}</button><button type="button" class="btn btn-secondary admin-reset-user" data-username="${escapeHTML(user.username)}">Réinitialiser MDP</button><button type="button" class="btn btn-secondary admin-delete-user" data-username="${escapeHTML(user.username)}">Supprimer</button></div></article>`).join('')
                : '<p>Aucun compte enregistré.</p>';
        }
        if (adminStaffList) {
            const staff = users.filter((user) => STAFF_ROLES.includes(user.role));
            adminStaffList.innerHTML = staff.length
                ? `<div class="admin-list">${staff.map((user) => `<article class="admin-list__item"><div><strong>${escapeHTML(user.fullName || user.username)}</strong><span>${escapeHTML(user.role)} · ${escapeHTML(user.username)}</span></div></article>`).join('')}</div>`
                : '<p class="form-help">Aucun compte Staff n’est encore créé.</p>';
        }
        document.querySelectorAll('.admin-delete-user').forEach((button) => {
            button.addEventListener('click', () => {
                const remainingUsers = getStoredUsers().filter((user) => user.username !== button.dataset.username);
                localStorage.setItem('islaUsers', JSON.stringify(remainingUsers));
                renderAdminUsers();
            });
        });
        document.querySelectorAll('.admin-toggle-user').forEach((button) => button.addEventListener('click', () => {
            const users = getStoredUsers(); const user = users.find((entry) => entry.username === button.dataset.username); if (!user) return; user.accountActive = user.accountActive === false; localStorage.setItem('islaUsers', JSON.stringify(users)); renderAdminUsers();
        }));
        document.querySelectorAll('.admin-reset-user').forEach((button) => button.addEventListener('click', async () => {
            const password = window.prompt('Nouveau mot de passe initial (10 caractères minimum) :'); if (!password || password.length < 10) return; const users = getStoredUsers(); const user = users.find((entry) => entry.username === button.dataset.username); if (!user) return; user.passwordSalt = createPasswordSalt(); user.passwordHash = await hashPassword(password, user.passwordSalt); user.passwordResetRequired = true; delete user.password; localStorage.setItem('islaUsers', JSON.stringify(users)); window.alert('Mot de passe réinitialisé.');
        }));
    }
    if (adminUserForm) {
        renderAdminUsers();
        adminUserForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const username = document.getElementById('adminUsername').value.trim();
            const email = document.getElementById('adminEmail').value.trim();
            const password = document.getElementById('adminPassword').value;
            const message = document.getElementById('adminUserMessage');
            const users = getStoredUsers();
            if (password.length < 10 || users.some((user) => user.username === username || user.email === email)) {
                message.textContent = password.length < 10 ? 'Le mot de passe doit contenir au moins 10 caractères.' : 'Cet identifiant ou cet email existe déjà.';
                message.className = 'form-message error';
                return;
            }
            const passwordSalt = createPasswordSalt();
            users.push({
                username,
                email,
                fullName: document.getElementById('adminFullName').value.trim(),
                role: document.getElementById('adminRole').value,
                passwordSalt,
                passwordHash: await hashPassword(password, passwordSalt)
            });
            localStorage.setItem('islaUsers', JSON.stringify(users));
            adminUserForm.reset();
            message.textContent = 'Compte créé avec succès.';
            message.className = 'form-message success';
            renderAdminUsers();
        });
    }
    if (adminStaffList) renderAdminUsers();

    const studentForm = document.getElementById('studentForm');
    const studentList = document.getElementById('studentList');
    const studentSearch = document.getElementById('studentSearch');
    function getStudents() { try { return JSON.parse(localStorage.getItem('islaStudents') || '[]'); } catch (error) { return []; } }
    function setStudents(students) { localStorage.setItem('islaStudents', JSON.stringify(students)); }
    function renderStudents(query = '') {
        if (!studentList) return;
        const normalizedQuery = query.trim().toLowerCase();
        const students = getStudents().filter((student) => `${student.lastName} ${student.firstName} ${student.matricule}`.toLowerCase().includes(normalizedQuery));
        studentList.innerHTML = students.length ? students.map((student) => `<article class="management-list__item"><div><strong>${escapeHTML(student.firstName)} ${escapeHTML(student.lastName)}</strong><span>${escapeHTML(student.matricule)} · ${escapeHTML(student.program)} · Compte ${student.accountActive ? 'actif' : 'inactif'}</span></div><div class="management-actions"><button type="button" class="btn btn-secondary student-view" data-id="${student.id}">Voir</button><button type="button" class="btn btn-secondary student-edit" data-id="${student.id}">Modifier</button><button type="button" class="btn btn-secondary student-toggle" data-id="${student.id}">${student.accountActive ? 'Désactiver' : 'Activer'}</button><button type="button" class="btn btn-secondary student-reset" data-id="${student.id}">Réinitialiser MDP</button></div></article>`).join('') : '<p>Aucun étudiant ne correspond à la recherche.</p>';
        document.querySelectorAll('.student-view').forEach((button) => button.addEventListener('click', () => {
            const student = getStudents().find((entry) => entry.id === button.dataset.id);
            if (student) window.alert(`${student.firstName} ${student.lastName}\nMatricule : ${student.matricule}\nEmail : ${student.email}\nTéléphone : ${student.phone}\nClasse : ${student.className}\nAnnée : ${student.academicYear}`);
        }));
        document.querySelectorAll('.student-toggle').forEach((button) => button.addEventListener('click', () => {
            const students = getStudents(); const student = students.find((entry) => entry.id === button.dataset.id); if (!student) return;
            student.accountActive = !student.accountActive; setStudents(students);
            const users = getStoredUsers(); const user = users.find((entry) => entry.username === student.username); if (user) { user.accountActive = student.accountActive; localStorage.setItem('islaUsers', JSON.stringify(users)); }
            renderStudents(studentSearch?.value);
        }));
        document.querySelectorAll('.student-reset').forEach((button) => button.addEventListener('click', async () => {
            const password = window.prompt('Nouveau mot de passe initial (10 caractères minimum) :'); if (!password || password.length < 10) return;
            const student = getStudents().find((entry) => entry.id === button.dataset.id); const users = getStoredUsers(); const user = users.find((entry) => entry.username === student?.username); if (!user) return;
            user.passwordSalt = createPasswordSalt(); user.passwordHash = await hashPassword(password, user.passwordSalt); user.passwordResetRequired = true; delete user.password; localStorage.setItem('islaUsers', JSON.stringify(users)); window.alert('Mot de passe réinitialisé.');
        }));
        document.querySelectorAll('.student-edit').forEach((button) => button.addEventListener('click', () => openStudentForm(getStudents().find((entry) => entry.id === button.dataset.id))));
    }
    function openStudentForm(student = null) {
        if (!studentForm) return; studentForm.hidden = false; document.getElementById('studentFormTitle').textContent = student ? 'Modifier un étudiant' : 'Ajouter un étudiant'; studentForm.reset();
        document.getElementById('studentRecordId').value = student?.id || '';
        const fields = { studentLastName: 'lastName', studentFirstName: 'firstName', studentGender: 'gender', studentNationality: 'nationality', studentEmail: 'email', studentPhone: 'phone', studentCountry: 'country', studentCity: 'city', studentDistrict: 'district', studentAddress: 'address', studentMatricule: 'matricule', studentProgram: 'program', studentLevel: 'level', studentClass: 'className', studentAcademicYear: 'academicYear', studentStatus: 'status', studentUsername: 'username' };
        Object.entries(fields).forEach(([id, key]) => { document.getElementById(id).value = student?.[key] || ''; });
        if (student?.birthDate) { const [year, month, day] = student.birthDate.split('-'); document.getElementById('studentBirthDay').value = day; document.getElementById('studentBirthMonth').value = String(Number(month)); document.getElementById('studentBirthYear').value = year; }
        document.getElementById('studentAccountActive').value = String(student?.accountActive ?? true); document.getElementById('studentUsername').readOnly = Boolean(student); document.getElementById('studentPassword').required = !student;
        studentForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    if (studentForm) {
        const defaults = { countries: ['Togo', 'Bénin', 'Burkina Faso', 'Côte d’Ivoire', 'France', 'Ghana', 'Mali', 'Niger', 'Nigeria', 'Sénégal'], cities: ['Lomé', 'Kara', 'Sokodé', 'Atakpamé', 'Kpalimé', 'Tsévié'], districts: ['Adidogomé', 'Agbalépédogan', 'Bè', 'Hédzranawoé', 'Tokoin', 'Agoè-Nyivé', 'Nyékonakpoè', 'Gbossimé', 'Kégué'], programs: ['Informatique'], levels: ['Licence 1', 'Licence 2', 'Licence 3', 'Master 1', 'Master 2'], classes: ['L1 A', 'L1 B', 'L2 A', 'L2 B', 'L3 A'], academicYears: ['2025–2026', '2026–2027', '2027–2028'] };
        let lists; try { lists = JSON.parse(localStorage.getItem('islaStudentLists') || 'null') || defaults; } catch (error) { lists = defaults; }
        function saveLists() { localStorage.setItem('islaStudentLists', JSON.stringify(lists)); }
        function renderDynamicSelect(select) { const values = lists[select.dataset.list] || []; select.innerHTML = `<option value="">Sélectionner</option>${values.map((value) => `<option value="${escapeHTML(value)}">${escapeHTML(value)}</option>`).join('')}<option value="__new__">Autre / Ajouter une valeur…</option>`; }
        document.querySelectorAll('.dynamic-select').forEach((select) => { renderDynamicSelect(select); select.addEventListener('change', () => { if (select.value !== '__new__') return; const value = window.prompt('Nouvelle valeur :')?.trim(); if (!value) { select.value = ''; return; } if (!lists[select.dataset.list].includes(value)) { lists[select.dataset.list].push(value); saveLists(); } renderDynamicSelect(select); select.value = value; }); });
        const day = document.getElementById('studentBirthDay'); const month = document.getElementById('studentBirthMonth'); const year = document.getElementById('studentBirthYear'); day.innerHTML = '<option value="">Jour</option>' + Array.from({ length: 31 }, (_, i) => `<option value="${String(i + 1).padStart(2, '0')}">${i + 1}</option>`).join(''); month.innerHTML = '<option value="">Mois</option>' + ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'].map((label, index) => `<option value="${index + 1}">${label}</option>`).join(''); year.innerHTML = '<option value="">Année</option>' + Array.from({ length: 90 }, (_, i) => `<option value="${new Date().getFullYear() - 15 - i}">${new Date().getFullYear() - 15 - i}</option>`).join('');
        document.getElementById('showStudentForm').addEventListener('click', () => openStudentForm()); document.getElementById('closeStudentForm').addEventListener('click', () => { studentForm.hidden = true; }); studentSearch.addEventListener('input', () => renderStudents(studentSearch.value)); renderStudents();
        document.getElementById('generateMatricule').addEventListener('click', () => { document.getElementById('studentMatricule').value = `ISLA${new Date().getFullYear()}${String(getStudents().length + 1).padStart(4, '0')}`; });
        studentForm.addEventListener('submit', async (event) => {
            event.preventDefault(); const id = document.getElementById('studentRecordId').value; const students = getStudents(); const username = document.getElementById('studentUsername').value.trim(); const matricule = document.getElementById('studentMatricule').value.trim(); const message = document.getElementById('studentFormMessage');
            if (students.some((student) => student.id !== id && (student.username === username || student.matricule === matricule))) { message.textContent = 'Cet identifiant ou ce matricule existe déjà.'; message.className = 'form-message error'; return; }
            const selectedDate = new Date(Number(year.value), Number(month.value) - 1, Number(day.value)); if (!year.value || !month.value || !day.value || selectedDate.getFullYear() !== Number(year.value) || selectedDate.getMonth() !== Number(month.value) - 1 || selectedDate.getDate() !== Number(day.value)) { message.textContent = 'La date de naissance est invalide.'; message.className = 'form-message error'; return; }
            const phoneNumber = document.getElementById('studentPhone').value.replace(/[\s.-]/g, ''); if (!/^\d{6,15}$/.test(phoneNumber)) { message.textContent = 'Le numéro de téléphone est invalide.'; message.className = 'form-message error'; return; }
                const fieldMap = { lastName: 'studentLastName', firstName: 'studentFirstName', gender: 'studentGender', nationality: 'studentNationality', email: 'studentEmail', phone: 'studentPhone', country: 'studentCountry', city: 'studentCity', district: 'studentDistrict', address: 'studentAddress', matricule: 'studentMatricule', program: 'studentProgram', level: 'studentLevel', className: 'studentClass', academicYear: 'studentAcademicYear', status: 'studentStatus' };
                const record = { id: id || crypto.randomUUID(), username, accountActive: document.getElementById('studentAccountActive').value === 'true', birthDate: `${year.value}-${String(month.value).padStart(2, '0')}-${day.value}` };
                Object.entries(fieldMap).forEach(([key, field]) => { record[key] = document.getElementById(field).value.trim(); });
            record.phone = `${document.getElementById('studentPhonePrefix').value === 'other' ? '' : document.getElementById('studentPhonePrefix').value} ${phoneNumber}`.trim();
            const users = getStoredUsers(); let user = users.find((entry) => entry.username === username); const password = document.getElementById('studentPassword').value; if (!user && password.length < 10) { message.textContent = 'Le mot de passe initial doit contenir au moins 10 caractères.'; message.className = 'form-message error'; return; } if (!user) { const passwordSalt = createPasswordSalt(); user = { username, email: record.email, fullName: `${record.firstName} ${record.lastName}`, role: 'Étudiant', accountActive: record.accountActive, passwordSalt, passwordHash: await hashPassword(password, passwordSalt), passwordResetRequired: true }; users.push(user); } else { Object.assign(user, { email: record.email, fullName: `${record.firstName} ${record.lastName}`, role: 'Étudiant', accountActive: record.accountActive }); }
            const index = students.findIndex((student) => student.id === record.id); if (index >= 0) students[index] = record; else students.push(record); setStudents(students); localStorage.setItem('islaUsers', JSON.stringify(users)); studentForm.hidden = true; renderStudents(studentSearch.value); window.alert(index >= 0 ? 'Étudiant modifié avec succès.' : 'Étudiant enregistré avec succès. Le compte étudiant a été créé.');
        });
    }

    const changePasswordForm = document.getElementById('changePasswordForm');
    if (changePasswordForm) changePasswordForm.addEventListener('submit', async (event) => { event.preventDefault(); const password = document.getElementById('newPassword').value; const confirmation = document.getElementById('confirmPassword').value; const message = document.getElementById('changePasswordMessage'); if (password.length < 10 || password !== confirmation) { message.textContent = 'Les mots de passe doivent correspondre et contenir au moins 10 caractères.'; message.className = 'form-message error'; return; } const currentUser = JSON.parse(localStorage.getItem('islaCurrentUser') || 'null'); const users = getStoredUsers(); const user = users.find((entry) => entry.username === currentUser?.username); if (!user) { window.location.href = 'login.html'; return; } user.passwordSalt = createPasswordSalt(); user.passwordHash = await hashPassword(password, user.passwordSalt); user.passwordResetRequired = false; localStorage.setItem('islaUsers', JSON.stringify(users)); localStorage.setItem('islaCurrentUser', JSON.stringify(user)); window.location.href = 'dashboard.html'; });

    // Registration handling
    const registerForm = document.getElementById('registerForm');
    const registerMessage = document.getElementById('registerMessage');
    if (registerForm && registerMessage) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const fullName = document.getElementById('fullName').value.trim();
            const email = document.getElementById('email').value.trim();
            const username = document.getElementById('usernameReg').value.trim();
            const password = document.getElementById('passwordReg').value;
            const role = 'Étudiant';

            if (!username || !password) {
                registerMessage.textContent = 'Veuillez renseigner un identifiant et un mot de passe.';
                registerMessage.className = 'form-message error';
                return;
            }

            if (password.length < 10) {
                registerMessage.textContent = 'Le mot de passe doit contenir au moins 10 caractères.';
                registerMessage.className = 'form-message error';
                return;
            }

            const usersJson = localStorage.getItem('islaUsers');
            let users = [];
            try { users = usersJson ? JSON.parse(usersJson) : []; } catch(e) { users = []; }

            if (users.find(u => u.username === username || u.email === email)) {
                registerMessage.textContent = 'Un compte avec cet identifiant ou email existe déjà.';
                registerMessage.className = 'form-message error';
                return;
            }

            const passwordSalt = createPasswordSalt();
            const passwordHash = await hashPassword(password, passwordSalt);
            const newUser = { username, passwordHash, passwordSalt, email, fullName, role };
            users.push(newUser);
            localStorage.setItem('islaUsers', JSON.stringify(users));

            registerForm.reset();
            registerMessage.className = 'form-message success';
            registerMessage.innerHTML = `
                <p>Inscription réussie.</p>
                <a href="login.html" class="btn btn-primary">Se connecter</a>
            `;
        });
    }

    if (logoutButton) {
        logoutButton.addEventListener("click", () => {
            localStorage.removeItem("islaLoggedIn");
            localStorage.removeItem("islaUser");
            localStorage.removeItem("islaCurrentUser");
            window.location.href = "login.html";
        });
    }
});
