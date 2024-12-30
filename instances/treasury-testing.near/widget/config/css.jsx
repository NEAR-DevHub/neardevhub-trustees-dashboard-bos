const config = Near.view("${REPL_TREASURY}", "get_config");
const metadata = JSON.parse(atob(config.metadata ?? ""));

const Theme = styled.div`
  --theme-color: ${metadata.primaryColor ?? "#05a36e"};
`;

return { Theme };
