const DEFAULT = (name, minDepositAmount, maxDepositAmount, totalAmountRaised, raiseAmount, ownerAddress, membersCount) => `
<div
   style="
    display: flex;
    padding: 30px;
    flex-direction: column;
    justify-content: center;
    gap:35px;
    background-image: linear-gradient(135deg,#202020,#000);
    font-size:22px;
    width: 600px;
    height: 400px;
    color: #fff;
  "
>

  <div style="display: flex;align-items:center">
    <span
      style="min-height: 40px; min-width: 40px; border-radius: 10px; background-image: linear-gradient(135deg, #2e55ff, #ff279c); margin-right:15px;"
    ></span>
    <div style="color: #fff; font-size: 32px;">${name}</div>
  </div>

  <div style="display: flex; justify-content: flex-start;gap:100px">
    <div
      style="
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        font-size: 22px;
        gap:25px
      "
    >
      <div style="display: flex; flex-direction: column;gap:8px">
        <div style="color: #7a7d89 ; font-size:20px">Min / Max</div>
        <div>${minDepositAmount} / ${maxDepositAmount} USDC</div>
      </div>

      <div style="display: flex; flex-direction: column;gap:8px">
        <div style="color: #7a7d89; font-size:20px">Raised</div>
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
        gap:25px;
      "
    >
      <div style="display: flex; flex-direction: column; gap:8px">
        <div style="color: #7a7d89; font-size:20px">Admin</div>
        <div>${ownerAddress.substring(0, 10)}...</div>
      </div>

      <div style="display: flex; flex-direction: column; gap:8px">
        <div style="color: #7a7d89; font-size:20px">Members</div>
        <div>${membersCount}</div>
      </div>
    </div>
  </div>
</div>
`;

const DEPOSIT = (name, depositAmt) => `
<div
  style="
    display: flex;
    padding: 50px 30px;
    flex-direction: column;
    justify-content: space-around;
    background-image: linear-gradient(135deg,#202020,#000);
    font-size:22px;
    width: 600px;
    height: 400px;
    color: #fff;
  "
>
  <div style="display: flex; flex-direction: column; justify-content: flex-start; align-items: flex-start;gap:8px">
    <div style="color: #7a7d89;font-size:20px">You are depositing</div>
    <div style="display: flex; align-items: center;gap:8px">
    <img src="https://cryptologos.cc/logos/usd-coin-usdc-logo.png" style="width: 25px; height: 25px;" alt="USD Coin Logo">

    <div style="color: #fff; font-size: 30px; font-weight: 500">${depositAmt} USDC</div>
    </div>
  </div>

  <div style="display: flex; flex-direction: column; justify-content: flex-start; align-items: flex-start;gap:8px">
    <div style="color: #7a7d89">into this station</div>
    <div style="display: flex; align-items: center">
      <span
        style="
          min-height: 30px;
          min-width: 30px;
          border-radius: 10px;
          background-image: linear-gradient(135deg, #2e55ff, #ff279c);
          margin-right: 15px;
        "
      ></span>
      <div style="color: #fff; font-size: 30px; font-weight: 500;">${name}</div>
    </div>
  </div>

  <div style="color: #7a7d89;font-size:20px">
    Note: Funds will be at the discretion of this station’s admin. By depositing, you agree that you trust the admin with the
    funds.
  </div>
</div>

`;

module.exports = { DEFAULT, DEPOSIT };
