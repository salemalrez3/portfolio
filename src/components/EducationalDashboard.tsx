import type { JSX } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./EducationDashboard.css";

/* ---------- icons (inline SVG, no dependency) ---------- */
const Icon = ({ name, size = 18 }: { name: string; size?: number }) => {
  const paths: Record<string, JSX.Element> = {
    bell: (
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" />
    ),
    book: (
      <>
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </>
    ),
    check: <polyline points="20 6 9 17 4 12" />,
    award: (
      <>
        <circle cx="12" cy="8" r="6" />
        <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
      </>
    ),
    star: (
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    ),
    building: (
      <>
        <rect x="4" y="2" width="16" height="20" rx="2" />
        <path d="M9 22v-4h6v4" />
        <path d="M9 6h.01M15 6h.01M9 10h.01M15 10h.01M9 14h.01M15 14h.01" />
      </>
    ),
    pin: (
      <>
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </>
    ),
    calendar: (
      <>
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </>
    ),
    arrow: (
      <>
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
      </>
    ),
    play: <polygon points="6 4 20 12 6 20 6 4" />,
    menu: (
      <>
        <line x1="3" y1="6" x2="21" y2="6" />
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="18" x2="21" y2="18" />
      </>
    ),
    close: (
      <>
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </>
    ),
    external: (
      <>
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
        <polyline points="15 3 21 3 21 9" />
        <line x1="10" y1="14" x2="21" y2="3" />
      </>
    ),
    mail: (
      <>
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 6-10 7L2 6" />
      </>
    ),
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {paths[name]}
    </svg>
  );
};

/* ---------- types ---------- */
type TabId = "dashboard" | "courses" | "achievements" | "records";

type Course = {
  title: string;
  description: string;
  progress: number;
  lessons: string;
  tone: "progress" | "complete";
  topics: string[];
};

type Achievement = {
  title: string;
  org: string;
  date: string;
  earned: boolean;
  detail: string[];
  link?: string;
};

type ModalState =
  | { kind: "course"; course: Course }
  | { kind: "achievement"; achievement: Achievement }
  | { kind: "profile" }
  | null;

/* ---------- data ---------- */
const PROFILE = {
  name: "MHD Salem Alrez",
  initials: "MS",
  photo: "/portfolio/CVFINALE.jpeg",
  role: "ICT Engineering Student · Full-Stack Developer",
  status: "Active Student · Graduating July 2027",
  description:
    "ICT Engineering student (graduating July 2027) with 3+ years of professional full-stack software engineering experience. Published researcher in adaptive transit systems. Part of the Syrian Hackathon winner team with a strong commitment to leveraging technology for humanitarian and civic impact.",
  field: "Information & Communication Engineering",
  university: "Arab International University",
  location: "Damascus, Syria",
  joined: "September 2022",
  email: "salemalrez3@gmail.com",
  phone: "+963 967 591 716",
  researchgate:
    "https://www.researchgate.net/publication/404409988_Adaptive_Public_Transit_Navigation_System",
};

const STATS = [
  { value: "8", label: "Courses", hint: "in coursework", icon: "book" },
  { value: "3", label: "Certifications", hint: "earned", icon: "award" },
  { value: "3.29", label: "Current GPA", hint: "of 4.0", icon: "star" },
  {
    value: "3+",
    label: "Years Experience",
    hint: "full-stack",
    icon: "building",
  },
];

const COURSES: Course[] = [
  {
    title: "Algorithms & Data Structures",
    description: "Sorting, graphs, dynamic programming, complexity analysis.",
    progress: 82,
    lessons: "32 / 40",
    tone: "progress",
    topics: [
      "Complexity analysis",
      "Sorting",
      "Graph theory",
      "Dynamic programming",
    ],
  },
  {
    title: "Web Technologies",
    description: "HTTP, REST, auth, browser internals, modern frameworks.",
    progress: 100,
    lessons: "24 / 24",
    tone: "complete",
    topics: [
      "HTTP & REST",
      "Authentication & sessions",
      "Browser internals",
      "Modern frameworks",
    ],
  },
  {
    title: "Databases & DBMS",
    description: "Relational modeling, indexing, query planning, transactions.",
    progress: 91,
    lessons: "28 / 31",
    tone: "progress",
    topics: [
      "Relational modeling",
      "Indexing",
      "Query planning",
      "Transactions",
    ],
  },
  {
    title: "Software Engineering",
    description: "Requirements, architecture, testing, agile delivery.",
    progress: 74,
    lessons: "20 / 27",
    tone: "progress",
    topics: [
      "Requirements engineering",
      "Architecture",
      "Testing",
      "Agile delivery",
    ],
  },
  {
    title: "Machine Learning",
    description: "Supervised learning, model evaluation, feature engineering.",
    progress: 58,
    lessons: "14 / 24",
    tone: "progress",
    topics: ["Supervised learning", "Model evaluation", "Feature engineering"],
  },
  {
    title: "System Analysis & Design",
    description: "UML, requirements engineering, architectural patterns.",
    progress: 68,
    lessons: "17 / 25",
    tone: "progress",
    topics: ["UML", "Requirements engineering", "Architectural patterns"],
  },
];

