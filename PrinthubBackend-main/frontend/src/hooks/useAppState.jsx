import { createContext, useContext, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { companyOrders, companySavedDesigns, mockDesigns } from "../services/mockData";
import { useDarkMode } from "./useDarkMode";

const AppStateContext = createContext(null);

const starterUser = {
  name: "Designer Account",
  email: "designer@printdesignhub.com",
  role: "designer"
};

function sanitizeLegacyUser(user) {
  if (!user) {
    return null;
  }

  if (user.name === "Olivia Stone" || user.email === "olivia@printdesignhub.com") {
    return {
      ...user,
      name: "Designer Account",
      email: "designer@printdesignhub.com"
    };
  }

  if (user.name === "Northwind Packaging" || user.email === "procurement@northwind.com") {
    return {
      ...user,
      name: "Company Account",
      email: "company@printdesignhub.com"
    };
  }

  return user;
}

export function AppStateProvider({ children }) {
  const { theme, toggleTheme } = useDarkMode();
  const [currentUser, setCurrentUser] = useState(() => {
    const storedUser = localStorage.getItem("pdh_user");
    const parsedUser = storedUser ? JSON.parse(storedUser) : null;
    const sanitizedUser = sanitizeLegacyUser(parsedUser);

    if (sanitizedUser) {
      localStorage.setItem("pdh_user", JSON.stringify(sanitizedUser));
    }

    return sanitizedUser;
  });
  const [savedDesignIds, setSavedDesignIds] = useState(() => {
    const stored = localStorage.getItem("pdh_saved");
    return stored ? JSON.parse(stored) : companySavedDesigns;
  });
  const [purchasedDesignIds, setPurchasedDesignIds] = useState(() => {
    const stored = localStorage.getItem("pdh_purchased");
    return stored ? JSON.parse(stored) : ["pdh-001", "pdh-003"];
  });
  const [designerUploads, setDesignerUploads] = useState(() => {
    const stored = localStorage.getItem("pdh_uploads");
    return stored ? JSON.parse(stored) : mockDesigns.slice(0, 3);
  });
  const [cartItems, setCartItems] = useState(() => {
    const stored = localStorage.getItem("pdh_cart");
    return stored ? JSON.parse(stored) : [];
  });

  const persist = (key, value) => localStorage.setItem(key, JSON.stringify(value));

  const login = (user) => {
    setCurrentUser(user);
    localStorage.setItem("pdh_user", JSON.stringify(user));
    toast.success(`Signed in as ${user.role}`);
  };

  const quickLogin = (role = "designer") => {
    const user = {
      ...starterUser,
      role,
      name: role === "designer" ? "Designer Account" : "Company Account",
      email: role === "designer" ? "designer@printdesignhub.com" : "company@printdesignhub.com"
    };
    login(user);
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("pdh_user");
    localStorage.removeItem("pdh_token");
    toast.success("Logged out");
  };

  const toggleSaveDesign = (designId) => {
    setSavedDesignIds((current) => {
      const exists = current.includes(designId);
      const next = exists ? current.filter((id) => id !== designId) : [...current, designId];
      persist("pdh_saved", next);
      toast.success(exists ? "Removed from saved" : "Saved to company collection");
      return next;
    });
  };

  const purchaseDesign = (designId) => {
    setPurchasedDesignIds((current) => {
      if (current.includes(designId)) {
        return current;
      }
      const next = [...current, designId];
      persist("pdh_purchased", next);
      toast.success("Design added to purchases");
      return next;
    });
  };

  const addToCart = (design) => {
    setCartItems((current) => {
      const existing = current.find((item) => item.designId === (design._id || design.id));

      const next = existing
        ? current.map((item) =>
            item.designId === (design._id || design.id)
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [
            ...current,
            {
              designId: design._id || design.id,
              title: design.title,
              price: Number(design.price),
              image: design.imageUrl,
              designer:
                design.designer?.firstName
                  ? `${design.designer.firstName} ${design.designer.lastName || ""}`.trim()
                  : "Designer",
              quantity: 1
            }
          ];

      persist("pdh_cart", next);
      toast.success(existing ? "Cart quantity updated" : "Added to cart");
      return next;
    });
  };

  const removeFromCart = (designId) => {
    setCartItems((current) => {
      const next = current.filter((item) => item.designId !== designId);
      persist("pdh_cart", next);
      toast.success("Removed from cart");
      return next;
    });
  };

  const updateCartQuantity = (designId, quantity) => {
    setCartItems((current) => {
      const next = current
        .map((item) =>
          item.designId === designId ? { ...item, quantity: Math.max(1, quantity) } : item
        )
        .filter((item) => item.quantity > 0);
      persist("pdh_cart", next);
      return next;
    });
  };

  const clearCart = () => {
    setCartItems([]);
    persist("pdh_cart", []);
    toast.success("Cart cleared");
  };

  const addUploadedDesign = (design) => {
    setDesignerUploads((current) => {
      const next = [design, ...current];
      persist("pdh_uploads", next);
      return next;
    });
  };

  const removeUploadedDesign = (designId) => {
    setDesignerUploads((current) => {
      const next = current.filter((design) => (design._id || design.id) !== designId);
      persist("pdh_uploads", next);
      toast.success("Design deleted");
      return next;
    });
  };

  const value = useMemo(
    () => ({
      theme,
      toggleTheme,
      currentUser,
      login,
      quickLogin,
      logout,
      savedDesignIds,
      toggleSaveDesign,
      purchasedDesignIds,
      purchaseDesign,
      cartItems,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,
      designerUploads,
      addUploadedDesign,
      removeUploadedDesign,
      companyOrders
    }),
    [theme, currentUser, savedDesignIds, purchasedDesignIds, designerUploads, cartItems]
  );

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState() {
  const context = useContext(AppStateContext);

  if (!context) {
    throw new Error("useAppState must be used within AppStateProvider");
  }

  return context;
}
