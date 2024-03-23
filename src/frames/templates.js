const DEFAULT = (name, minDepositAmount, maxDepositAmount, totalAmountRaised) => `<div
    style="
    display: flex;
    flex-direction:column;
    justify-content: center;
    width: 600px;
    height: 400px;
    color: #000;
  "
  >
    <div
      style="
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 6px;
      padding: 12px;
      border-radius: 4px;
      background: grey;
      color: #fff;
      font-size: 30px;
      font-weight:350;
    "
    >
      ${name}
    </div>

    <div
      style="
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction:column;
      font-size:22px;
      "
    >
      <div>Min deposit : ${minDepositAmount} USDC</div>

      <div>Max deposit : ${maxDepositAmount} USDC</div>

      <div>Total raised : ${totalAmountRaised} USDC</div>
    </div>
  </div> `;

module.exports = { DEFAULT };
