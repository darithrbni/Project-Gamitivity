import { useState } from "react";

import HairIcon from "../assets/HairIcon.svg";
import ClothesIcon from "../assets/ClothesIcon.svg";
import WallpaperIcon from "../assets/WallpaperIcon.svg";
import WindowViewIcon from "../assets/WindowView.svg";
import DeskSetIcon from "../assets/DeskSet.svg";
import ItemCard from "../components/ItemCard";

import ArrowDownIcon from "../assets/ArrowDownIcon.png";

function CustomizationPage({
  setPage,
  isClosingCustomization,
  setIsClosingCustomization,
}) {
  const [selectedCategory, setSelectedCategory] = useState("Rambut");
  const categories = [
    {
      name: "Rambut",
      icon: HairIcon,
    },
    {
      name: "Baju",
      icon: ClothesIcon,
    },
    {
      name: "Dinding",
      icon: WallpaperIcon,
    },
    {
      name: "View",
      icon: WindowViewIcon,
    },
    {
      name: "Meja",
      icon: DeskSetIcon,
    },
  ];

  const [selectedItemId, setSelectedItemId] = useState(1);

  const dummyItems = [
    {
      id: 1,
      name: "Rambut Default",
      image: "https://placehold.co/120x120",
      owned: true,
      equipped: true,
    },
    {
      id: 2,
      name: "Rambut Silver",
      image: "https://placehold.co/120x120",
      owned: true,
      equipped: false,
    },
    {
      id: 3,
      name: "Rambut Biru",
      image: "https://placehold.co/120x120",
      owned: false,
      equipped: false,
    },
  ];

  return (
    <>
      {/* CUSTOMIZATION SIDEBAR */}
      <div className="customization-wrapper">
        <div
          className={`customization-sidebar ${
            isClosingCustomization
              ? "customization-sidebar-close"
              : "customization-sidebar-open"
          }`}
        >
          <button
            className="customization-close-button"
            onClick={() => {
              setIsClosingCustomization(true);

              setTimeout(() => {
                setPage("main");

                setIsClosingCustomization(false);
              }, 300);
            }}
          >
            <img
              src={ArrowDownIcon}
              alt="Close"
              className="customization-close-icon"
            />
          </button>
          <div className="customization-categories">
            {categories.map((category) => (
              <button
                key={category.name}
                className={`customization-category-button ${
                  selectedCategory === category.name
                    ? "customization-category-button-active"
                    : ""
                }`}
                onClick={() => setSelectedCategory(category.name)}
              >
                <img
                  src={category.icon}
                  alt={category.name}
                  className="customization-category-icon"
                />

                <span className="customization-category-text">
                  {category.name}
                </span>
              </button>
            ))}
          </div>

          <div className="customization-divider" />

          <div className="customization-items-row">
            {dummyItems.map((item) => (
              <ItemCard
                key={item.id}
                image={item.image}
                name={item.name}
                owned={item.owned}
                equipped={item.equipped}
                selected={selectedItemId === item.id}
                onClick={() => setSelectedItemId(item.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default CustomizationPage;
