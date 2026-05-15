function CustomizationPage({ setPage }) {
  const categories = [
    {
      name: "Rambut",
      icon: "HairIcon.png",
    },
    {
      name: "Baju",
      icon: "ShirtIcon.png",
    },
    {
      name: "Dinding",
      icon: "WallIcon.png",
    },
    {
      name: "Jendela",
      icon: "WindowIcon.png",
    },
    {
      name: "Meja",
      icon: "DeskIcon.png",
    },
    {
      name: "Aksesoris",
      icon: "AccessoryIcon.png",
    },
    {
      name: "View",
      icon: "ViewIcon.png",
    },
  ];
  return (
    <>
      {/* OVERLAY */}
      <div className="menu-overlay" onClick={() => setPage("main")} />

      {/* BACK BUTTON */}
      <button className="back-button" onClick={() => setPage("main")}>
        BACK
      </button>

      {/* CUSTOMIZATION SIDEBAR */}
      <div className="customization-wrapper">
        <div className="customization-sidebar">
          <div className="customization-categories">
            {categories.map((category) => (
              <button
                key={category.name}
                className="customization-category-button"
              >
                <img
                  src={`/src/assets/${category.icon}`}
                  alt={category.name}
                  className="customization-category-icon"
                />

                <span className="customization-category-text">
                  {category.name}
                </span>
              </button>
            ))}
          </div>

          <div className="customization-items-empty">
            Item customization akan muncul di sini
          </div>
        </div>
      </div>
    </>
  );
}

export default CustomizationPage;
