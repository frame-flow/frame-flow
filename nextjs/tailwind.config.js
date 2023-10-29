module.exports = {
    content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            spacing: {
                '120':'32rem',
                '126':'37rem',
                '128': '68rem',
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

                'bluebtnl':'#5CC7FA',
                'bluebtnr':'#6C50F9',

                // 'videobtn':'#f2f2f2',
                'videobtn':'#0f0f0f',
                'videobg':'#151719',

                'infol':'#fdce39',
                'infor':'#ed5274',

                'footer':'#712af9'
            }

        },
    },
    plugins: [],
}
