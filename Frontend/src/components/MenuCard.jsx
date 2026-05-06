function MenuCard({ title, icon, onClick }) {
  return (
    <button
      className="menu-card"
      onClick={onClick}
    >
      <img
        className="menu-card-icon"
        src={icon}
        alt={title}
      />

      <p className="menu-card-title">
        {title}
      </p>
    </button>
  );
}

export default MenuCard;