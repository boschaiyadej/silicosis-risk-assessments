/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        kanit: ["Kanit", "sans-serif"],
        sarabun: ["Sarabun", "sans-serif"],
      },
      zIndex: {
        "-1": "-1",
        auto: "auto",
        0: "0",
        base: "0",
        docked: "10",
        dropdown: "1000",
        sticky: "1100",
        banner: "1200",
        overlay: "1300",
        modal: "1400",
        popover: "1500",
        skipLink: "1600",
        toast: "1700",
        tooltip: "1800",
      },
      screens: {
        "mobile-sm": "320px",
        mobile: "375px",
        "tablet-sm": "600px",
        tablet: "768px",
        "tablet-lg": "900px",
        laptop: "1024px",
        "laptop-lg": "1280px",
        desktop: "1440px",
        "desktop-lg": "1600px",
        "4k": "2560px",
      },
      colors: {
        primary: "#00afd3",
        "primary-light": "#66d5e2",
        "primary-dark": "#0083a6",
        "primary-content": "#000b10",
        secondary: "#0042ff",
        "secondary-light": "#6a7aff",
        "secondary-dark": "#002bff",
        "secondary-content": "#ccdfff",
        accent: "#fcd34d",
        "accent-light": "#fef6b7",
        "accent-dark": "#e4b800",
        "accent-content": "#100900",
        neutral: "#33232d",
        "neutral-light": "#6e4a56",
        "neutral-dark": "#1f0e14",
        "neutral-content": "#d2ced1",
        "base-100": "#2a2b30",
        "base-100-light": "#4f5159",
        "base-100-dark": "#1e1f24",
        "base-200": "#232428",
        "base-200-light": "#484a4e",
        "base-200-dark": "#1b1d20",
        "base-300": "#1c1d21",
        "base-300-light": "#3b3d41",
        "base-300-dark": "#121315",
        "base-content": "#d0d0d1",
        info: "#007fff",
        "info-light": "#66b3ff",
        "info-dark": "#005bb5",
        "info-content": "#000616",
        success: "#3dea29",
        "success-light": "#6dfc6f",
        "success-dark": "#2d8c1b",
        "success-content": "#011301",
        warning: "#ff8e00",
        "warning-light": "#ffb84d",
        "warning-dark": "#d97a00",
        "warning-content": "#160700",
        error: "#ea3b43",
        "error-light": "#f5a4a4",
        "error-dark": "#c50000",
        "error-content": "#130101",
        "risk-level-0": "#e0f2f1",
        "risk-level-0-light": "#ffffff",
        "risk-level-0-dark": "#c2d0cd",
        "risk-level-0-content": "#004d40",
        "risk-level-1": "#b9fbc0",
        "risk-level-1-light": "#d1f8d2",
        "risk-level-1-dark": "#8acb8d",
        "risk-level-1-content": "#004d40",
        "risk-level-2": "#a2d9b1",
        "risk-level-2-light": "#c5e4c3",
        "risk-level-2-dark": "#7aab85",
        "risk-level-2-content": "#004d40",
        "risk-level-3": "#ffcc00",
        "risk-level-3-light": "#ffe066",
        "risk-level-3-dark": "#e0a700",
        "risk-level-3-content": "#000000",
        "risk-level-4": "#ff9900",
        "risk-level-4-light": "#ffb84d",
        "risk-level-4-dark": "#e68a00",
        "risk-level-4-content": "#000000",
        "risk-level-5": "#ff3300",
        "risk-level-5-light": "#ff6f6f",
        "risk-level-5-dark": "#c60000",
        "risk-level-5-content": "#ffffff",
      },
      boxShadow: {
        sm: "0 1px 2px rgba(0, 0, 0, 0.05)",
        DEFAULT: "0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)",
        md: "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)",
        lg: "0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)",
        xl: "0 20px 25px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.04)",
        "2xl": "0 25px 50px rgba(0, 0, 0, 0.15)",
        inner: "inset 0 2px 4px rgba(0, 0, 0, 0.06)",
        outline: "0 0 0 3px rgba(66, 153, 225, 0.5)",
        none: "none",
      },
      extend: {
        spacing: {
          18: "4.5rem",
          24: "6rem",
          28: "7rem",
        },
        borderRadius: {
          xl: "1.5rem",
          "2xl": "2rem",
        },
      },
    },
    plugins: [],
  },
};
