'use client';
import { useState, useEffect, useRef, FormEvent } from 'react';
import Head from 'next/head';

// ─── DATA ────────────────────────────────────────────────────────────────────

const NAV_LINKS = ['Home', 'About', 'Experience', 'Skills', 'Projects', 'Contact'];

const STATUSES = [
  { label: 'AWS Cloud',        state: 'ACTIVE',    dot: 'green'  },
  { label: 'Linux Systems',    state: 'ACTIVE',    dot: 'green'  },
  { label: 'VPN / Network',    state: 'STABLE',    dot: 'teal'   },
  { label: 'CI/CD Pipelines',  state: 'RUNNING',   dot: 'yellow' },
  { label: 'Windows Server',   state: 'ACTIVE',    dot: 'green'  },
];

const EXPERIENCE = [
  {
    company: 'NIRC',
    role: 'System Administrator / DevOps Engineer',
    period: '2019 – Present',
    type: 'Government Infrastructure',
    current: true,
    points: [
      'Administer 25+ government servers across Linux (RHEL/Ubuntu) and Windows Server',
      'Manage AWS infrastructure: EC2, S3, IAM, CloudWatch monitoring and alerting',
      'Build and maintain CI/CD pipelines using Jenkins, GitLab CI, and Bitbucket',
      'Implement patch management, security hardening, and access control policies',
      'Configure DNS, DHCP, Active Directory on Windows Server for enterprise users',
      'Manage VMware and Proxmox virtualization for server consolidation',
      'Automate operations with Bash, Python, and PowerShell scripts',
    ],
    tags: ['Linux', 'Windows Server', 'AWS', 'Jenkins', 'GitLab', 'VMware', 'Bash'],
  },
  {
    company: 'BSNL',
    role: 'Network / VPN Administrator',
    period: '2016 – 2019',
    type: 'Telecom – Banking VPN',
    current: false,
    points: [
      'Deployed and maintained VPN infrastructure for SBI banking connectivity',
      'Managed MPLS and BGP routing protocols for secure inter-site communication',
      'Ensured compliance with banking-grade network security standards',
      'Performed network fault isolation and Tier-2/3 incident escalation',
      'Monitored WAN link health, traffic utilization, and SLA adherence',
    ],
    tags: ['VPN', 'MPLS', 'BGP', 'Cisco', 'Network Security', 'SBI'],
  },
];

const SKILL_GROUPS = [
  {
    title: 'Operating Systems',
    skills: [
      { name: 'Linux (RHEL, Ubuntu, CentOS)', pct: 95 },
      { name: 'Windows Server 2016/2019/2022', pct: 90 },
    ],
  },
  {
    title: 'Cloud & Virtualization',
    skills: [
      { name: 'AWS (EC2, S3, IAM, CloudWatch)', pct: 82 },
      { name: 'VMware / Proxmox', pct: 80 },
    ],
  },
  {
    title: 'Networking & Security',
    skills: [
      { name: 'VPN / MPLS / BGP', pct: 88 },
      { name: 'DNS / DHCP / Active Directory', pct: 90 },
      { name: 'Firewall & Hardening', pct: 78 },
    ],
  },
  {
    title: 'DevOps & CI/CD',
    skills: [
      { name: 'Jenkins', pct: 80 },
      { name: 'GitLab CI / Bitbucket', pct: 78 },
      { name: 'Git', pct: 85 },
    ],
  },
  {
    title: 'Scripting',
    skills: [
      { name: 'Bash / Shell', pct: 88 },
      { name: 'Python', pct: 72 },
      { name: 'PowerShell', pct: 75 },
    ],
  },
];

const TOOLS = [
  'AWS', 'Linux', 'Windows Server', 'Jenkins', 'GitLab CI', 'Docker',
  'VMware', 'Proxmox', 'Cisco', 'Bash', 'Python', 'PowerShell',
  'Nginx', 'Apache', 'MySQL', 'Git', 'Bitbucket', 'CloudWatch', 'Ansible',
];

