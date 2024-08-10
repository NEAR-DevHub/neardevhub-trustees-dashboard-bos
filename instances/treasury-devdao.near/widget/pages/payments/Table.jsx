const { href } = VM.require("${REPL_DEVHUB}/widget/core.lib.url") || {
  href: () => {},
};

const proposals = props.proposals ?? [];
const columnsVisibility = JSON.parse(
  Storage.get(
    "COLUMNS_VISIBLILITY",
    `${REPL_DEPLOYMENT_ACCOUNT}/widget/components.SettingsDropdown`
  ) ?? "[]"
);
const isPendingRequests = props.isPendingRequests;
const transferApproversGroup = props.transferApproversGroup;

const accountId = context.accountId;

const hasVotingPermission = (
  transferApproversGroup?.approverAccounts ?? []
).includes(accountId);

const Container = styled.div`
  font-size: 13px;
  min-height:60vh;
  .text-grey {
    color: #b9b9b9 !important;
  }
  .text-size-2 {
    font-size: 15px;
  }
  .text-dark-grey {
    color: #687076;
  }
  .text-grey-100 {
    background-color: #f5f5f5;
  }
  td {
    padding: 0.5rem;
    color: inherit;
    vertical-align: middle;
  }
 
  .max-w-100 {
    max-width: 100%;
  }

  table {
    overflow-x: auto;
  }

  .bold {
    font-weight: 500;
  }

  .custom-truncate {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.5;
    max-height: 4.5em;
    text-align: left;
  }

  .custom-tooltip {
    position: relative;
    cursor: pointer;
  }

  .custom-tooltip .tooltiptext {
    display: none;
    width: 300px;
    background-color: white;
    color: black
    text-align: center;
    border-radius: 5px;
    padding: 5px;
    position: absolute;
    z-index: 10000;
    top:100%;
    opacity: 0;
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.3);
    transition: opacity 0.3s;
  }

  .custom-tooltip:hover .tooltiptext {
    display: block;
    opacity: 1;
  }

  .display-none{
    display:none;
  }

  .text-right{
    text-align:end;
  }

  .text-left{
    text-align:left;
  }
  .text-underline{
    text-decoration:underline !important;
  }
`;

const TooltipContent = ({ title, summary }) => {
  return (
    <div className="tooltiptext p-3">
      <h6>{title}</h6>
      <div>{summary}</div>
    </div>
  );
};

function isVisible(column) {
  return columnsVisibility.find((i) => i.title === column)?.show !== false
    ? ""
    : "display-none";
}

const requiredVotes =
  Math.floor(
    transferApproversGroup.threshold *
      transferApproversGroup.approverAccounts.length
  ) + 1;

