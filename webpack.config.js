module.exports = {
    entry: './src/index.js',
    output: {
        filename:'main.js',
        path: __dirname + '/dist'
    },
    resolve:{

    },
    module:{
        loaders:[
            {
                test:/\.js$/,
                loader: 'babel',
                exclude:/node_modules|picker\.data\.js|picker\.js/
            },
            {
                test:/\.css$/,
                loader:'style!css'
            },
            {test: /\.(png|jpg|gif)$/, loader: 'url' },
            {test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/, loader: 'url'}

        ]
    }
}
