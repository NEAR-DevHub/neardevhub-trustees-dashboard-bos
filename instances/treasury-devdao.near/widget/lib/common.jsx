const treasuryDaoID = "${REPL_TREASURY}";
function getTransferApproversAndThreshold() {
  const daoPolicy = Near.view(treasuryDaoID, "get_policy", {});
  const groupWithTransferPermission = (daoPolicy.roles ?? []).filter((role) => {
    const transferPermissions = [
      "*:*",
      "transfer:*",
      "transfer:VoteApprove",
      "transfer:VoteReject",
      "transfer:VoteRemove",
      "*:VoteApprove",
      "*:VoteReject",
      "*:VoteRemove",
    ];
    return (role?.permissions ?? []).some((i) =>
      transferPermissions.includes(i)
    );
  });

  let approversGroup = [];
  let ratios = [];
  groupWithTransferPermission.map((i) => {
    approversGroup = approversGroup.concat(i.kind.Group ?? []);
    if (i.vote_policy["transfer"].weight_kind === "RoleWeight") {
      ratios = ratios.concat(i.vote_policy["transfer"].threshold);
      ratios = ratios.concat(i.vote_policy["transfer"].threshold);
    }
  });

  let numerator = 0;
  let denominator = 0;

  if (ratios.length > 0) {
    ratios.forEach((value, index) => {
      if (index == 0 || index % 2 === 0) {
        // Even index -> numerator
        numerator += value;
      } else {
        // Odd index -> denominator
        denominator += value;
      }
    });
  } else {
    numerator = 1;
    denominator = 2;
  }

  return {
    approverAccounts: Array.from(new Set(approversGroup)),
    threshold: numerator / denominator,
  };
}

function getPolicyApproverGroup() {
  const daoPolicy = Near.view(treasuryDaoID, "get_policy", {});
  const groupWithPermission = (daoPolicy.roles ?? []).filter((role) => {
    const policyPermissions = [
      "*:*",
      "policy:AddProposal",
      "policy:*",
      "policy:VoteApprove",
      "policy:VoteReject",
      "policy:VoteRemove",
      "*:VoteApprove",
      "*:VoteReject",
      "*:VoteRemove",
    ];
    return (role?.permissions ?? []).some((i) => policyPermissions.includes(i));
  });

  let approversGroup = [];
  groupWithPermission.map((i) => {
    approversGroup = approversGroup.concat(i.kind.Group ?? []);
  });

  return Array.from(new Set(approversGroup));
}

const filterFunction = (item, filterStatusArray, filterKindArray) => {
  const kind =
    typeof item.kind === "string" ? item.kind : Object.keys(item.kind)[0];
  if (filterStatusArray.length > 0 && filterKindArray.length > 0) {
    return (
      filterStatusArray.includes(item.status) && filterKindArray.includes(kind)
    );
  } else if (filterKindArray.length > 0) {
    return filterKindArray.includes(kind);
  } else if (filterStatusArray.length > 0) {
    return filterStatusArray.includes(item.status);
  }
  return true;
};

function getFilteredProposalsByStatusAndkind({
  resPerPage,
  reverse,
  filterKindArray,
  filterStatusArray,
  offset,
  lastProposalId,
}) {
  let newLastProposalId = offset ?? 0;
  let filteredProposals = [];
  const limit = 30;
  if (reverse && !offset) {
    newLastProposalId = lastProposalId;
  }
  const promiseArray = [];
  while (
    (reverse && newLastProposalId > 0) ||
    (!reverse && newLastProposalId < lastProposalId)
  ) {
    promiseArray.push(
      Near.asyncView(treasuryDaoID, "get_proposals", {
        from_index:
          newLastProposalId - limit > 0 ? newLastProposalId - limit : 0,
        limit: limit,
      })
    );
    if (reverse) {
      newLastProposalId -= limit;
    } else {
      newLastProposalId += limit;
    }
  }
  return Promise.all(promiseArray).then((res) => {
    const proposals = [].concat(...res);
    filteredProposals = proposals.filter((item) =>
      filterFunction(item, filterStatusArray, filterKindArray)
    );
    const uniqueFilteredProposals = Array.from(
      new Map(filteredProposals.map((item) => [item.id, item])).values()
    );
    const newArray = uniqueFilteredProposals.slice(0, resPerPage);
    if (reverse) {
      newArray.reverse();
    }
    return {
      filteredProposals: newArray,
      totalLength: filteredProposals.length,
    };
  });
}

const data = fetch(`https://httpbin.org/headers`);
const gatewayOrigin = data?.body?.headers?.Origin ?? "";

const isNearSocial =
  gatewayOrigin.includes("near.social") ||
  gatewayOrigin.includes("127.0.0.1:8080");

function getMembersAndPermissions() {
  return Near.asyncView(treasuryDaoID, "get_policy", {}).then((daoPolicy) => {
    const memberData = [];

    if (Array.isArray(daoPolicy.roles)) {
      // Use a map to collect permissions and role names for each member
      const memberMap = new Map();

      daoPolicy.roles.forEach((role) => {
        (role.kind.Group ?? []).forEach((member) => {
          if (!memberMap.has(member)) {
            memberMap.set(member, {
              member: member,
              permissions: [],
              roles: [],
            });
          }

          // Add permissions and role names
          memberMap.get(member).permissions.push(...role.permissions);
          memberMap.get(member).roles.push(role.name);
        });
      });

      // Convert map to array and remove duplicates
      return Array.from(memberMap.values()).map((data) => ({
        member: data.member,
        permissions: Array.from(new Set(data.permissions)), // Remove duplicate permissions
        roles: Array.from(new Set(data.roles)), // Remove duplicate role names
      }));
    }

    return memberData;
  });
}

function getDaoRoles() {
  const daoPolicy = Near.view(treasuryDaoID, "get_policy", {});
  if (Array.isArray(daoPolicy.roles)) {
    return daoPolicy.roles.map((role) => role.name);
  }

  return [];
}

return {
  getTransferApproversAndThreshold,
  getFilteredProposalsByStatusAndkind,
  isNearSocial,
  getMembersAndPermissions,
  getDaoRoles,
  getPolicyApproverGroup,
};
