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
                loader: 'babel'
            }
        ]
    }
}
