const { selectedTab, instance } = props;

if (!instance) {
  return <></>;
}

const { treasuryDaoID } = VM.require(`${instance}/widget/config.data`);

const Container = styled.div`
  .flex-1 {
    flex: 1;
  }
`;

const SidebarMenu = ({ currentTab }) => {
  return (
    <Widget
      src={`${REPL_BASE_DEPLOYMENT_ACCOUNT}/widget/pages.settings.feed.SettingsDropdown`}
      props={{
        isPendingPage: currentTab.title === "Pending Requests",
      }}
    />
  );
};

return (
  <Container>
    <Widget
      src={`${REPL_BASE_DEPLOYMENT_ACCOUNT}/widget/components.Tabs`}
      props={{
        ...props,
        tabs: [
          {
            title: "Pending Requests",
            href: `${REPL_BASE_DEPLOYMENT_ACCOUNT}/widget/pages.settings.feed.PendingRequests`,
            props: props,
          },
          {
            title: "History",
            href: `${REPL_BASE_DEPLOYMENT_ACCOUNT}/widget/pages.settings.feed.History`,
            props: props,
          },
        ],
        SidebarMenu,
      }}
    />
  </Container>
);
