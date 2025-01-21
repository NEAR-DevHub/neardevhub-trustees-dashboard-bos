const { normalize } = VM.require(
  "${REPL_DEVHUB}/widget/core.lib.stringUtils"
) || { normalize: () => {} };

const { selectedTab, page, leftNavbarOptions } = props;

const Container = styled.div`
  .link {
    text-decoration: none;
  }

  .link.active {
    background-color: var(--grey-035);
  }

  .link:hover {
    background-color: var(--grey-035);
  }

  .flex-1 {
    flex: 1;
    min-width: 200px;
  }

  .flex-5 {
    flex: 5;
  }
`;

const currentTabTitle =
  props.selectedTab ?? normalize(leftNavbarOptions?.[0].title);

const [currentTab, setCurrentTab] = useState(
  leftNavbarOptions.find((i) => normalize(i.title) === currentTabTitle) ??
    leftNavbarOptions?.[0]
);

return (
  <Container className="d-flex gap-4 flex-wrap">
    <div className="flex-1" style={{ height: "max-content" }}>
      <div className="d-flex gap-2 flex-column">
        {leftNavbarOptions.map((item) => {
          const { title } = item;
          return (
            <div
              onClick={() => setCurrentTab(item)}
              className={[
                "link d-inline-flex gap-2 p-2 px-3 rounded-3 pointer",
                currentTab.title === title ? "active" : "",
              ].join(" ")}
              key={title}
              data-testid={title}
            >
              <div>{title}</div>
            </div>
          );
        })}
      </div>
    </div>
    <div className="flex-5 w-100">
      {currentTab && (
        <div className="w-100 h-100" key={currentTab.title}>
          <Widget
            src={currentTab.href}
            props={{ ...props, ...currentTab.props }}
          />
        </div>
      )}
    </div>
  </Container>
);
