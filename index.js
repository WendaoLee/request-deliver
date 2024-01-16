const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3333;

// 此处输入目标服务器地址
const TARGET_HOST = ""

// 解析 JSON 请求体
app.use(express.json());

app.use(cors())

// 通用的请求转发中间件
const forwardMiddleware = async (req, res) => {

    if(req?.method == 'OPTIONS'){
        console.log(req?.method)
        return res.status(200)
    }
    try {
        // 根据请求的 URL 构建目标 URL
        const targetHost = TARGET_HOST; 
        const targetURL = targetHost + req.originalUrl;

        console.log(`[LOG]The target URL is:${targetURL}`)

        // 发送请求到目标地址
        const response = await axios({
            method: req.method,
            url: targetURL,
            data: req.body,
            headers: req.headers,
        });

        // 将目标地址返回的数据响应给客户端
        return res.status(response.status).json(response.data);
    } catch (error) {
        console.log("status-code",error.response?.status)
        console.log("response-data from remote server:",error.response?.data)
        console.error('转发请求时发生错误:', error.message);
        res.status(500).json({ error: `${error.message},可前往控制台查看相关报错。`,originData:error });
    }
};

// 使用通用中间件处理所有请求
app.use(forwardMiddleware);

// 启动服务器
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

