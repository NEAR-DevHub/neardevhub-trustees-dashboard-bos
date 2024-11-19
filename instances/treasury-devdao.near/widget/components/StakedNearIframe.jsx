const accountId = props.accountId;

if (!accountId) {
  return <></>;
}

const setNearStakedTotalTokens = props.setNearStakedTotalTokens || (() => {});
const setNearUnstakedTokens = props.setNearUnstakedTokens || (() => {});
const setNearStakedTokens = props.setNearStakedTokens || (() => {});
const setPoolWithBalance = props.setPoolWithBalance || (() => {});

const code = `
  <!doctype html>
  <html>
    <body>
      <script>
        const archiveNodeUrl = "https://archival-rpc.mainnet.near.org";
        const treasuryDaoID = "${accountId}"
        async function getAccountStakedBalance(stakingpool_id, account_id) {
        return await fetch(archiveNodeUrl, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            jsonrpc: "2.0",
            id: "dontcare",
            method: "query",
            params: {
              request_type: "call_function",
              finality: 'final',
              account_id: stakingpool_id,
              method_name: "get_account_staked_balance",
              args_base64: btoa(
                JSON.stringify({
                  account_id: account_id,
                })
              ),
            },
          }),
        })
          .then((r) => r.json())
          .then((r) =>
            parseInt(
              r.result.result
                .map((c) => String.fromCharCode(c))
                .join("")
                .replace(/\"/g, "")
            )
          );
      }

      async function getAccountUnStakedBalance(stakingpool_id, account_id) {
        return await fetch(archiveNodeUrl, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            jsonrpc: "2.0",
            id: "dontcare",
            method: "query",
            params: {
              request_type: "call_function",
              finality: 'final',
              account_id: stakingpool_id,
              method_name: "get_account_unstaked_balance",
              args_base64: btoa(
                JSON.stringify({
                  account_id: account_id,
                })
              ),
            },
          }),
        })
          .then((r) => r.json())
          .then((r) =>
            parseInt(
              r.result.result
                .map((c) => String.fromCharCode(c))
                .join("")
                .replace(/\"/g, "")
            )
          );
      }

      async function getStakingPools() {
        return await fetch("https://api.fastnear.com/v1/account/" + treasuryDaoID + "/staking").then(r => r.json())
      }
      window.onload = async () => {
        const poolResp = await getStakingPools();
        const pools = await Promise.all(poolResp.pools.map(async (i) => {
          const stakedBalance = await getAccountStakedBalance(i.pool_id, poolResp.account_id);
          const unStakedBalance = await getAccountUnStakedBalance(i.pool_id, poolResp.account_id);
          return { pool: i.pool_id, stakedBalance, unStakedBalance };
        }));
        window.parent.postMessage({ handler: "stakedNearPool", pools }, "*");
      };
      </script>
    </body>
  </html> 
  `;

const iframe = (
  <iframe
    style={{
      display: "none",
    }}
    srcDoc={code}
    onMessage={(e) => {
      switch (e.handler) {
        case "stakedNearPool":
          const pools = e.pools;
          let stakedBalance = new Big(0);
          let unstakedBalance = new Big(0);
          pools.forEach((pool) => {
            stakedBalance = stakedBalance.plus(
              new Big(pool.stakedBalance).div(1e24)
            );
            unstakedBalance = unstakedBalance.plus(
              new Big(pool.unStakedBalance).div(1e24)
            );
          });
          const totalBalance = stakedBalance.plus(unstakedBalance);
          setNearStakedTotalTokens(totalBalance.toFixed() ?? "0");
          setNearUnstakedTokens(unstakedBalance.toFixed() ?? "0");
          setNearStakedTokens(stakedBalance.toFixed() ?? "0");
          setPoolWithBalance(pools);
          break;
      }
    }}
  />
);

return iframe;
