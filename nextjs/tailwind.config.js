module.exports = {
    content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            spacing: {
                '128': '45rem',
              },
            colors:{
                'darkP':'#201535',
                'grayG':'#1D1F22',
                'videoBg':'#140c2d',
                'header':'#140c2d',

                'upload-btnl':'#e127d2',
                'upload-btnr':'#8129f3',

                'btnl':'#fdcb3a',
                'btnr':'#ed5174',
                'noHover':'#1a1135',

                'footer':'#712af9'
            }

        },
    },
    plugins: [],
}
