var HtmlWebpackPlugin=require("html-webpack-plugin"),
    OpenBrowserWebpackPlugin=require("open-browser-webpack-plugin"),
    ExtractTextWebpackPlugin=require("extract-text-webpack-plugin"),
    path=require("path")
module.exports={
    entry:{
        index:"./src/js/entry.js"
    },
    devtool: "cheap-source-map",
    devServer:{
        inline:true,
        port:8888
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
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title:"广告模板",
            template:"./src/view/index.html"
        }),
        new OpenBrowserWebpackPlugin({
            url:"http://localhost:8888"
        }),
        new ExtractTextWebpackPlugin("assets/css/index.min.css")
    ]
}