import { useState, useRef, useEffect } from 'react';

const COMMANDS = {
  help: () => [
    'Available commands:',
    '  whoami        — identity',
    '  about         — profile summary',
    '  skills        — skills matrix',
    '  experience    — work history',
    '  projects      — project list',
    '  stack         — core tech stack',
    '  contact       — contact details',
    '  status        — current status',
    '  funfact       — random fact',
    '  clear         — clear terminal',
    '  help          — this message',
  ],
  whoami: () => [
    'Bhuwan Bhandari',
    'System Administrator | DevOps Engineer | Network Administrator',
    'Location: Nepal | Onsite / Remote Hybrid | Ready to Relocate',
    '8+ years of production operations',
  ],
  about: () => [
    'My work sits where people, platforms, and uptime meet.',
    'I administer Linux and Windows environments, automate the handoffs',
    'between development and operations, and make security visible',
    'in everyday practice.',
    '',
    'Currently with NIRC, supporting 25+ production servers across',
    'Linux, Windows, AWS, and on-premises infrastructure.',
  ],
  skills: () => [
    'Linux (Debian/RHEL):    ████████████████████ 98%',
    'Windows Server + AD:    ██████████████████░ 92%',
    'AWS Cloud:              ████████████████░░░░ 85%',
    'Docker / Kubernetes:    ███████████████░░░░░ 80%',
    'CI/CD (Jenkins/GitLab): ███████████████░░░░░ 80%',
    'Bash / Python:          ██████████████████░ 90%',
    'Networking:             ██████████████████░ 92%',
    'VMware / Proxmox:       ███████████████░░░░░ 80%',
    'Monitoring (Grafana):   ████████████████░░░░ 82%',
    'Security:               ████████████████░░░░ 85%',
  ],
  experience: () => [
    '[CURRENT]  NIRC SYSTEM NODE  (2019–Present)',
    '           25+ production servers, Linux, Windows, AWS, CI/CD',
    '           Docker, Jenkins, GitLab, Bash automation',
    '           VMware ESXi, Proxmox, Grafana, Zabbix',
    '           Government programs: GWP, CashChat, NOC, Health Screening',
    '',
    '[PREV]     BSNL NETWORK NODE  (9 months — Aug 2018)',
    '           Assistant Network Administrator',
    '           Network ops, connectivity, troubleshooting',
  ],
  projects: () => [
    'Government & Enterprise:',
    '  - Government With People (GWP)',
    '  - Nepal Oil Corporation (NOC)',
    "  - Chief Minister's Health Screening Program",
    '  - Provincial Research and Training Institute',
    '  - NIRC CRM',
    '',
    'Applications & Platforms:',
    '  - CashChat, HamroHMS, Rakmina',
    '  - KIEC Educational Consultancy',
    '  - StartUpGhar, Ezeyway Online Shopping',
    '  - Brandwave Digital Agency',
    '  - Aarambha Foundation (NGO)',
    '  - Tax System (IPT)',
    '',
    'Infrastructure & DevOps:',
    '  - Minio S3 Server, Docker, Jenkins, GitLab',
    '  - VMware ESXi, Proxmox, AWS',
    '  - Grafana, Zabbix monitoring',
    '  - Training Sessions, Security Camps, Mentorship',
  ],
  stack: () => [
    'OPERATING SYSTEMS:',
    '  Linux (Debian, RHEL), Windows Server, AD',
    '',
    'CLOUD & INFRA:',
    '  AWS, VMware ESXi, Proxmox, Minio S3',
    '',
    'CONTAINERIZATION:',
    '  Docker, Kubernetes basics',
    '',
    'CI/CD & AUTOMATION:',
    '  Jenkins, GitLab CI/CD, Bash scripting, Python',
    '',
    'MONITORING:',
    '  Grafana, Zabbix',
    '',
    'SECURITY:',
    '  Network security, server hardening, training',
  ],
  contact: () => [
    'Email:    thebhuone@gmail.com',
    'GitHub:   github.com/thebhuone',
    'LinkedIn: linkedin.com/in/bhuone99',
    'Location: Nepal | Ready to relocate',
  ],
  status: () => [
    'STATUS: AVAILABLE',
    'Mode: Onsite / Remote Hybrid',
    'Relocation: Ready',
    'Uptime mindset: 99.9%',
    'Current mission: Building reliable, observable infrastructure',
  ],
  funfact: () => {
    const facts = [
      'I once managed 25+ servers single-handedly during a critical government program rollout.',
      'My first production break was at 2 AM. Now I dream in bash scripts.',
      'I have trained over 100+ municipal officers in system administration.',
      'Grafana dashboards are my favorite form of art.',
      'I believe the best code is the code you do not have to write — automation.',
      'Proxmox node replication has saved me more weekends than coffee.',
      'My home lab has more uptime than some production environments I have seen.',
      'I once debugged a production issue using only `tail`, `grep`, and intuition.',
    ];
    return [facts[Math.floor(Math.random() * facts.length)]];
  },
  clear: () => null,
};

export default function Terminal() {
  const [lines, setLines] = useState([
    { type: 'system', text: 'Portfolio Shell v2.0.0 — type "help" for commands' },
    { type: 'system', text: 'Welcome, curious visitor. Explore the system.' },
    { type: 'system', text: '─'.repeat(52) },
  ]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [histIdx, setHistIdx] = useState(-1);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const terminalBodyRef = useRef(null);

  const scrollToBottom = () => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [lines]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const runCommand = (cmd) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    const newLines = [{ type: 'input', text: `$ ${cmd}` }];

    if (trimmed === 'clear') {
      setLines([{ type: 'system', text: 'Terminal cleared.' }]);
      setHistory((prev) => [cmd, ...prev]);
      setHistIdx(-1);
      setInput('');
      return;
    }

    const fn = COMMANDS[trimmed];
    if (fn) {
      const out = fn();
      if (out) newLines.push({ type: 'output', text: out });
    } else {
      newLines.push({ type: 'error', text: `command not found: ${trimmed}. Type "help" for available commands.` });
    }

    setLines((prev) => [...prev, ...newLines]);
    setHistory((prev) => [cmd, ...prev]);
    setHistIdx(-1);
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      runCommand(input);
      return;
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const idx = Math.min(histIdx + 1, history.length - 1);
      setHistIdx(idx);
      setInput(history[idx] ?? '');
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const idx = Math.max(histIdx - 1, -1);
      setHistIdx(idx);
      setInput(idx === -1 ? '' : history[idx] ?? '');
      return;
    }
  };

  return (
    <div className="terminal-window">
      <div className="terminal-header">
        <div className="terminal-dots">
          <span />
          <span />
          <span />
        </div>
        <span className="terminal-title">bhuwan@portfolio: ~</span>
      </div>
      <div
        className="terminal-body"
        ref={terminalBodyRef}
        onClick={() => inputRef.current?.focus()}
      >
        {lines.map((line, i) => (
          <div
            key={i}
            className={`whitespace-pre-wrap ${
              line.type === 'input'
                ? 'text-accent'
                : line.type === 'error'
                  ? 'text-red'
                  : line.type === 'system'
                    ? 'text-muted/60'
                    : 'text-text'
            }`}
          >
            {line.text}
          </div>
        ))}
        <div className="terminal-input-line">
          <span className="prompt">bhuwan@portfolio:~$</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="terminal-input"
            placeholder="enter command..."
            autoComplete="off"
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
}