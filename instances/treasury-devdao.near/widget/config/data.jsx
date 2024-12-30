const config = Near.view("${REPL_TREASURY}", "get_config");
const metadata = JSON.parse(atob(config.metadata ?? ""));

return {
  appName: "Treasury",
  navbarLinks: [
    {
      title: "Dashboard",
      href: "?page=dashboard",
    },
    {
      title: "Payments",
      href: "?page=payments",
    },
    {
      title: "Stake Delegation",
      href: "?page=stake-delegation",
    },
    // {
    //   title: "Asset Exchange",
    //   href: "?page=asset-exchange",
    // },
    {
      title: "Settings",
      href: "?page=settings",
    },
  ],
  treasuryDaoID: "${REPL_TREASURY}",
  proposalAPIEndpoint: "${REPL_PROPOSALS_CACHE_URL}",
  showProposalSelection: true,
  showKYC: true,
  showReferenceProposal: true,
  logo: metadata?.flagLogo ? (
    metadata?.flagLogo
  ) : (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_4823_9241)">
        <rect width="48" height="48" rx="24" fill="#01EC97" />
        <path
          d="M26.6117 7.20001H31.2L20.1882 40.8H15.6L26.6117 7.20001Z"
          fill="#151515"
        />
      </g>
      <defs>
        <clipPath id="clip0_4823_9241">
          <rect width="48" height="48" rx="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  ),
};