const ProposalsComponent = () => {
  return (
    <tbody style={{ overflowX: "auto" }}>
      {proposals?.map((item, index) => {
        const description = JSON.parse(item.description);
        const title = description.title;
        const summary = description.summary;
        const proposalId = description.proposalId;
        const notes = description.notes;
        const args = item.kind.Transfer;

        return (
          <tr>
            <td className="bold">{item.id}</td>
            <td className={isVisible("Created Date")}>
              <Widget
                src={`${REPL_DEPLOYMENT_ACCOUNT}/widget/components.Date`}
                props={{
                  timestamp: item.submission_time,
                }}
              />
            </td>
            {!isPendingRequests && (
              <td>
                <Widget
                  src={`${REPL_DEPLOYMENT_ACCOUNT}/widget/components.ProposalStatus`}
                  props={{
                    isVoteStatus: false,
                    status: item.status,
                  }}
                />
              </td>
            )}
            <td className={isVisible("Reference")}>
              {typeof proposalId === "number" ? (
                <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  to={href({
                    widgetSrc: `${REPL_DEVHUB}/widget/app`,
                    params: {
                      page: "proposal",
                      id: proposalId,
                    },
                  })}
                >
                  <div className="d-flex gap-2 align-items-center text-underline bold text-black">
                    #{proposalId} <i class="bi bi-box-arrow-up-right"> </i>
                  </div>
                </Link>
              ) : (
                "-"
              )}
            </td>

            <td className={"custom-tooltip " + isVisible("Title")}>
              <div className="custom-truncate bold" style={{ maxWidth: 180 }}>
                {title}
                <TooltipContent title={title} summary={summary} />
              </div>
            </td>
            <td className={"custom-tooltip " + isVisible("Summary")}>
              <div className="custom-truncate" style={{ maxWidth: 180 }}>
                {summary}
                <TooltipContent title={title} summary={summary} />
              </div>
            </td>
            <td
              className={"text-truncate bold " + isVisible("Recipient")}
              style={{ maxWidth: 180 }}
            >
              <Widget
                src={`${REPL_DEPLOYMENT_ACCOUNT}/widget/components.ReceiverAccount`}
                props={{
                  receiverAccount: args.receiver_id,
                }}
              />
            </td>
            <td className={isVisible("Requested Token") + " text-center"}>
              <Widget
                src={`${REPL_DEPLOYMENT_ACCOUNT}/widget/components.TokenIcon`}
                props={{
                  address: args.token_id,
                }}
              />
            </td>
            <td className={isVisible("Funding Ask") + " text-right"}>
              <Widget
                src={`${REPL_DEPLOYMENT_ACCOUNT}/widget/components.TokenAmount`}
                props={{
                  amountWithoutDecimals: args.amount,
                  address: args.token_id,
                }}
              />
            </td>
            <td className={"bold text-center " + isVisible("Creator")}>
              {item.proposer}
            </td>
            <td className={"text-sm text-left " + isVisible("Notes")}>
              {notes ?? "-"}
            </td>
            {isPendingRequests && (
              <td className={isVisible("Required Votes") + " text-center"}>
                {requiredVotes}
              </td>
            )}
            {isPendingRequests && (
              <td className={isVisible("Votes") + " text-center"}>
                <Widget
                  src={`${REPL_DEPLOYMENT_ACCOUNT}/widget/components.Votes`}
                  props={{
                    votes: item.votes,
                    requiredVotes,
                  }}
                />
              </td>
            )}
            <td
              className={isVisible("Approvers") + " text-center"}
              style={{ minWidth: 100 }}
            >
              <Widget
                src={`${REPL_DEPLOYMENT_ACCOUNT}/widget/components.Approvers`}
                props={{
                  votes: item.votes,
                  transferApproversGroup:
                    transferApproversGroup?.approverAccounts,
                }}
              />
            </td>
            {isPendingRequests && hasVotingPermission && (
              <td>
                <Widget
                  src={`${REPL_DEPLOYMENT_ACCOUNT}/widget/components.VoteActions`}
                  props={{
                    votes: item.votes,
                    proposalId: item.id,
                  }}
                />
              </td>
            )}
          </tr>
        );
      })}
    </tbody>
  );
};

return (
  <Container style={{ overflowX: "auto" }}>
    <table className="table">
      <thead>
        <tr className="text-grey">
          <td>#</td>
          <td className={isVisible("Created Date")}>Created Date</td>
          {!isPendingRequests && <td>Status</td>}
          <td className={isVisible("Reference")}>Reference</td>

          <td className={isVisible("Title")}>Title</td>
          <td className={isVisible("Summary")}>Summary</td>
          <td className={isVisible("Recipient")}>Recipient</td>
          <td className={isVisible("Requested Token") + " text-center"}>
            Requested Token
          </td>
          <td className={isVisible("Funding Ask") + " text-right"}>
            Funding Ask
          </td>
          <td className={isVisible("Creator") + " text-center"}>Created by</td>
          <td className={isVisible("Notes") + " text-left"}>Notes</td>
          {isPendingRequests && (
            <td className={isVisible("Required Votes") + " text-center"}>
              Required Votes
            </td>
          )}
          {isPendingRequests && (
            <td className={isVisible("Votes") + " text-center"}>Votes</td>
          )}
          <td className={isVisible("Approvers") + " text-center"}>Approvers</td>
          {isPendingRequests && hasVotingPermission && (
            <td className="text-right">Actions</td>
          )}
          {/* {!isPendingRequests && <td>Transaction Date</td>}
          {!isPendingRequests && <td>Transaction</td>} */}
        </tr>
      </thead>
      <ProposalsComponent />
    </table>
  </Container>
);
