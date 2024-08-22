/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    prefix: "",
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            colors: {
                "color-1": "#282c3f",
                "color-2": "#fc8019",
                "color-3": "rgba(2, 6, 12, 0.75)",
                "color-4": "rgba(2, 6, 12, 0.6)",
                "color-5": "#93959f",
                "color-6": "#535665",
                "color-7": "#e9e9eb",
                "color-8": "#7e808c",
                "color-9": "#3e4152",
                "color-10": "rgba(40, 44, 63, .45)",
                "color-11": "#60b246",
            },
            fontFamily: {
                GrotThin: ["Grotesque Pro Thin"],
                GrotReg: ["Grotesque Pro Reg"],
                GrotMed: ["Grotesque Pro Med"],
                GrotBold: ["Grotesque Pro Bold"],
                GrotBlack: ["Grotesque Pro Black"],
                ProximaNovaThin: ["ProximaNova Condensed Thin"],
                ProximaNovaMed: ["ProximaNova Condensed Med"],
                ProximaNovaSemiBold: ["ProximaNova Condensed SemiBold"],
                ProximaNovaBold: ["ProximaNova Condensed Bold"],
                ProximaNovaBlack: ["ProximaNova Condensed Black"],
            },
            keyframes: {
                "accordion-down": {
                    from: { height: "0" },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: "0" },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
            },
        },
    },
    plugins: [
        require("tailwindcss-animate"),
        require("tailwind-scrollbar-hide"),
    ],
};
