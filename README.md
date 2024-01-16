# README
- 一个简单的代理转发脚本，用于转发请求到远程服务机上。
> Deliver your request to another remote server.

e.g.
```TEXT
remote:'http://foo/api/register' -- not support CORS or method OPTIONS (may cause CORS error msg in browser console)
your-request:'http://localhost:3000/foo/api/register' -- will deliver your request to 'http://foo/api/register'
```

- 如何使用？
> how to use

1.Change `TARGET_HOST` and `PORT`(if you need) in `index.js`
2.`node index.js`