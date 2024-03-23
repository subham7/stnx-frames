const DEFAULT = (name, minDepositAmount, maxDepositAmount, totalAmountRaised, raiseAmount, ownerAddress, membersCount) => `
<div
  style="
    display: flex;
    padding: 100px 50px;
    flex-direction: column;
    justify-content: space-around;
    background-image: linear-gradient(135deg,#292532,#111111);
    width: 600px;
    height: 400px;
    color: #fff;
  "
>

  <div style="display: flex;align-items:center">
    <span
      style="min-height: 50px; min-width: 50px; border-radius: 10px; background-image: linear-gradient(135deg, #2e55ff, #ff279c); margin-right:15px;"
    ></span>
    <div style="color: #fff; font-size: 30px; font-weight: 500">${name}</div>
  </div>

  <div style="display: flex; justify-content: space-between">
    <div
      style="
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        font-size: 22px;
        font-weight: 500;
      "
    >
      <div style="display: flex; flex-direction: column; font-size: 22px;margin-bottom:20px;">
        <div style="color: #7a7d89">Min / Max</div>
        <div>${minDepositAmount} / ${maxDepositAmount} USDC</div>
      </div>

      <div style="display: flex; flex-direction: column; font-size: 22px">
        <div style="color: #7a7d89">Raised</div>
        <div>${totalAmountRaised} / ${raiseAmount} USDC</div>
      </div>
    </div>

    <div
      style="
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        font-size: 22px;
        font-weight: 500;
      "
    >
      <div style="display: flex; flex-direction: column; font-size: 22px;margin-bottom:20px;">
        <div style="color: #7a7d89">Admin</div>
        <div>${ownerAddress.substring(0, 10)}...</div>
      </div>

      <div style="display: flex; flex-direction: column; font-size: 22px">
        <div style="color: #7a7d89">Members</div>
        <div>${membersCount}</div>
      </div>
    </div>
  </div>
</div>

`;

module.exports = { DEFAULT };
