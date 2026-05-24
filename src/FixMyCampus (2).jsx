import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

// ─── DEMO USERS ───────────────────────────────────────────────────────────────
const DEMO_USERS = [
  { email: "student@campus.ac.uk", password: "student123", name: "Ali Hassan", role: "Student" },
  { email: "staff@campus.ac.uk",   password: "staff123",   name: "Dr. Sara Khan", role: "Staff" },
  { email: "admin@campus.ac.uk",   password: "admin123",   name: "Admin User",    role: "Admin" },
];

// ─── LOGIN / REGISTER PAGE ────────────────────────────────────────────────────
const AuthPage = ({ onLogin }) => {
  const [tab, setTab] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("Student");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const inp = (err) => ({
    width: "100%", padding: "10px 13px", borderRadius: 8, fontSize: 13,
    border: `0.5px solid ${err ? "#F09595" : "#D3D1C7"}`,
    outline: "none", background: "#fff", color: "#2C2C2A", marginTop: 0,
    boxSizing: "border-box",
  });

  const handleLogin = () => {
    setError("");
    if (!email || !password) { setError("Please fill in all fields."); return; }
    setLoading(true);
    setTimeout(() => {
      const user = DEMO_USERS.find(u => u.email === email && u.password === password);
      if (user) { onLogin(user); }
      else { setError("Invalid email or password."); }
      setLoading(false);
    }, 700);
  };

  const handleRegister = () => {
    setError("");
    if (!name || !email || !password) { setError("Please fill in all fields."); return; }
    if (!email.includes("@")) { setError("Enter a valid email address."); return; }
    if (password.length < 6) { setError("Password must be at least 6 characters."); return; }
    setLoading(true);
    setTimeout(() => {
      onLogin({ email, name, role, password });
      setLoading(false);
    }, 700);
  };

  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      background: "linear-gradient(135deg, #E6F1FB 0%, #F7F6F2 50%, #EAF3DE 100%)",
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif", padding: 20,
    }}>
      <div style={{ width: "100%", maxWidth: 420 }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{
            width: 52, height: 52, borderRadius: 14, background: "#185FA5",
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            fontSize: 24, marginBottom: 12, boxShadow: "0 4px 16px rgba(24,95,165,0.18)",
          }}>🔧</div>
          <div style={{ fontSize: 22, fontWeight: 700, color: "#0C447C" }}>FixMyCampus</div>
          <div style={{ fontSize: 13, color: "#5F5E5A", marginTop: 3 }}>Campus Maintenance Portal</div>
        </div>

        {/* Card */}
        <div style={{
          background: "#fff", borderRadius: 16, border: "0.5px solid #D3D1C7",
          padding: "28px 30px", boxShadow: "0 2px 24px rgba(0,0,0,0.06)",
        }}>
          {/* Tabs */}
          <div style={{ display: "flex", borderBottom: "0.5px solid #e5e3db", marginBottom: 24 }}>
            {["login", "register"].map(t => (
              <button key={t} onClick={() => { setTab(t); setError(""); }} style={{
                flex: 1, padding: "9px 0", fontSize: 13, fontWeight: tab === t ? 600 : 400,
                color: tab === t ? "#0C447C" : "#888780",
                background: "none", border: "none", cursor: "pointer",
                borderBottom: `2px solid ${tab === t ? "#185FA5" : "transparent"}`,
                marginBottom: -1, transition: "all 0.15s", textTransform: "capitalize",
              }}>{t === "login" ? "Sign in" : "Create account"}</button>
            ))}
          </div>

          {/* Error */}
          {error && (
            <div style={{ background: "#FCEBEB", border: "0.5px solid #F7C1C1", borderRadius: 8, padding: "9px 13px", marginBottom: 16, fontSize: 12, color: "#791F1F", display: "flex", alignItems: "center", gap: 7 }}>
              ⚠️ {error}
            </div>
          )}

          {tab === "login" ? (
            <div>
              <div style={{ marginBottom: 14 }}>
                <label style={{ fontSize: 12, fontWeight: 500, color: "#444441", display: "block", marginBottom: 6 }}>Email address</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@campus.ac.uk" style={inp(false)} />
              </div>
              <div style={{ marginBottom: 20 }}>
                <label style={{ fontSize: 12, fontWeight: 500, color: "#444441", display: "block", marginBottom: 6 }}>Password</label>
                <div style={{ position: "relative" }}>
                  <input type={showPass ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && handleLogin()}
                    placeholder="••••••••" style={{ ...inp(false), paddingRight: 40 }} />
                  <button onClick={() => setShowPass(p => !p)} style={{
                    position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)",
                    background: "none", border: "none", cursor: "pointer", fontSize: 14, color: "#888780",
                  }}>{showPass ? "🙈" : "👁️"}</button>
                </div>
              </div>
              <button onClick={handleLogin} disabled={loading} style={{
                width: "100%", padding: "11px", borderRadius: 9, background: loading ? "#85B7EB" : "#185FA5",
                color: "#fff", border: "none", cursor: loading ? "not-allowed" : "pointer",
                fontSize: 14, fontWeight: 600, transition: "background 0.15s",
              }}>{loading ? "Signing in..." : "Sign in"}</button>

              {/* Demo hint */}
              <div style={{ marginTop: 18, background: "#F1EFE8", borderRadius: 9, padding: "12px 14px" }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: "#444441", marginBottom: 7 }}>Demo accounts</div>
                {DEMO_USERS.map(u => (
                  <button key={u.email} onClick={() => { setEmail(u.email); setPassword(u.password); }} style={{
                    display: "block", width: "100%", textAlign: "left", background: "none",
                    border: "none", cursor: "pointer", padding: "3px 0", fontSize: 11, color: "#5F5E5A",
                  }}>
                    <span style={{ fontWeight: 500, color: "#2C2C2A" }}>{u.role}</span> — {u.email} / {u.password}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <div style={{ marginBottom: 14 }}>
                <label style={{ fontSize: 12, fontWeight: 500, color: "#444441", display: "block", marginBottom: 6 }}>Full name</label>
                <input value={name} onChange={e => setName(e.target.value)} placeholder="Your full name" style={inp(false)} />
              </div>
              <div style={{ marginBottom: 14 }}>
                <label style={{ fontSize: 12, fontWeight: 500, color: "#444441", display: "block", marginBottom: 6 }}>Email address</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@campus.ac.uk" style={inp(false)} />
              </div>
              <div style={{ marginBottom: 14 }}>
                <label style={{ fontSize: 12, fontWeight: 500, color: "#444441", display: "block", marginBottom: 6 }}>Role</label>
                <select value={role} onChange={e => setRole(e.target.value)} style={inp(false)}>
                  <option>Student</option>
                  <option>Staff</option>
                </select>
              </div>
              <div style={{ marginBottom: 20 }}>
                <label style={{ fontSize: 12, fontWeight: 500, color: "#444441", display: "block", marginBottom: 6 }}>Password</label>
                <div style={{ position: "relative" }}>
                  <input type={showPass ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && handleRegister()}
                    placeholder="Min. 6 characters" style={{ ...inp(false), paddingRight: 40 }} />
                  <button onClick={() => setShowPass(p => !p)} style={{
                    position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)",
                    background: "none", border: "none", cursor: "pointer", fontSize: 14, color: "#888780",
                  }}>{showPass ? "🙈" : "👁️"}</button>
                </div>
              </div>
              <button onClick={handleRegister} disabled={loading} style={{
                width: "100%", padding: "11px", borderRadius: 9, background: loading ? "#97C459" : "#3B6D11",
                color: "#fff", border: "none", cursor: loading ? "not-allowed" : "pointer",
                fontSize: 14, fontWeight: 600, transition: "background 0.15s",
              }}>{loading ? "Creating account..." : "Create account"}</button>
            </div>
          )}
        </div>

        <p style={{ textAlign: "center", fontSize: 11, color: "#B4B2A9", marginTop: 16 }}>
          Your data is handled securely. See our privacy policy.
        </p>
      </div>
    </div>
  );
};

