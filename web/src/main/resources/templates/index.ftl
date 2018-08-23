<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="author" content="xgw">
    <title>Spring Boot - hello</title>
    <link href="//cdn.jsdelivr.net/bootstrap/3.3.6/css/bootstrap.min.css" rel="stylesheet">
    <script src="//cdn.jsdelivr.net/html5shiv/3.7.3/html5shiv.min.js"></script>
    <script src="//cdn.jsdelivr.net/respond/1.4.2/respond.min.js"></script>
</head>
<body>

<script>
    function commitRegister() {

    }
</script>

<div class="container">
    <div class="page-header"><h1>Sprint Boot: Register</h1></div>
    <form action="/login/confirm" method="post">
        <div class="form-group">

        </div>
        <div class="form-group">
            <label for="name">姓名</label>
            <input type="text" class="form-control" id="name" name="name" placeholder="Enter name">
            <small id="nameHelp" class="form-text text-muted">We'll never share your info with anyone else.</small>
        </div>
        <div class="form-group">
            <label for="age">年龄</label>
            <input type="text" class="form-control" id="age" name="age" placeholder="age">
        </div>
        <div class="form-group">
            <label for="telPhone">电话</label>
            <input type="tel" class="form-control" id="telPhone" name="telPhone" placeholder="telPhone">
        </div>
        <div class="form-group">
            <label for="pwd">密码</label>
            <input type="password" class="form-control" id="pwd" name="pwd" placeholder="Password">
        </div>
        <div class="form-group form-check">
            <input type="checkbox" class="form-check-input" id="exampleCheck1">
            <label class="form-check-label" for="exampleCheck1">Check me out</label>
        </div>
        <button type="submit" class="btn btn-primary" onsubmit="commitRegister()">提交</button>
    </form>

</div>
<footer class="footer">
    <div class="container" align="right"><p class="text-muted">©2018 xgw</p></div>
</footer>
<script src="//cdn.jsdelivr.net/ie10-viewport/1.0.0/ie10-viewport.min.js"></script>
<script src="//cdn.jsdelivr.net/jquery/1.12.1/jquery.min.js"></script>
<script src="//cdn.jsdelivr.net/bootstrap/3.3.6/js/bootstrap.min.js"></script>
</body>
</html>
