module.exports = {
  purge: [
    'src/**/*.js',
    'src/**/*.jsx',
    'src/**/*.ts',
    'src/**/*.tsx',
    'public/**/*.html',
  ],
  theme: {
    extend: {
      colors: {
        liquid: {
          navy: '#031422',
          blue: '#0C223E',
          white: '#FFFFFF',
          darkgold: '#AD9742',
          lightgold: '#C4BA40'
        }
      },
    	fontFamily: {
    		stencil: ["Allerta Stencil", "sans-serif"]
    	}
    },
  },
  variants: {},
  plugins: [],
}