const ISSUES_DATA = [
  { id: 1, category: "Electrical", location: "Block A - Room 101", desc: "Light not working since Monday", status: "In Progress", date: "2026-05-18", priority: "High", reporter: "Student" },
  { id: 2, category: "Plumbing", location: "Library - 2nd Floor", desc: "Sink tap leaking continuously", status: "New", date: "2026-05-20", priority: "Medium", reporter: "Staff" },
  { id: 3, category: "HVAC", location: "Sports Hall", desc: "AC not cooling, temperature very high", status: "Resolved", date: "2026-05-10", priority: "High", reporter: "Student" },
  { id: 4, category: "Structural", location: "Block C - Corridor", desc: "Ceiling tile fallen, safety hazard", status: "In Progress", date: "2026-05-19", priority: "Critical", reporter: "Staff" },
  { id: 5, category: "IT", location: "Computer Lab B", desc: "5 PCs not turning on", status: "New", date: "2026-05-21", priority: "Medium", reporter: "Student" },
  { id: 6, category: "Cleaning", location: "Canteen", desc: "Spill not cleared near entrance", status: "Resolved", date: "2026-05-17", priority: "Low", reporter: "Student" },
  { id: 7, category: "Electrical", location: "Block B - Room 204", desc: "Power socket sparking when used", status: "New", date: "2026-05-22", priority: "Critical", reporter: "Student" },
  { id: 8, category: "Plumbing", location: "Gym Changing Room", desc: "Hot water not available for 3 days", status: "In Progress", date: "2026-05-16", priority: "High", reporter: "Staff" },
];

