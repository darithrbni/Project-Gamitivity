function ItemCard({ image, name, owned, equipped, selected, onClick }) {
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
          <div className="item-card-locked">Belum dimiliki</div>
        )}
      </div>
    </button>
  );
}

export default ItemCard;