const ACHIEVEMENTS: Achievement[] = [
  {
    title: "Node.js & Express",
    org: "IBM on Coursera",
    date: "April 2026",
    earned: true,
    detail: [
      "Built server-side applications using Node.js and the Express framework.",
      "Developed asynchronous callback functions and promises to manage operations.",
      "Created REST APIs, performed CRUD operations, and implemented user authentication and session management.",
    ],
  },
  {
    title: "System Design Fundamentals",
    org: "Pearson on Coursera",
    date: "April 2026",
    earned: true,
    detail: [
      "Completed training on volatility-based system decomposition.",
      "Learned a structured methodology from Juval Löwy to move beyond common pitfalls like functional decomposition.",
      "Gained practical techniques for creating robust, adaptable, and future-proof system architectures.",
    ],
  },
  {
    title: "OOP in C++",
    org: "University of London",
    date: "August 2023",
    earned: true,
    detail: [
      "Developed a cryptocurrency trading platform simulation.",
      "Focused on C++ fundamentals and object-oriented programming principles.",
    ],
  },
  {
    title: "Adaptive Public Transit Navigation System",
    org: "ResearchGate Publication",
    date: "May 2026",
    earned: true,
    link: "https://www.researchgate.net/publication/404409988_Adaptive_Public_Transit_Navigation_System",
    detail: [
      "Designed a routing system for informal bus networks where routes do not rely on fixed stops.",
      "Architected transfer logic using a sparse multigraph and state-based A* search.",
      "Built the full stack: Fastify services, PostGIS geospatial storage, Python graph construction, and an offline-capable mobile client.",
    ],
  },
  {
    title: "Syrian Hackathon Winner",
    org: "Meddit Team",
    date: "2025",
    earned: true,
    detail: [
      "Backend developer for the Meddit platform — one of the winning projects of the Syrian Hackathon 2025.",
      "Built and maintained APIs using FastAPI.",
      "Developed a WebSocket-based chat feature for real-time patient–doctor communication.",
    ],
  },
];

const NOTIFICATIONS = [
  {
    id: "n1",
    icon: "award",
    title: "Certificate issued",
    body: "IBM on Coursera — Node.js & Express",
    date: "April 2026",
    target: "Node.js & Express",
  },
  {
    id: "n2",
    icon: "book",
    title: "Publication live",
    body: "Adaptive Public Transit Navigation System",
    date: "May 2026",
    target: "Adaptive Public Transit Navigation System",
  },
  {
    id: "n3",
    icon: "star",
    title: "Competition result",
    body: "Syrian Hackathon — Meddit Team won",
    date: "2025",
    target: "Syrian Hackathon Winner",
  },
];

const TABS: Array<{ id: TabId; label: string }> = [
  { id: "dashboard", label: "Dashboard" },
  { id: "records", label: "Records" },
  { id: "courses", label: "Courses" },
  { id: "achievements", label: "Achievements" },
];