const BAR_DATA = [
  { name: "Electrical", count: 8 },
  { name: "Plumbing", count: 6 },
  { name: "HVAC", count: 4 },
  { name: "Structural", count: 3 },
  { name: "IT", count: 5 },
  { name: "Cleaning", count: 7 },
];

const PIE_DATA = [
  { name: "New", value: 3, color: "#378ADD" },
  { name: "In Progress", value: 3, color: "#EF9F27" },
  { name: "Resolved", value: 2, color: "#639922" },
];

const STATUS_COLORS = {
  "New": { bg: "#E6F1FB", text: "#0C447C" },
  "In Progress": { bg: "#FAEEDA", text: "#633806" },
  "Resolved": { bg: "#EAF3DE", text: "#27500A" },
};

const PRIORITY_COLORS = {
  "Critical": { bg: "#FCEBEB", text: "#791F1F" },
  "High": { bg: "#FAEEDA", text: "#633806" },
  "Medium": { bg: "#E6F1FB", text: "#0C447C" },
  "Low": { bg: "#F1EFE8", text: "#444441" },
};

const CATEGORIES = ["Electrical", "Plumbing", "HVAC", "Structural", "IT", "Cleaning", "Other"];
const BUILDINGS = ["Block A", "Block B", "Block C", "Library", "Sports Hall", "Canteen", "Gym", "Computer Lab"];

const Pill = ({ label, colors }) => (
  <span style={{
    display: "inline-block", padding: "2px 10px", borderRadius: 20,
    fontSize: 11, fontWeight: 500,
    background: colors.bg, color: colors.text,
  }}>{label}</span>
);

const StatCard = ({ icon, label, value, sub, color }) => (
  <div style={{
    background: "#fff", border: "0.5px solid #e5e3db", borderRadius: 12,
    padding: "16px 20px", display: "flex", flexDirection: "column", gap: 4,
  }}>
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
      <span style={{ fontSize: 20, color }}>{icon}</span>
      <span style={{ fontSize: 12, color: "#888780" }}>{label}</span>
    </div>
    <div style={{ fontSize: 28, fontWeight: 600, color: "#2C2C2A", lineHeight: 1 }}>{value}</div>
    {sub && <div style={{ fontSize: 12, color: "#888780", marginTop: 2 }}>{sub}</div>}
  </div>
);