const PROJECTS = [
  {
    id: 'P-001',
    name: 'AWS Multi-Tier Deployment',
    status: 'DEPLOYED',
    stack: 'EC2 · RDS · S3 · CloudFront · IAM',
    desc: 'Production-style cloud topology with alarms, security groups, and role-based access control.',
  },
  {
    id: 'P-002',
    name: 'Linux Server Hardening Lab',
    status: 'DOCUMENTED',
    stack: 'RHEL · Ubuntu · Bash · fail2ban · auditd',
    desc: 'Repeatable baseline for SSH hardening, firewall policy, audit trails, and CIS Level-1 compliance.',
  },
  {
    id: 'P-003',
    name: 'Active Directory + DNS Lab',
    status: 'OPERATIONAL',
    stack: 'Windows Server 2019 · AD DS · DNS · DHCP · VMware',
    desc: 'Enterprise identity simulation with OU structure, GPOs, DNS zones, and DHCP scopes.',
  },
  {
    id: 'P-004',
    name: 'CI/CD Pipeline Control Plane',
    status: 'RUNNING',
    stack: 'Jenkins · GitLab CI · Docker · SSH Deploy',
    desc: 'Build, test, deploy, and rollback workflow across staging and production nodes.',
  },
  {
    id: 'P-005',
    name: 'VPN Infrastructure Simulation',
    status: 'ARCHIVED',
    stack: 'GNS3 · Cisco IOS · MPLS · BGP · IPSec',
    desc: 'MPLS-based VPN topology with BGP peering, route policies, and site-to-site tunnels.',
  },
  {
    id: 'P-006',
    name: 'Proxmox Cluster Setup',
    status: 'OPERATIONAL',
    stack: 'Proxmox VE · LVM · Ceph · VLAN',
    desc: 'High-availability virtualization cluster with shared storage and network segmentation.',
  },
];

const TERMINAL_COMMANDS: Record<string, string> = {
  whoami:     'Bhuwan Bhandari\nSystem Administrator · DevOps Engineer · Network Administrator\n8+ years of production infrastructure experience',
  experience: '[CURRENT]  NIRC — SysAdmin / DevOps Engineer  (2019–Present)\n           25+ servers, AWS, Jenkins, GitLab, CI/CD pipelines\n\n[PREV]     BSNL — Network / VPN Administrator    (2016–2019)\n           SBI banking VPN, MPLS, BGP, WAN operations',
  skills:     'Linux .................. 95%\nWindows Server ......... 90%\nAWS .................... 82%\nVPN / MPLS / BGP ....... 88%\nJenkins / GitLab CI .... 80%\nBash / Python / PS ..... 85%',
  contact:    'Email  : thebhuone@gmail.com\nStatus : Open to US Remote / Full-time roles',
  help:       'Commands: whoami · experience · skills · contact · clear',
};

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

function StatusDot({ tone }: { tone: string }) {
  return <span className={`status-dot ${tone} animate-pulse-slow`} />;
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="section-label mb-2">{children}</p>;
}

function Tag({ label }: { label: string }) {
  return (
    <span className="inline-block text-xs px-3 py-1 rounded-full border border-white/20 text-white/60 hover:border-teal-500/60 hover:text-teal-400 transition-colors">
      {label}
    </span>
  );
}

// ─── NAVBAR ──────────────────────────────────────────────────────────────────

function Navbar({ active }: { active: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (link: string) => {
    scrollTo(link.toLowerCase());
    setMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#202020]/95 backdrop-blur-md border-b border-white/10 shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <button onClick={() => scrollTo('home')} className="flex items-center gap-2">
          <span className="text-teal-400 font-bold text-lg tracking-wide">BB</span>
          <span className="hidden sm:block text-white/70 text-sm font-light">/ sysadmin</span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const isActive = active === link.toLowerCase();
            return (
              <button
                key={link}
                onClick={() => handleNav(link)}
                className={`px-4 py-2 text-sm font-medium transition-colors rounded-md ${
                  isActive ? 'text-teal-400' : 'text-white/60 hover:text-white'
                }`}
              >
                {link}
                {isActive && <span className="block h-0.5 bg-teal-400 mt-0.5 rounded-full" />}
              </button>
            );
          })}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="/Bhuwan_Bhandari_Resume.pdf"
            download
            className="btn-teal text-sm px-5 py-2"
          >
            Download CV
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white/70 hover:text-white p-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#202020]/98 border-t border-white/10 px-6 py-4 space-y-1">
          {NAV_LINKS.map((link) => (
            <button
              key={link}
              onClick={() => handleNav(link)}
              className="block w-full text-left py-2.5 text-sm text-white/70 hover:text-teal-400 transition-colors border-b border-white/5 last:border-0"
            >
              {link}
            </button>
          ))}
          <a
            href="/Bhuwan_Bhandari_Resume.pdf"
            download
            className="btn-teal inline-block text-sm px-5 py-2 mt-3"
          >
            Download CV
          </a>
        </div>
      )}
    </header>
  );
}

