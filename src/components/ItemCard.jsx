import CoinIcon from "../assets/CoinIcon.png";

function ItemCard({ image, name, price, owned, equipped, selected, onClick }) {
  return (
    <button
      className={`item-card ${selected ? "item-card-selected" : ""}`}
      onClick={onClick}
    >
      {/* IMAGE */}
      <div className="item-card-image-wrapper">
        <img src={image} alt={name} className="item-card-image" />
      </div>

      {/* NAME */}
      <p className="item-card-name">{name}</p>

      {/* STATUS */}
      <div className="item-card-status">
        {equipped ? (
          <div className="item-card-equipped">Dipakai</div>
        ) : owned ? (
          <div className="item-card-owned">Dimiliki</div>
        ) : (
          <div className="item-card-locked">
            <span className="item-card-locked-text">Locked</span>

            <div className="item-card-price-row">
              <span>{price}</span>

              <img src={CoinIcon} alt="Coin" className="item-card-coin-icon" />
            </div>
          </div>
        )}
      </div>
    </button>
  );
}

export default ItemCard;
