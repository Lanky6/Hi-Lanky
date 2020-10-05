// 引包
const https = require('https')
const fs = require('fs')

// xhr 请求地址
const url = 'https://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&nc=1586183781119&pid=hp&uhd=1&uhdwidth=2880&uhdheight=1620'

// 获取当天高清图
const getToday = ()=>{
    // 发送请求
    https.get(url, res => {
        let rawData = '';
        res.on('data', (chunk) => {
            rawData += chunk;
        })
    
        res.on('end', () => {
            const parsedData = JSON.parse(rawData);
            let img = parsedData.images[0]
            let {url, enddate, copyright} = img;
            // 通过正则，将图片链接改为超高清版
            let link = url.match(/.*?(?=&)/)
            console.log(`https://cn.bing.com${link}`)
            // 因为服务器比较小，只是保存链接地址，后续可以读取保存图片
            fs.readFile(`./bing-pics.json`, 'utf8', (err, data) => {
                let res = JSON.parse(data)
                res.push({
                    "date": `${enddate}`,
                    "link": `https://cn.bing.com${link}`,
                    "copyright":copyright
                })
                fs.writeFile(`./bing-pics.json`, JSON.stringify(res), 'utf8', (err) => {})
            })
        })
    
    })
}
// 每天执行一遍
setInterval(getToday, 24*60*60*1000)