/* ---------- Ellipsis with hover tooltip ---------- */
function Ellipsis({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [overflowing, setOverflowing] = useState(false);
  const [hover, setHover] = useState(false);

  // Measure whether the text is actually clipped, and re-measure on resize.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => setOverflowing(el.scrollWidth > el.clientWidth + 1);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [text]);

  return (
    <span
      className={`lms-ellipsis ${className}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <span ref={ref} className="lms-ellipsis-text">
        {text}
      </span>
      {hover && overflowing && (
        <span className="lms-ellipsis-tip" role="tooltip">
          {text}
        </span>
      )}
    </span>
  );
}

/* ---------- sub-components ---------- */
function StatCard({
  value,
  label,
  hint,
  icon,
}: {
  value: string;
  label: string;
  hint: string;
  icon: string;
}) {
  return (
    <div className="lms-stat">
      <span className="lms-stat-icon">
        <Icon name={icon} size={20} />
      </span>
      <div className="lms-stat-body">
        <span className="lms-stat-value">{value}</span>
        <span className="lms-stat-label">{label}</span>
        <span className="lms-stat-hint">{hint}</span>
      </div>
    </div>
  );
}

function CourseCard({
  course,
  onOpen,
}: {
  course: Course;
  onOpen: () => void;
}) {
  const isComplete = course.tone === "complete";
  return (
    <article className={`lms-course ${isComplete ? "is-complete" : ""}`}>
      <div className="lms-course-media">
        <div className="lms-course-media-shape" />
        <span className="lms-course-badge">
          {isComplete ? "Completed" : "In Progress"}
        </span>
      </div>
      <div className="lms-course-body">
        <h3>{course.title}</h3>
        <p>{course.description}</p>
        <div className="lms-course-meta">
          <span className="lms-course-lessons">{course.lessons} lessons</span>
          <span className="lms-course-pct">{course.progress}%</span>
        </div>
        <div className="lms-course-track">
          <span
            className="lms-course-fill"
            style={{ width: `${course.progress}%` }}
          />
        </div>
        <button className="lms-course-btn" onClick={onOpen}>
          {isComplete ? "Review" : "Continue"}
          <Icon name="arrow" size={14} />
        </button>
      </div>
    </article>
  );
}

function AchievementCard({
  item,
  onOpen,
}: {
  item: Achievement;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      className={`lms-achievement ${item.earned ? "is-earned" : ""}`}
      onClick={onOpen}
    >
      <span className="lms-achievement-icon">
        <Icon name="award" size={20} />
      </span>
      <span className="lms-achievement-body">
        <Ellipsis className="lms-ach-title" text={item.title} />
        <Ellipsis className="lms-ach-org" text={item.org} />
      </span>
      <span className="lms-achievement-date">{item.date}</span>
    </button>
  );
}

/* ---------- main ---------- */
export default function EducationDashboard({
  onClose,
}: {
  onClose?: () => void;
}) {
  const [activeTab, setActiveTab] = useState<TabId>("dashboard");
  const [notifOpen, setNotifOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [modal, setModal] = useState<ModalState>(null);
  const [toast, setToast] = useState<string | null>(null);

  const navRightRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const coursesRef = useRef<HTMLElement>(null);
  const achievementsRef = useRef<HTMLElement>(null);
  const recordsRef = useRef<HTMLElement>(null);
  const toastTimer = useRef<number | null>(null);

  /* --- toast helper --- */
  const showToast = (message: string) => {
    setToast(message);
    if (toastTimer.current) window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), 2600);
  };
  useEffect(
    () => () => {
      if (toastTimer.current) window.clearTimeout(toastTimer.current);
    },
    [],
  );

  /* --- close dropdowns when clicking elsewhere --- */
  useEffect(() => {
    if (!notifOpen && !userMenuOpen) return;
    const onDown = (e: MouseEvent) => {
      if (
        navRightRef.current &&
        !navRightRef.current.contains(e.target as Node)
      ) {
        setNotifOpen(false);
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [notifOpen, userMenuOpen]);

  /* --- escape closes the topmost layer --- */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (modal) {
        setModal(null);
        return;
      }
      if (notifOpen) {
        setNotifOpen(false);
        return;
      }
      if (userMenuOpen) {
        setUserMenuOpen(false);
        return;
      }
      if (mobileNavOpen) {
        setMobileNavOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modal, notifOpen, userMenuOpen, mobileNavOpen]);

  /* --- tab navigation --- */
  const goToTab = (id: TabId) => {
    setActiveTab(id);
    setMobileNavOpen(false);
    const refs: Record<TabId, React.RefObject<HTMLElement | null>> = {
      dashboard: heroRef,
      courses: coursesRef,
      achievements: achievementsRef,
      records: recordsRef,
    };
    refs[id].current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const openAchievementByTitle = (title: string) => {
    const found = ACHIEVEMENTS.find((a) => a.title === title);
    setNotifOpen(false);
    if (found) setModal({ kind: "achievement", achievement: found });
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      showToast("Profile link copied to clipboard");
    } catch {
      showToast("Clipboard unavailable in this browser");
    }
  };

  return (
    <div className="lms">
      {/* ---------- nav ---------- */}
      <nav className="lms-nav">
        <div className="lms-brand">
          <div className="lms-brand-mark">S</div>
          <span className="lms-brand-name">Salem Academy</span>
        </div>

        <div className="lms-nav-links">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              className={activeTab === t.id ? "is-active" : ""}
              onClick={() => goToTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="lms-nav-right" ref={navRightRef}>
          {/* notifications */}
          <div className="lms-nav-item">
            <button
              className="lms-icon-btn"
              aria-label="Notifications"
              aria-haspopup="true"
              aria-expanded={notifOpen}
              onClick={() => {
                setNotifOpen((v) => !v);
                setUserMenuOpen(false);
              }}
            >
              <Icon name="bell" size={18} />
              <span className="lms-icon-dot" />
            </button>

            <AnimatePresence>
              {notifOpen && (
                <motion.div
                  className="lms-dropdown lms-dropdown-notif"
                  initial={{ opacity: 0, y: -6, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.98 }}
                  transition={{ duration: 0.16 }}
                >
                  <div className="lms-dropdown-head">
                    <strong>Notifications</strong>
                    <span>{NOTIFICATIONS.length} new</span>
                  </div>
                  {NOTIFICATIONS.map((n) => (
                    <button
                      key={n.id}
                      className="lms-notif"
                      onClick={() => openAchievementByTitle(n.target)}
                    >
                      <span className="lms-notif-icon">
                        <Icon name={n.icon} size={16} />
                      </span>
                      <span className="lms-notif-body">
                        <strong>{n.title}</strong>
                        <span>{n.body}</span>
                      </span>
                      <span className="lms-notif-date">{n.date}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* avatar menu */}
          <div className="lms-nav-item">
            <button
              className="lms-avatar"
              aria-label="Account menu"
              aria-haspopup="true"
              aria-expanded={userMenuOpen}
              onClick={() => {
                setUserMenuOpen((v) => !v);
                setNotifOpen(false);
              }}
            >
              <img src={PROFILE.photo} alt={PROFILE.name} />
            </button>

            <AnimatePresence>
              {userMenuOpen && (
                <motion.div
                  className="lms-dropdown lms-dropdown-user"
                  initial={{ opacity: 0, y: -6, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.98 }}
                  transition={{ duration: 0.16 }}
                >
                  <div className="lms-dropdown-head">
                    <strong>{PROFILE.name}</strong>
                    <span>{PROFILE.email}</span>
                  </div>
                  <button
                    className="lms-menu-item"
                    onClick={() => {
                      setUserMenuOpen(false);
                      goToTab("dashboard");
                    }}
                  >
                    View Profile
                  </button>
                  <button
                    className="lms-menu-item"
                    onClick={() => {
                      setUserMenuOpen(false);
                      goToTab("records");
                    }}
                  >
                    Academic Record
                  </button>
                  <button
                    className="lms-menu-item"
                    onClick={() => {
                      setUserMenuOpen(false);
                      setModal({ kind: "profile" });
                    }}
                  >
                    Edit Profile
                  </button>
                  {onClose && (
                    <>
                      <span className="lms-menu-divider" />
                      <button
                        className="lms-menu-item is-danger"
                        onClick={() => {
                          setUserMenuOpen(false);
                          onClose();
                        }}
                      >
                        Close Folder
                      </button>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            className="lms-menu-btn"
            aria-label="Menu"
            aria-expanded={mobileNavOpen}
            onClick={() => setMobileNavOpen((v) => !v)}
          >
            <Icon name={mobileNavOpen ? "close" : "menu"} size={20} />
          </button>
        </div>

        {/* mobile tab drawer */}
        <AnimatePresence>
          {mobileNavOpen && (
            <motion.div
              className="lms-mobile-nav"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.22 }}
            >
              {TABS.map((t) => (
                <button
                  key={t.id}
                  className={activeTab === t.id ? "is-active" : ""}
                  onClick={() => goToTab(t.id)}
                >
                  {t.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* toast lives in the sticky nav, so it's always on screen */}
        <AnimatePresence>
          {toast && (
            <motion.div
              className="lms-toast"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 14 }}
              transition={{ duration: 0.2 }}
            >
              {toast}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ---------- hero ---------- */}
      <section className="lms-hero" ref={heroRef}>
        <div className="lms-hero-inner">
          <div className="lms-hero-photo">
            <div className="lms-hero-photo-inner">
              <img src={PROFILE.photo} alt={PROFILE.name} />
            </div>
          </div>
          <div className="lms-hero-text">
            <span className="lms-hero-status">
              <span className="lms-hero-dot" />
              {PROFILE.status}
            </span>
            <h1>{PROFILE.name}</h1>
            <p className="lms-hero-role">{PROFILE.role}</p>
            <p className="lms-hero-desc">{PROFILE.description}</p>
            <div className="lms-hero-actions">
              <button
                className="lms-btn-primary"
                onClick={() => setModal({ kind: "profile" })}
              >
                Edit Profile
              </button>
              <button className="lms-btn-ghost" onClick={handleShare}>
                Share Profile
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- metadata (Records) ---------- */}
      <section className="lms-meta" ref={recordsRef}>
        <div className="lms-meta-item">
          <span className="lms-meta-icon">
            <Icon name="book" size={16} />
          </span>
          <div>
            <span className="lms-meta-label">Field of Study</span>
            <Ellipsis className="lms-meta-value" text={PROFILE.field} />
          </div>
        </div>
        <div className="lms-meta-item">
          <span className="lms-meta-icon">
            <Icon name="building" size={16} />
          </span>
          <div>
            <span className="lms-meta-label">University</span>
            <Ellipsis className="lms-meta-value" text={PROFILE.university} />
          </div>
        </div>
        <div className="lms-meta-item">
          <span className="lms-meta-icon">
            <Icon name="pin" size={16} />
          </span>
          <div>
            <span className="lms-meta-label">Location</span>
            <Ellipsis className="lms-meta-value" text={PROFILE.location} />
          </div>
        </div>
        <div className="lms-meta-item">
          <span className="lms-meta-icon">
            <Icon name="calendar" size={16} />
          </span>
          <div>
            <span className="lms-meta-label">Joined</span>
            <Ellipsis className="lms-meta-value" text={PROFILE.joined} />
          </div>
        </div>
      </section>

      {/* ---------- stats ---------- */}
      <section className="lms-stats">
        {STATS.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </section>

      {/* ---------- courses ---------- */}
      <section className="lms-section" ref={coursesRef}>
        <header className="lms-section-head">
          <div>
            <h2>My Courses</h2>
            <p>Enrolled modules for the current academic term.</p>
          </div>
          <span className="lms-section-hint">
            {COURSES.length} enrolled · 1 completed
          </span>
        </header>
        <div className="lms-course-grid">
          {COURSES.map((c) => (
            <CourseCard
              key={c.title}
              course={c}
              onOpen={() => setModal({ kind: "course", course: c })}
            />
          ))}
        </div>
      </section>

      {/* ---------- achievements ---------- */}
      <section className="lms-section" ref={achievementsRef}>
        <header className="lms-section-head">
          <div>
            <h2>My Achievements</h2>
            <p>Certificates, publications, and competition records.</p>
          </div>
          <span className="lms-section-hint">{ACHIEVEMENTS.length} earned</span>
        </header>
        <div className="lms-achievement-grid">
          {ACHIEVEMENTS.map((a) => (
            <AchievementCard
              key={a.title}
              item={a}
              onOpen={() => setModal({ kind: "achievement", achievement: a })}
            />
          ))}
        </div>
      </section>

      {/* ---------- footer ---------- */}
      <footer className="lms-footer">
        <div className="lms-footer-brand">
          <div className="lms-brand-mark small">S</div>
          <div>
            <strong>Salem Academy</strong>
            <span>Learning profile · Updated May 2026</span>
          </div>
        </div>
        <div className="lms-footer-links">
          <button
            type="button"
            className="lms-footer-link"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(PROFILE.email);
                showToast("Email address copied");
              } catch {
                showToast(PROFILE.email);
              }
            }}
          >
            <Icon name="mail" size={14} />
            Email
          </button>

          <button
            type="button"
            className="lms-footer-link"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(PROFILE.phone);
                showToast("Phone number copied");
              } catch {
                showToast(PROFILE.phone);
              }
            }}
          >
            Phone · {PROFILE.phone}
          </button>

          <a
            className="lms-footer-link"
            href={PROFILE.researchgate}
            onClick={(e) => {
              e.preventDefault();
              window.open(
                PROFILE.researchgate,
                "_blank",
                "noopener,noreferrer",
              );
            }}
          >
            ResearchGate
            <Icon name="external" size={13} />
          </a>
        </div>
      </footer>

      {/* ---------- modal ---------- */}
      <AnimatePresence>
        {modal && (
          <motion.div
            className="lms-modal-scrim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={() => setModal(null)}
          >
            <motion.div
              className="lms-modal"
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.97 }}
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
            >
              <button
                className="lms-modal-close"
                aria-label="Close"
                onClick={() => setModal(null)}
              >
                <Icon name="close" size={18} />
              </button>

              {modal.kind === "course" && (
                <>
                  <div className="lms-modal-head">
                    <span className="lms-modal-kicker">
                      Course · {modal.course.lessons} lessons
                    </span>
                    <h3>{modal.course.title}</h3>
                  </div>
                  <div className="lms-modal-body">
                    <p>{modal.course.description}</p>
                    <div className="lms-modal-progress">
                      <div className="lms-course-track">
                        <span
                          className="lms-course-fill"
                          style={{ width: `${modal.course.progress}%` }}
                        />
                      </div>
                      <span className="lms-modal-pct">
                        {modal.course.progress}% complete
                      </span>
                    </div>
                    <ul className="lms-topic-list">
                      {modal.course.topics.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="lms-modal-foot">
                    <button
                      className="lms-btn-primary"
                      onClick={() => {
                        showToast(`Resuming ${modal.course.title}`);
                        setModal(null);
                      }}
                    >
                      {modal.course.tone === "complete" ? "Review" : "Continue"}
                      <Icon name="arrow" size={14} />
                    </button>
                    <button
                      className="lms-btn-ghost"
                      onClick={() => setModal(null)}
                    >
                      Close
                    </button>
                  </div>
                </>
              )}

              {modal.kind === "achievement" && (
                <>
                  <div className="lms-modal-head">
                    <span className="lms-modal-kicker">
                      {modal.achievement.org} · {modal.achievement.date}
                    </span>
                    <h3>{modal.achievement.title}</h3>
                  </div>
                  <div className="lms-modal-body">
                    <ul className="lms-detail-list">
                      {modal.achievement.detail.map((d) => (
                        <li key={d}>{d}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="lms-modal-foot">
                    {modal.achievement.link && (
                      <a
                        className="lms-btn-primary"
                        href={modal.achievement.link}
                        target="_blank"
                        rel="noreferrer"
                      >
                        View publication <Icon name="external" size={14} />
                      </a>
                    )}
                    <button
                      className="lms-btn-ghost"
                      onClick={() => setModal(null)}
                    >
                      Close
                    </button>
                  </div>
                </>
              )}

              {modal.kind === "profile" && (
                <>
                  <div className="lms-modal-head">
                    <span className="lms-modal-kicker">
                      Read-only · demo mode
                    </span>
                    <h3>Profile</h3>
                  </div>
                  <div className="lms-modal-body">
                    <dl className="lms-profile-list">
                      <div>
                        <dt>Name</dt>
                        <dd>{PROFILE.name}</dd>
                      </div>
                      <div>
                        <dt>Role</dt>
                        <dd>{PROFILE.role}</dd>
                      </div>
                      <div>
                        <dt>Field of Study</dt>
                        <dd>{PROFILE.field}</dd>
                      </div>
                      <div>
                        <dt>University</dt>
                        <dd>{PROFILE.university}</dd>
                      </div>
                      <div>
                        <dt>Location</dt>
                        <dd>{PROFILE.location}</dd>
                      </div>
                      <div>
                        <dt>Joined</dt>
                        <dd>{PROFILE.joined}</dd>
                      </div>
                      <div>
                        <dt>Email</dt>
                        <dd>{PROFILE.email}</dd>
                      </div>
                    </dl>
                  </div>
                  <div className="lms-modal-foot">
                    <button
                      className="lms-btn-ghost"
                      onClick={() => setModal(null)}
                    >
                      Close
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