// ─── DASHBOARD ───────────────────────────────────────────────────────────────
const Dashboard = ({ issues, onNav }) => {
  const total = issues.length;
  const newCount = issues.filter(i => i.status === "New").length;
  const inProgress = issues.filter(i => i.status === "In Progress").length;
  const resolved = issues.filter(i => i.status === "Resolved").length;
  const critical = issues.filter(i => i.priority === "Critical").length;
  const recent = [...issues].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 4);

  return (
    <div style={{ padding: "24px 28px", fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 600, color: "#1a1a18", margin: 0 }}>Dashboard</h1>
        <p style={{ fontSize: 13, color: "#888780", marginTop: 4 }}>Campus maintenance overview — May 2026</p>
      </div>

      {critical > 0 && (
        <div style={{ background: "#FCEBEB", border: "0.5px solid #F7C1C1", borderRadius: 10, padding: "10px 16px", marginBottom: 20, display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 16 }}>⚠️</span>
          <span style={{ fontSize: 13, color: "#791F1F", fontWeight: 500 }}>{critical} critical issue{critical > 1 ? "s" : ""} require immediate attention.</span>
          <button onClick={() => onNav("issues")} style={{ marginLeft: "auto", fontSize: 12, color: "#A32D2D", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}>View all →</button>
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 28 }}>
        <StatCard icon="📋" label="Total Reports" value={total} sub="All time" color="#378ADD" />
        <StatCard icon="🔵" label="New" value={newCount} sub="Awaiting action" color="#378ADD" />
        <StatCard icon="🟡" label="In Progress" value={inProgress} sub="Being handled" color="#EF9F27" />
        <StatCard icon="🟢" label="Resolved" value={resolved} sub="This month" color="#639922" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 28 }}>
        <div style={{ background: "#fff", border: "0.5px solid #e5e3db", borderRadius: 12, padding: "18px 20px" }}>
          <div style={{ fontSize: 13, fontWeight: 500, color: "#2C2C2A", marginBottom: 14 }}>Issues by category</div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={BAR_DATA} barSize={22}>
              <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#888780" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "#888780" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: "0.5px solid #e5e3db" }} />
              <Bar dataKey="count" fill="#378ADD" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div style={{ background: "#fff", border: "0.5px solid #e5e3db", borderRadius: 12, padding: "18px 20px" }}>
          <div style={{ fontSize: 13, fontWeight: 500, color: "#2C2C2A", marginBottom: 14 }}>Status breakdown</div>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <PieChart width={140} height={140}>
              <Pie data={PIE_DATA} cx={65} cy={65} innerRadius={40} outerRadius={65} dataKey="value" paddingAngle={3}>
                {PIE_DATA.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
            </PieChart>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {PIE_DATA.map((d) => (
                <div key={d.name} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 10, height: 10, borderRadius: 2, background: d.color }} />
                  <span style={{ fontSize: 12, color: "#444441" }}>{d.name}</span>
                  <span style={{ fontSize: 12, fontWeight: 500, color: "#2C2C2A", marginLeft: "auto" }}>{d.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div style={{ background: "#fff", border: "0.5px solid #e5e3db", borderRadius: 12, padding: "18px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
          <div style={{ fontSize: 13, fontWeight: 500, color: "#2C2C2A" }}>Recent reports</div>
          <button onClick={() => onNav("issues")} style={{ fontSize: 12, color: "#185FA5", background: "none", border: "none", cursor: "pointer" }}>View all →</button>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "0.5px solid #e5e3db" }}>
              {["Category", "Location", "Status", "Priority", "Date"].map(h => (
                <th key={h} style={{ textAlign: "left", padding: "6px 10px 10px 0", color: "#888780", fontWeight: 500, fontSize: 11 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {recent.map(issue => (
              <tr key={issue.id} style={{ borderBottom: "0.5px solid #f1efe8" }}>
                <td style={{ padding: "10px 10px 10px 0", color: "#2C2C2A" }}>{issue.category}</td>
                <td style={{ padding: "10px 10px 10px 0", color: "#5F5E5A", fontSize: 12 }}>{issue.location}</td>
                <td style={{ padding: "10px 10px 10px 0" }}><Pill label={issue.status} colors={STATUS_COLORS[issue.status]} /></td>
                <td style={{ padding: "10px 10px 10px 0" }}><Pill label={issue.priority} colors={PRIORITY_COLORS[issue.priority]} /></td>
                <td style={{ padding: "10px 10px 10px 0", color: "#888780", fontSize: 12 }}>{issue.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ─── ISSUES LIST ──────────────────────────────────────────────────────────────
const IssuesList = ({ issues, onStatusChange }) => {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = issues.filter(i => {
    const matchStatus = filter === "All" || i.status === filter;
    const matchSearch = i.location.toLowerCase().includes(search.toLowerCase()) ||
      i.category.toLowerCase().includes(search.toLowerCase()) ||
      i.desc.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div style={{ padding: "24px 28px" }}>
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: 22, fontWeight: 600, color: "#1a1a18" }}>All Issues</h1>
        <p style={{ fontSize: 13, color: "#888780", marginTop: 4 }}>{issues.length} total reports logged</p>
      </div>

      <div style={{ display: "flex", gap: 10, marginBottom: 18, flexWrap: "wrap" }}>
        <input
          placeholder="Search by location, category..."
          value={search} onChange={e => setSearch(e.target.value)}
          style={{ flex: 1, minWidth: 200, padding: "8px 12px", borderRadius: 8, border: "0.5px solid #D3D1C7", fontSize: 13, outline: "none", background: "#fff" }}
        />
        {["All", "New", "In Progress", "Resolved"].map(s => (
          <button key={s} onClick={() => setFilter(s)} style={{
            padding: "8px 14px", borderRadius: 8, fontSize: 12, cursor: "pointer", fontWeight: filter === s ? 500 : 400,
            border: filter === s ? "1.5px solid #378ADD" : "0.5px solid #D3D1C7",
            background: filter === s ? "#E6F1FB" : "#fff",
            color: filter === s ? "#0C447C" : "#5F5E5A",
          }}>{s}</button>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {filtered.map(issue => (
          <div key={issue.id} style={{ background: "#fff", border: "0.5px solid #e5e3db", borderRadius: 12, padding: "16px 18px" }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 13, fontWeight: 500, color: "#2C2C2A" }}>{issue.category}</span>
                  <span style={{ fontSize: 11, color: "#888780" }}>•</span>
                  <span style={{ fontSize: 12, color: "#5F5E5A" }}>{issue.location}</span>
                  <Pill label={issue.priority} colors={PRIORITY_COLORS[issue.priority]} />
                </div>
                <p style={{ fontSize: 13, color: "#444441", margin: "0 0 8px" }}>{issue.desc}</p>
                <span style={{ fontSize: 11, color: "#B4B2A9" }}>Reported by {issue.reporter} · {issue.date}</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8, flexShrink: 0 }}>
                <Pill label={issue.status} colors={STATUS_COLORS[issue.status]} />
                <select
                  value={issue.status}
                  onChange={e => onStatusChange(issue.id, e.target.value)}
                  style={{ fontSize: 11, padding: "4px 8px", borderRadius: 6, border: "0.5px solid #D3D1C7", color: "#5F5E5A", background: "#F1EFE8", cursor: "pointer" }}
                >
                  <option>New</option>
                  <option>In Progress</option>
                  <option>Resolved</option>
                </select>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "48px 0", color: "#888780", fontSize: 13 }}>No issues found</div>
        )}
      </div>
    </div>
  );
};

// ─── REPORT FORM ──────────────────────────────────────────────────────────────
const ReportForm = ({ onSubmit }) => {
  const [form, setForm] = useState({ category: "", location: "", building: "", desc: "", priority: "Medium", photoUrl: "", consent: false });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.category) e.category = "Required";
    if (!form.building) e.building = "Required";
    if (!form.desc || form.desc.length < 10) e.desc = "Please describe the issue (min 10 chars)";
    if (!form.consent) e.consent = "You must agree to continue";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    onSubmit({ ...form, id: Date.now(), status: "New", date: new Date().toISOString().slice(0, 10), reporter: "Student" });
    setSubmitted(true);
  };

  const set = (k, v) => { setForm(f => ({ ...f, [k]: v })); setErrors(e => ({ ...e, [k]: undefined })); };

  if (submitted) return (
    <div style={{ padding: "24px 28px" }}>
      <div style={{ background: "#EAF3DE", border: "0.5px solid #C0DD97", borderRadius: 14, padding: "36px 28px", textAlign: "center", maxWidth: 440, margin: "40px auto" }}>
        <div style={{ fontSize: 36, marginBottom: 12 }}>✅</div>
        <h2 style={{ fontSize: 18, fontWeight: 600, color: "#27500A", margin: "0 0 8px" }}>Report submitted!</h2>
        <p style={{ fontSize: 13, color: "#3B6D11", margin: "0 0 20px" }}>Your issue has been logged and will be reviewed by the maintenance team.</p>
        <button onClick={() => setSubmitted(false)} style={{ padding: "10px 20px", borderRadius: 8, background: "#639922", color: "#fff", border: "none", cursor: "pointer", fontSize: 13, fontWeight: 500 }}>Submit another</button>
      </div>
    </div>
  );

  const Field = ({ label, error, children }) => (
    <div style={{ marginBottom: 18 }}>
      <label style={{ display: "block", fontSize: 12, fontWeight: 500, color: "#444441", marginBottom: 6 }}>{label}</label>
      {children}
      {error && <p style={{ fontSize: 11, color: "#A32D2D", marginTop: 4 }}>{error}</p>}
    </div>
  );

  const inputStyle = (err) => ({
    width: "100%", padding: "9px 12px", borderRadius: 8, fontSize: 13,
    border: `0.5px solid ${err ? "#F09595" : "#D3D1C7"}`, outline: "none", background: "#fff", color: "#2C2C2A"
  });

  return (
    <div style={{ padding: "24px 28px" }}>
      <div style={{ marginBottom: 22 }}>
        <h1 style={{ fontSize: 22, fontWeight: 600, color: "#1a1a18" }}>Report an issue</h1>
        <p style={{ fontSize: 13, color: "#888780", marginTop: 4 }}>Fill in the details below to log a maintenance issue.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, maxWidth: 680 }}>
        <Field label="Category *" error={errors.category}>
          <select value={form.category} onChange={e => set("category", e.target.value)} style={inputStyle(errors.category)}>
            <option value="">Select category</option>
            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>
        </Field>

        <Field label="Building *" error={errors.building}>
          <select value={form.building} onChange={e => set("building", e.target.value)} style={inputStyle(errors.building)}>
            <option value="">Select building</option>
            {BUILDINGS.map(b => <option key={b}>{b}</option>)}
          </select>
        </Field>

        <Field label="Room / Specific location">
          <input value={form.location} onChange={e => set("location", e.target.value)} placeholder="e.g. Room 204, near main entrance" style={inputStyle(false)} />
        </Field>

        <Field label="Priority">
          <select value={form.priority} onChange={e => set("priority", e.target.value)} style={inputStyle(false)}>
            {["Low", "Medium", "High", "Critical"].map(p => <option key={p}>{p}</option>)}
          </select>
        </Field>
      </div>

      <div style={{ maxWidth: 680 }}>
        <Field label="Description *" error={errors.desc}>
          <textarea value={form.desc} onChange={e => set("desc", e.target.value)} rows={4} placeholder="Describe the issue clearly. What is broken? When did it start? Is it a safety risk?" style={{ ...inputStyle(errors.desc), resize: "vertical", lineHeight: 1.6 }} />
        </Field>

        <Field label="Photo URL (optional)">
          <input value={form.photoUrl} onChange={e => set("photoUrl", e.target.value)} placeholder="https://..." style={inputStyle(false)} />
        </Field>

        <div style={{ background: "#F1EFE8", borderRadius: 10, padding: "14px 16px", marginBottom: 20, fontSize: 12, color: "#5F5E5A", lineHeight: 1.6 }}>
          <strong style={{ color: "#2C2C2A", display: "block", marginBottom: 4 }}>Privacy notice</strong>
          Your report will be stored securely and used only for maintenance tracking purposes. Personal details will not be shared with third parties. You can request deletion at any time.
        </div>

        <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 24 }}>
          <input type="checkbox" id="consent" checked={form.consent} onChange={e => set("consent", e.target.checked)} style={{ marginTop: 2, cursor: "pointer" }} />
          <label htmlFor="consent" style={{ fontSize: 13, color: "#444441", cursor: "pointer" }}>
            I agree to the privacy notice and consent to this data being stored for maintenance purposes.
          </label>
        </div>
        {errors.consent && <p style={{ fontSize: 11, color: "#A32D2D", marginTop: -18, marginBottom: 16 }}>{errors.consent}</p>}

        <button onClick={handleSubmit} style={{ padding: "11px 28px", borderRadius: 8, background: "#185FA5", color: "#fff", border: "none", cursor: "pointer", fontSize: 14, fontWeight: 500 }}>
          Submit report
        </button>
      </div>
    </div>
  );
};

// ─── GUIDANCE ─────────────────────────────────────────────────────────────────
const Guidance = () => {
  const tips = [
    { icon: "📝", title: "Be specific", body: "Include the exact room number, floor, and building. The more detail you give, the faster the team can act." },
    { icon: "📸", title: "Add a photo", body: "A photo link helps the maintenance team understand the severity before visiting. Use your phone camera." },
    { icon: "⚠️", title: "Safety first", body: "If the issue is an immediate safety risk (gas leak, fire hazard, fallen ceiling), call campus security immediately — do not just log a report." },
    { icon: "🔁", title: "Avoid duplicates", body: "Check the issues list to see if someone has already reported the same problem before submitting." },
    { icon: "📅", title: "Include the date", body: "Let us know when the issue started. This helps prioritise long-standing problems." },
    { icon: "🏷️", title: "Choose the right category", body: "Electrical, Plumbing, HVAC, Structural, IT, Cleaning — picking correctly routes your report to the right team faster." },
  ];

  return (
    <div style={{ padding: "24px 28px" }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 600, color: "#1a1a18" }}>Reporting guidance</h1>
        <p style={{ fontSize: 13, color: "#888780", marginTop: 4 }}>How to write a good maintenance report.</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        {tips.map(t => (
          <div key={t.title} style={{ background: "#fff", border: "0.5px solid #e5e3db", borderRadius: 12, padding: "16px 18px" }}>
            <div style={{ fontSize: 22, marginBottom: 8 }}>{t.icon}</div>
            <div style={{ fontSize: 13, fontWeight: 500, color: "#2C2C2A", marginBottom: 5 }}>{t.title}</div>
            <p style={{ fontSize: 13, color: "#5F5E5A", lineHeight: 1.6 }}>{t.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── APP SHELL ────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("dashboard");
  const [issues, setIssues] = useState(ISSUES_DATA);

  const handleSubmit = (newIssue) => {
    setIssues(prev => [newIssue, ...prev]);
  };

  const handleStatusChange = (id, status) => {
    setIssues(prev => prev.map(i => i.id === id ? { ...i, status } : i));
  };

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: "🏠" },
    { id: "issues", label: "All Issues", icon: "📋" },
    { id: "report", label: "Report Issue", icon: "➕" },
    { id: "guidance", label: "Guidance", icon: "📖" },
  ];

  const newCount = issues.filter(i => i.status === "New").length;

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "'DM Sans', 'Segoe UI', sans-serif", background: "#F7F6F2" }}>
      {/* Sidebar */}
      <div style={{ width: 210, background: "#fff", borderRight: "0.5px solid #e5e3db", display: "flex", flexDirection: "column", flexShrink: 0 }}>
        <div style={{ padding: "18px 16px 14px", borderBottom: "0.5px solid #e5e3db" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 28, height: 28, borderRadius: 6, background: "#185FA5", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>🔧</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#1a1a18" }}>FixMyCampus</div>
              <div style={{ fontSize: 10, color: "#888780" }}>Maintenance Portal</div>
            </div>
          </div>
        </div>

        <nav style={{ padding: "10px 0", flex: 1 }}>
          {navItems.map(item => (
            <button key={item.id} onClick={() => setPage(item.id)} style={{
              display: "flex", alignItems: "center", gap: 9, width: "100%",
              padding: "9px 16px", fontSize: 13, cursor: "pointer", border: "none",
              borderLeft: `2.5px solid ${page === item.id ? "#185FA5" : "transparent"}`,
              background: page === item.id ? "#E6F1FB" : "transparent",
              color: page === item.id ? "#0C447C" : "#5F5E5A",
              fontWeight: page === item.id ? 500 : 400, textAlign: "left",
            }}>
              <span>{item.icon}</span>
              {item.label}
              {item.id === "issues" && newCount > 0 && (
                <span style={{ marginLeft: "auto", background: "#378ADD", color: "#fff", fontSize: 10, borderRadius: 10, padding: "1px 7px", fontWeight: 600 }}>{newCount}</span>
              )}
            </button>
          ))}
        </nav>

        <div style={{ padding: "12px 16px", borderTop: "0.5px solid #e5e3db" }}>
          <div style={{ fontSize: 11, color: "#B4B2A9" }}>Logged in as Student</div>
        </div>
      </div>

      {/* Main content */}
      <div style={{ flex: 1, overflowY: "auto" }}>
        {page === "dashboard" && <Dashboard issues={issues} onNav={setPage} />}
        {page === "issues" && <IssuesList issues={issues} onStatusChange={handleStatusChange} />}
        {page === "report" && <ReportForm onSubmit={(i) => { handleSubmit(i); setPage("issues"); }} />}
        {page === "guidance" && <Guidance />}
      </div>
    </div>
  );
}
