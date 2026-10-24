const GITHUB_RAW_BASE = 'https://raw.githubusercontent.com/CheeseLad/cablenetwork-docs/main';
const GITHUB_REPO_BASE = 'https://github.com/CheeseLad/cablenetwork-docs/blob/main';

export const DOCS = {
  commands: {
    id: 'commands',
    title: 'Commands',
    description: 'In-game commands and syntax guide for Cable Network',
    path: 'crp-info/commands.md',
    docUrl: `${GITHUB_RAW_BASE}/crp-info/commands.md`,
    githubUrl: `${GITHUB_REPO_BASE}/crp-info/commands.md`
  },
  discordRules: {
    id: 'discord-rules',
    title: 'Discord Rules',
    description: 'Official rules and guidelines for our Discord community',
    path: 'other-info/discord-rules.md',
    docUrl: `${GITHUB_RAW_BASE}/other-info/discord-rules.md`,
    githubUrl: `${GITHUB_REPO_BASE}/other-info/discord-rules.md`
  },
  serverRules: {
    id: 'server-rules',
    title: 'Server Rules',
    description: 'Official gameplay and roleplay rules for Cable Network servers',
    path: 'crp-info/server-rules.md',
    docUrl: `${GITHUB_RAW_BASE}/crp-info/server-rules.md`,
    githubUrl: `${GITHUB_REPO_BASE}/crp-info/server-rules.md`
  },
  bypasses: {
    id: 'bypasses',
    title: 'Bypasses Guide',
    description: 'List of bypasses for Cable Network servers',
    path: 'crp-info/bypasses.md',
    docUrl: `${GITHUB_RAW_BASE}/crp-info/bypasses.md`,
    githubUrl: `${GITHUB_REPO_BASE}/crp-info/bypasses.md`
  },
  donationInfo: {
    id: 'donation-info',
    title: 'Donation Information',
    description: 'Details about donating to Cable Network',
    path: 'crp-info/donation-info.md',
    docUrl: `${GITHUB_RAW_BASE}/crp-info/donation-info.md`,
    githubUrl: `${GITHUB_REPO_BASE}/crp-info/donation-info.md`
  },
};

// Backwards-compatibility alias
export const GOOGLE_DOCS = DOCS;

export default DOCS;