// ─── HERO ────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-16">
      <div className="border-line" />

      <div className="max-w-6xl mx-auto px-6 md:px-8 w-full py-20">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">

          {/* Left: text */}
          <div className="flex-1 order-2 md:order-1 text-center md:text-left">
            <SectionLabel>System Administrator · DevOps Engineer</SectionLabel>

            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mt-3 mb-4">
              Hi, I'm{' '}
              <span className="text-gradient">Bhuwan Bhandari</span>
            </h1>

            <p className="text-white/60 text-base leading-relaxed max-w-xl mb-8">
              8+ years managing Linux and Windows server environments, enterprise VPN
              infrastructure, and cloud deployments on AWS. Experienced with CI/CD pipelines,
              government-scale server administration, and production system reliability.
            </p>

            {/* Status panel */}
            <div className="glass-card inline-block p-4 mb-8 text-left">
              <p className="text-xs text-white/40 uppercase tracking-widest mb-3">System Status</p>
              <div className="space-y-2">
                {STATUSES.map((s) => (
                  <div key={s.label} className="flex items-center justify-between gap-8 text-xs">
                    <span className="text-white/50">{s.label}</span>
                    <span className="flex items-center gap-1.5">
                      <StatusDot tone={s.dot} />
                      <span className={s.dot === 'green' ? 'text-green-400' : s.dot === 'teal' ? 'text-teal-400' : 'text-yellow-400'}>
                        {s.state}
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <a href="/Bhuwan_Bhandari_Resume.pdf" download className="btn-teal px-6 py-2.5 text-sm">
                ↓ Download Resume
              </a>
              <button onClick={() => scrollTo('contact')} className="btn-ghost px-6 py-2.5 text-sm">
                Contact Me
              </button>
              <button onClick={() => scrollTo('experience')} className="btn-ghost px-6 py-2.5 text-sm">
                View Experience
              </button>
            </div>
          </div>

          {/* Right: avatar / stats */}
          <div className="order-1 md:order-2 flex-shrink-0">
            <div className="relative">
              {/* Avatar circle */}
              <div className="w-60 h-60 md:w-72 md:h-72 rounded-full border-2 border-teal-500/40 bg-gradient-to-br from-teal-900/40 to-[#202020] flex items-center justify-center shadow-xl">
                <div className="text-center">
                  <div className="text-5xl mb-2">⚙️</div>
                  <div className="text-teal-400 font-bold text-lg">BB</div>
                  <div className="text-white/40 text-xs mt-1">SysAdmin · DevOps</div>
                </div>
              </div>
              {/* Floating stat badges */}
              <div className="absolute -bottom-3 -left-4 glass-card px-3 py-2 text-center">
                <div className="text-teal-400 font-bold text-lg">8+</div>
                <div className="text-white/50 text-xs">Years Exp.</div>
              </div>
              <div className="absolute -top-3 -right-4 glass-card px-3 py-2 text-center">
                <div className="text-teal-400 font-bold text-lg">25+</div>
                <div className="text-white/50 text-xs">Servers</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

// ─── ABOUT ───────────────────────────────────────────────────────────────────

function About() {
  const stats = [
    { label: 'Years Experience', value: '8+' },
    { label: 'Servers Managed',  value: '25+' },
    { label: 'Cloud Platform',   value: 'AWS' },
    { label: 'Availability',     value: 'US Remote' },
  ];

  return (
    <section id="about" className="relative py-24">
      <div className="border-line" />
      <div className="max-w-6xl mx-auto px-6 md:px-8">

        <div className="text-center mb-14">
          <SectionLabel>Who I Am</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">About Me</h2>
          <div className="w-12 h-0.5 bg-teal-500 mx-auto mt-4" />
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div className="space-y-4 text-white/60 text-base leading-relaxed">
            <p>
              I'm a System Administrator and DevOps Engineer with over 8 years of experience
              in enterprise IT infrastructure, cloud operations, and secure network management.
            </p>
            <p>
              At NIRC, I manage 25+ government servers running Linux and Windows Server,
              handle AWS deployments (EC2, S3, CloudWatch), and maintain CI/CD pipelines
              using Jenkins, GitLab, and Bitbucket — ensuring production uptime and
              infrastructure automation across critical services.
            </p>
            <p>
              Previously at BSNL, I built and maintained VPN infrastructure for banking
              connectivity (SBI), handled enterprise-grade network troubleshooting, and
              ensured secure, compliant communication channels between financial institutions.
            </p>
            <p>
              I work primarily in Linux environments (RHEL, Ubuntu, CentOS), with strong
              command of Windows Server (AD, DNS, DHCP), VMware virtualization, and
              scripting (Bash, Python, PowerShell).
            </p>
            <div className="pt-2">
              <a href="/Bhuwan_Bhandari_Resume.pdf" download className="btn-teal inline-block px-6 py-2.5 text-sm">
                Download Resume
              </a>
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="glass-card p-6 text-center group">
                <div className="text-3xl font-bold text-gradient mb-2">{s.value}</div>
                <div className="text-white/50 text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

// ─── EXPERIENCE ──────────────────────────────────────────────────────────────

function Experience() {
  return (
    <section id="experience" className="relative py-24">
      <div className="border-line" />
      <div className="max-w-6xl mx-auto px-6 md:px-8">

        <div className="text-center mb-14">
          <SectionLabel>Work History</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">Experience</h2>
          <div className="w-12 h-0.5 bg-teal-500 mx-auto mt-4" />
        </div>

        <div className="space-y-6">
          {EXPERIENCE.map((job) => (
            <div key={job.company} className="glass-card p-6 md:p-8">
              {/* Header */}
              <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-xl font-bold text-teal-400">{job.company}</h3>
                    {job.current && (
                      <span className="text-xs px-2 py-0.5 rounded-full border border-teal-500/40 text-teal-400 bg-teal-500/10">
                        Current
                      </span>
                    )}
                  </div>
                  <p className="text-white font-medium">{job.role}</p>
                  <p className="text-white/40 text-sm mt-0.5">{job.type}</p>
                </div>
                <div className="text-right">
                  <p className="text-white/50 text-sm font-medium">{job.period}</p>
                </div>
              </div>

              {/* Points */}
              <ul className="space-y-2 mb-6">
                {job.points.map((pt, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-white/60">
                    <span className="text-teal-500 mt-0.5 shrink-0">›</span>
                    {pt}
                  </li>
                ))}
              </ul>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {job.tags.map((t) => <Tag key={t} label={t} />)}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

// ─── SKILLS ──────────────────────────────────────────────────────────────────

function Skills() {
  return (
    <section id="skills" className="relative py-24">
      <div className="border-line" />
      <div className="max-w-6xl mx-auto px-6 md:px-8">

        <div className="text-center mb-14">
          <SectionLabel>Technical Proficiency</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">Skills Matrix</h2>
          <div className="w-12 h-0.5 bg-teal-500 mx-auto mt-4" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {SKILL_GROUPS.map((group) => (
            <div key={group.title} className="glass-card p-6">
              <h3 className="text-teal-400 text-sm font-semibold uppercase tracking-wider mb-5">
                {group.title}
              </h3>
              <div className="space-y-4">
                {group.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-white/70">{skill.name}</span>
                      <span className="text-white/40">{skill.pct}%</span>
                    </div>
                    <div className="skill-bar-track">
                      <div className="skill-bar-fill" style={{ width: `${skill.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Tools cloud */}
        <div className="glass-card p-6">
          <h3 className="text-teal-400 text-sm font-semibold uppercase tracking-wider mb-5">
            Tools & Platforms
          </h3>
          <div className="flex flex-wrap gap-2">
            {TOOLS.map((tool) => <Tag key={tool} label={tool} />)}
          </div>
        </div>

      </div>
    </section>
  );
}

// ─── PROJECTS ────────────────────────────────────────────────────────────────

const STATUS_COLORS: Record<string, string> = {
  DEPLOYED:    'text-green-400 border-green-500/30 bg-green-500/10',
  DOCUMENTED:  'text-teal-400 border-teal-500/30 bg-teal-500/10',
  OPERATIONAL: 'text-green-400 border-green-500/30 bg-green-500/10',
  RUNNING:     'text-yellow-400 border-yellow-500/30 bg-yellow-500/10',
  ARCHIVED:    'text-white/40 border-white/20 bg-white/5',
};

function Projects() {
  return (
    <section id="projects" className="relative py-24">
      <div className="border-line" />
      <div className="max-w-6xl mx-auto px-6 md:px-8">

        <div className="text-center mb-14">
          <SectionLabel>Lab Work</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">Projects & Labs</h2>
          <div className="w-12 h-0.5 bg-teal-500 mx-auto mt-4" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROJECTS.map((p) => (
            <div key={p.id} className="glass-card p-6 flex flex-col gap-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-white/30 text-xs font-mono mb-1">{p.id}</p>
                  <h3 className="text-white font-semibold text-sm leading-snug">{p.name}</h3>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full border shrink-0 ${STATUS_COLORS[p.status]}`}>
                  {p.status}
                </span>
              </div>
              <p className="text-white/50 text-xs leading-relaxed flex-1">{p.desc}</p>
              <p className="text-teal-500/70 text-xs font-mono">{p.stack}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

// ─── CONTACT ─────────────────────────────────────────────────────────────────

function Contact() {
  const [form, setForm] = useState({ name: '', subject: '', priority: 'Normal', message: '' });
  const [sent, setSent] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const body = encodeURIComponent(`From: ${form.name}\nPriority: ${form.priority}\n\n${form.message}`);
    const subj = encodeURIComponent(form.subject || 'Portfolio Contact');
    window.location.href = `mailto:thebhuone@gmail.com?subject=${subj}&body=${body}`;
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  const inputCls = 'w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-teal-500/60 transition-colors';

  return (
    <section id="contact" className="relative py-24">
      <div className="border-line" />
      <div className="max-w-6xl mx-auto px-6 md:px-8">

        <div className="text-center mb-14">
          <SectionLabel>Get In Touch</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">Contact</h2>
          <div className="w-12 h-0.5 bg-teal-500 mx-auto mt-4" />
        </div>

        <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">

          {/* Info panel */}
          <div className="space-y-6">
            <div className="glass-card p-6">
              <p className="text-white/40 text-xs uppercase tracking-widest mb-4">Direct Contact</p>
              <a href="mailto:thebhuone@gmail.com" className="text-teal-400 font-medium hover:underline break-all">
                thebhuone@gmail.com
              </a>
              <div className="mt-5 pt-5 border-t border-white/10 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/50">Availability</span>
                  <span className="flex items-center gap-1.5 text-green-400">
                    <StatusDot tone="green" /> Open to Hire
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/50">Preferred</span>
                  <span className="text-white/70">US Remote / Full-time</span>
                </div>
              </div>
              <div className="mt-5 pt-5 border-t border-white/10">
                <p className="text-white/40 text-xs uppercase tracking-widest mb-3">Role Interest</p>
                {['DevOps Engineer', 'System Administrator', 'Cloud Engineer', 'Network Engineer'].map((r) => (
                  <div key={r} className="flex items-center gap-2 text-sm text-white/60 py-1">
                    <span className="text-teal-500">›</span> {r}
                  </div>
                ))}
              </div>
            </div>
            <a
              href="mailto:thebhuone@gmail.com?subject=Opportunity"
              className="btn-teal flex items-center justify-center gap-2 w-full py-3 text-sm"
            >
              ✉ Send Direct Email
            </a>
          </div>

          {/* Form */}
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="text-white/40 text-xs uppercase tracking-wider block mb-1.5">Your Name</label>
              <input name="name" value={form.name} onChange={onChange} placeholder="Full name" className={inputCls} />
            </div>
            <div>
              <label className="text-white/40 text-xs uppercase tracking-wider block mb-1.5">Subject</label>
              <input name="subject" value={form.subject} onChange={onChange} placeholder="e.g. DevOps Engineer Opportunity" className={inputCls} />
            </div>
            <div>
              <label className="text-white/40 text-xs uppercase tracking-wider block mb-1.5">Priority</label>
              <select name="priority" value={form.priority} onChange={onChange} className={inputCls}>
                <option>Normal</option>
                <option>High</option>
                <option>Urgent</option>
              </select>
            </div>
            <div>
              <label className="text-white/40 text-xs uppercase tracking-wider block mb-1.5">Message</label>
              <textarea name="message" value={form.message} onChange={onChange} required rows={5} placeholder="Your message..." className={`${inputCls} resize-none`} />
            </div>
            <button type="submit" className="btn-teal w-full py-3 text-sm font-medium">
              {sent ? '✓ Opening Email Client...' : 'Send Message →'}
            </button>
          </form>

        </div>
      </div>
    </section>
  );
}

// ─── TERMINAL ────────────────────────────────────────────────────────────────

function Terminal({ onClose }: { onClose: () => void }) {
  const [lines, setLines] = useState<{ type: string; text: string }[]>([
    { type: 'sys', text: 'Portfolio Terminal — type "help" for commands' },
    { type: 'sys', text: '──────────────────────────────────────────────' },
  ]);
  const [input, setInput] = useState('');
  const [hist, setHist] = useState<string[]>([]);
  const [hIdx, setHIdx] = useState(-1);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [lines]);
  useEffect(() => { inputRef.current?.focus(); }, []);

  const run = (cmd: string) => {
    const c = cmd.trim().toLowerCase();
    const out: { type: string; text: string }[] = [{ type: 'in', text: `$ ${cmd}` }];
    if (c === 'clear') { setLines([{ type: 'sys', text: 'Cleared.' }]); setInput(''); return; }
    if (c && TERMINAL_COMMANDS[c]) out.push({ type: 'out', text: TERMINAL_COMMANDS[c] });
    else if (c) out.push({ type: 'err', text: `command not found: ${c}. Try "help"` });
    setLines((p) => [...p, ...out]);
    setHist((p) => [cmd, ...p]);
    setHIdx(-1);
    setInput('');
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') { run(input); return; }
    if (e.key === 'ArrowUp') { const i = Math.min(hIdx + 1, hist.length - 1); setHIdx(i); setInput(hist[i] ?? ''); }
    if (e.key === 'ArrowDown') { const i = Math.max(hIdx - 1, -1); setHIdx(i); setInput(i === -1 ? '' : hist[i] ?? ''); }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 terminal-block flex flex-col" style={{ height: '260px' }}>
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-[#141414]">
        <span className="text-xs text-white/40 font-mono">
          <span className="text-teal-400">$_</span> bhuwan@portfolio — terminal
        </span>
        <button onClick={onClose} className="text-xs text-white/40 hover:text-white transition-colors">✕ close</button>
      </div>
      <div className="flex-1 overflow-y-auto px-4 py-3 font-mono text-xs space-y-1 cursor-text" onClick={() => inputRef.current?.focus()}>
        {lines.map((l, i) => (
          <div key={i} className={`whitespace-pre-wrap ${l.type === 'in' ? 'text-teal-400' : l.type === 'err' ? 'text-red-400' : l.type === 'sys' ? 'text-white/30' : 'text-white/80'}`}>
            {l.text}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <div className="flex items-center gap-2 px-4 py-2 border-t border-white/10">
        <span className="font-mono text-xs text-green-400 shrink-0">bhuwan@portfolio:~$</span>
        <input ref={inputRef} value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={onKeyDown}
          className="flex-1 bg-transparent font-mono text-xs text-white outline-none caret-teal-400" autoComplete="off" spellCheck={false} />
      </div>
    </div>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────────────────────

function Footer({ onTerminal }: { onTerminal: () => void }) {
  return (
    <footer className="border-t border-white/10 py-8">
      <div className="max-w-6xl mx-auto px-6 md:px-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-white/70 text-sm font-medium">Bhuwan Bhandari</p>
          <p className="text-white/30 text-xs mt-0.5">System Administrator · DevOps Engineer · Network Administrator</p>
        </div>
        <div className="flex items-center gap-4 text-xs text-white/40">
          <a href="mailto:thebhuone@gmail.com" className="hover:text-teal-400 transition-colors">thebhuone@gmail.com</a>
          <a href="/Bhuwan_Bhandari_Resume.pdf" download className="hover:text-teal-400 transition-colors">Resume ↓</a>
          <button onClick={onTerminal} className="hover:text-teal-400 transition-colors">$_ Terminal</button>
        </div>
      </div>
    </footer>
  );
}

// ─── PAGE ────────────────────────────────────────────────────────────────────

const SECTION_IDS = ['home', 'about', 'experience', 'skills', 'projects', 'contact'];

export default function Home() {
  const [active, setActive] = useState('home');
  const [termOpen, setTermOpen] = useState(false);

  useEffect(() => {
    const obs = SECTION_IDS.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setActive(id); }, { threshold: 0.3 });
      o.observe(el);
      return o;
    });
    return () => obs.forEach((o) => o?.disconnect());
  }, []);

  return (
    <>
      <Head>
        <title>Bhuwan Bhandari — SysAdmin · DevOps Engineer</title>
        <meta name="description" content="System Administrator and DevOps Engineer with 8+ years in Linux, Windows Server, AWS, VPN, and CI/CD." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="bg-[#202020] min-h-screen text-white">
        <Navbar active={active} />

        <div className="page-wrapper" style={{ paddingBottom: termOpen ? '260px' : 0 }}>
          <Hero />
          <About />
          <Experience />
          <Skills />
          <Projects />
          <Contact />
          <Footer onTerminal={() => setTermOpen((v) => !v)} />
        </div>

        {termOpen && <Terminal onClose={() => setTermOpen(false)} />}
      </div>
    </>
  );
}
