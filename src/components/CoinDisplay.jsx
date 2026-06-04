import CoinIcon from "../assets/CoinIcon.png";

function CoinDisplay({ coins }) {
  return (
    <div className="coin-display">
      <img src={CoinIcon} alt="Coin" className="coin-display-icon" />

      <span className="coin-display-text">{coins}</span>
    </div>
  );
}

export default CoinDisplay;
