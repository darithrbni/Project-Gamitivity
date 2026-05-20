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

  equippedHair,
  setEquippedHair,

  equippedClothes,
  setEquippedClothes,
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

  const customizationItems = {
    Rambut: [
      {
        id: 1,
        key: "default",
        name: "Rambut Default",
        image: "https://placehold.co/120x120",
        owned: true,
      },

      {
        id: 2,
        key: "silver",
        name: "Rambut Silver",
        image: "https://placehold.co/120x120",
        owned: true,
      },

      {
        id: 3,
        key: "blue",
        name: "Rambut Biru",
        image: "https://placehold.co/120x120",
        owned: true,
      },
    ],

    Baju: [
      {
        id: 4,
        key: "default",
        name: "Baju Default",
        image: "https://placehold.co/120x120",
        owned: true,
      },

      {
        id: 5,
        key: "blue",
        name: "Hoodie Biru",
        image: "https://placehold.co/120x120",
        owned: true,
      },

      {
        id: 6,
        key: "dark",
        name: "Jaket Hitam",
        image: "https://placehold.co/120x120",
        owned: true,
      },
    ],

    Dinding: [
      {
        id: 7,
        key: "default",
        name: "Dinding Bata",
        image: "https://placehold.co/120x120",
        owned: true,
        equipped: true,
      },
      {
        id: 8,
        key: "pink",
        name: "Wallpaper Pink",
        image: "https://placehold.co/120x120",
        owned: false,
        equipped: false,
      },
    ],

    View: [
      {
        id: 9,
        key: "default",
        name: "Forest",
        owned: true,
      },

      {
        id: 10,
        key: "galaxy",
        name: "Galaxy",
        owned: true,
      },

      {
        id: 11,
        key: "snow",
        name: "Snow",
        owned: true,
      },

      {
        id: 12,
        key: "sunset",
        name: "Sunset",
        owned: true,
      },
    ],

    Meja: [
      {
        id: 13,
        key: "default",
        name: "Meja Kayu",
        image: "https://placehold.co/120x120",
        owned: true,
        equipped: true,
      },
      {
        id: 14,
        key: "gaming",
        name: "Meja Gaming",
        image: "https://placehold.co/120x120",
        owned: false,
        equipped: false,
      },
    ],
  };

  const currentItems = customizationItems[selectedCategory];

  function isItemEquipped(item) {
    if (selectedCategory === "Rambut") {
      return equippedHair === item.key;
    }

    if (selectedCategory === "Baju") {
      return equippedClothes === item.key;
    }

    if (selectedCategory === "Dinding") {
      return equippedWallpaper === item.key;
    }

    if (selectedCategory === "View") {
      return equippedWindowView === item.key;
    }

    if (selectedCategory === "Meja") {
      return equippedDesk === item.key;
    }

    return false;
  }

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
            {currentItems.map((item) => (
              <ItemCard
                key={item.id}
                image={item.image}
                name={item.name}
                owned={item.owned}
                equipped={isItemEquipped(item)}
                selected={selectedItemId === item.id}
                onClick={() => {
                  setSelectedItemId(item.id);

                  if (!item.owned) {
                    return;
                  }

                  // HAIR
                  if (selectedCategory === "Rambut") {
                    setEquippedHair(item.key);
                  }

                  // CLOTHES
                  if (selectedCategory === "Baju") {
                    setEquippedClothes(item.key);
                  }

                  // WALLPAPER
                  if (selectedCategory === "Dinding") {
                    setEquippedWallpaper(item.key);
                  }

                  // WINDOW VIEW
                  if (selectedCategory === "View") {
                    setEquippedWindowView(item.key);
                  }

                  // DESK
                  if (selectedCategory === "Meja") {
                    setEquippedDesk(item.key);
                  }
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default CustomizationPage;
