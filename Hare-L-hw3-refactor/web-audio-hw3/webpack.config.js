// webpack.config.js
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('webpack').Configuration} */
export default {
  mode: 'development', 
  entry: './src/loader.ts', 
  output: {
    filename: 'bundle.js', 
    path: path.resolve(__dirname, 'dist'),
    clean: true            
  },
  resolve: {
    extensions: ['.ts', '.js'], 
  },
  module: {
    rules: [
      {
        test: /\.ts$/,          
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  devtool: 'source-map', 
  target: 'web'          
};