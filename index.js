var http = require('http')
var fs = require('fs')
var url = require('url')

//console.log(Object.keys(http))
var port = process.env.PORT || 80;

var server = http.createServer(function(request, response){

  var temp = url.parse(request.url, true)
  var path = temp.pathname
  var query = temp.query
  var method = request.method

  //从这里开始看，上面不要看

  if(path === '/'){  // 如果用户请求的是 / 路径
    var string = fs.readFileSync('./qq.html')
    response.setHeader('Content-Type', 'text/html;charset=utf-8')  
    response.end(string)   
  } else if(path === '/qq.html'){
        var string = fs.readFileSync('./qq.html')
        response.setHeader('Content-Type', 'text/html;charset=utf-8')
        response.end(string)
    } else if(path === '/ken.html'){
      var string = fs.readFileSync('./ken.html')
      response.setHeader('Content-Type', 'text/html;charset=utf-8')
      response.end(string)
  }else if(path === '/qq_private.jsonp'){
      var string = fs.readFileSync('./qq_private.jsonp','utf-8')
      response.setHeader('Content-Type', 'application/json;charset=utf-8')
      string=string.replace("{(callback)}",query.callback)
      response.end(string)
  }
  else{
    response.statusCode =404;
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
      var jsonTemp=JSON.stringify(temp);
    response.end(jsonTemp+" "+"\n\r"+path+'找不到对应的路径，你需要自行修改 index.js')
  }

  // 代码结束，下面不要看
  console.log(method + ' ' + request.url)
})

server.listen(port)
console.log('监听 ' + port + ' 成功，请用在空中转体720度然后用电饭煲打开 http://localhost:' + port)
