module.exports = {
  plugins: [
    require('@tailwindcss/typography'),
    require('daisyui')
  ],
  // daisyUI config (optional)
  daisyui: {
    styled: true,
    // themes: true,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: "dark",
    themes: [
      {
        "sherlock": {
          primary: "#8b0000",
          secondary: "#000080",
          accent: "#ffd700",
          neutral: "#f5f5f5",//"#3d4451",
          "base-100": "#ffffff"        
        }
      },
      "dark"
    ]
  }
}