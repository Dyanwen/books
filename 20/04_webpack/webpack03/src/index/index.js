import less from '../style/index.less';
import css from '../style/index.css';
import vip from '../images/vip.png'
import axios from 'axios'
/**
 * 国内淘宝源
 * 样式处理 css-loader style-loader
 */

console.log('hello 哇塞')
const img = new Image();
img.src = vip;
let root = document.querySelector("#app")
root.appendChild(img);

console.log('weedasdfas');

axios.get('/api/getUserInfo').then((res) => {
    console.log(res.data)
});

