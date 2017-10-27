var HtmlWebpackPlugin=require("html-webpack-plugin"),
    ExtractTextWebpackPlugin=require("extract-text-webpack-plugin"),
    path=require("path"),
    webpack=require("webpack");
module.exports={
    entry:{
        index:"./src/js/entry.js"
    },
    output:{
        path:path.resolve(__dirname,"..","dest"),
        filename: "assets/js/[name].min.js"
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use: ExtractTextWebpackPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader!postcss-loader"
                })
            },
            {
                test:/\.less$/,
                use: ExtractTextWebpackPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader!postcss-loader!less-loader"
                })
            },
            {
                test:/\.js$/,
                loaders:"babel-loader",
                query: {
                    presets: ['es2015-loose']
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title:"广告模板",
            template:"./src/view/index.html"
        }),
        new ExtractTextWebpackPlugin("assets/css/index.min.css"),
        new webpack.DefinePlugin({
            DOMAIN:JSON.stringify("http://uad3.369.com")
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress:{
                warnings: false,
                drop_debugger: true,
                drop_console: true
            }
        })
    ]
}