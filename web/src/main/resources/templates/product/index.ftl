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
    function commitProduct() {
        return;
    }

</script>

<div class="container">
    <div class="page-header"><h1>Sprint Boot: Register</h1></div>
    <form action="/product/upload/confirm" method="post">
        <div class="form-group">

        </div>
        <div class="form-group">
            <label for="name">产品名称</label>
            <input type="text" class="form-control" id="name" name="name" placeholder="Enter name">
            <small id="nameHelp" class="form-text text-muted">We'll never share your info with anyone else.</small>
        </div>
        <div class="form-group">
            <label for="number">产品编号</label>
            <input type="text" class="form-control" id="number" name="number" placeholder="number">
        </div>
        <div class="form-group">
            <label for="pwd">产品类别</label>
            <input type="password" class="form-control" id="pwd" name="pwd" placeholder="Password">
        </div>

        <div class="form-group">
            <label for="telPhone">产品图片</label>
            <input type="file" multiple class="file-loading" class="form-control" id="picture" name="picture" placeholder="picture">
        </div>
        <form>
            <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 class="modal-title" id="myModalLabel">请选择Excel文件</h4>
                        </div>
                        <div class="modal-body">
                            <a class="form-control" style="border:none;">下载导入模板</a>
                            <input type="file" name="txt_file" id="txt_file" multiple class="file-loading" />
                        </div></div>
                </div>
            </div>
        </form>

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
