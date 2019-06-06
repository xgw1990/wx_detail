<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="author" content="xgw">
    <title>I am okay</title>
    <#--<link href="//cdn.jsdelivr.net/bootstrap/3.3.6/css/bootstrap.min.css" rel="stylesheet">-->
    <#--<script src="//cdn.jsdelivr.net/html5shiv/3.7.3/html5shiv.min.js"></script>-->
    <#--<script src="//cdn.jsdelivr.net/respond/1.4.2/respond.min.js"></script>-->


    <#--<link rel="stylesheet" media="screen" href="/stylesheets/bootstrap.min.css">-->
    <#--<link rel="stylesheet" media="screen" href="/stylesheets/toastr.min.css">-->
    <#--<link rel="stylesheet" media="screen" href="/stylesheets/jquery-ui.min.css">-->
    <#--<link rel="stylesheet" href="/stylesheets/bootstrap-drawer.min.css"/>-->
    <#--<link rel="stylesheet" media="screen" href="/stylesheets/jquery.contextMenu.min.css">-->

    <#--<link rel="stylesheet" media="screen" href="/stylesheets/main.css">-->
    <#--<script src="/javascripts/jquery-ui-1.11.4.min.js" type="text/javascript"></script>-->
    <#--<script src="/javascripts/jquery-1.11.2.min.js" type="text/javascript"></script>-->
    <#--<script src="/javascripts/bootstrap.min.js" type="text/javascript"></script>-->
    <#--<script src="/javascripts/toastr.min.js" type="text/javascript"></script>-->
    <#--<script src="/javascripts/date.js" type="text/javascript"></script>-->
    <#--<script src="/javascripts/jquery.cookie.js" type="text/javascript"></script>-->
    <#--<script src="/javascripts/commons.js" type="text/javascript"></script>-->
    <#--<script src="/javascripts/jquery.messager.js" type="text/javascript"></script>-->
    <#--<script src="/javascripts/drawer.min.js" type="text/javascript"></script>-->
    <#--<script src="/javascripts/typeahead.bundle.min.js" type="text/javascript"></script>-->
    <#--<script src="/javascripts/jquery.contextMenu.min.js" type="text/javascript"></script>-->


    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>

</head>
<body>
<#--<#import "/spring.ftl" as spring />-->

<script>

    $(function () {
        $('#v-tab a').on('shown.bs.tab', function (e) {
            var contentTarget = $($(e.target).attr("href"));
            contentTarget.load(contentTarget.attr('source'));
            var relatedTarget = $($(e.relatedTarget).attr("href"));
            if (relatedTarget) relatedTarget.empty();
        });
        $('#v-tab a').click(function (e) {
            e.preventDefault();
            $(this).tab('show');
//            this.style="background-color: white"
        });
        $('#v-tab a:first').tab('show');
//        $('#v-tab a:first').style="background-color: white"
    });


</script>

<div class="container">
    <#-- common head : up -->
    <div class="page-header">
        <h1>Sprint Boot: Register</h1>
    </div>

    <div class="row">
        <#-- common menu : left -->
        <div class="col-2">
            <div class="nav flex-column nav-pills" id="v-tab" role="tablist" aria-orientation="vertical">
                <a class="nav-link active" id="v-home-tab" data-toggle="pill" href="#v-home" role="tab" aria-controls="v-home" aria-selected="true">首页</a>
                <div>
                    <a id="v-product-home" role="tab" aria-selected="false">商品</a>
                    <a class="nav-link column-resize-line col-6" id="v-product-tab" data-toggle="pill" href="#v-product" role="tab" aria-controls="v-product" aria-selected="false">商品管理</a>
                    <a class="nav-link column-resize-line col-6" id="v-category-tab" data-toggle="pill" href="#v-category" role="tab" aria-controls="v-category" aria-selected="false">分类管理</a>
                </div>
                <a class="nav-link" id="v-messages-tab" data-toggle="pill" href="#v-messages" role="tab" aria-controls="v-messages" aria-selected="false">订单</a>
                <a class="nav-link" id="v-customer-tab" data-toggle="pill" href="#v-customer" role="tab" aria-controls="v-customer" aria-selected="false">客户</a>
                <a class="nav-link" id="v-settings-tab" data-toggle="pill" href="#v-settings" role="tab" aria-controls="v-settings" aria-selected="false">设置</a>
            </div>
        </div>
        <#-- content : right -->
        <div class="col-10">
            <div class="tab-content" id="v-tabContent">
                <div class="tab-pane fade show active" id="v-home" role="tabpanel" aria-labelledby="v-home-tab" source="/login/home">首页</div>
                <div class="tab-pane fade" id="v-product" role="tabpanel" aria-labelledby="v-product-tab" source="/login/product">商品管理</div>
                <div class="tab-pane fade" id="v-category" role="tabpanel" aria-labelledby="v-category-tab" source="/login/category">分类管理</div>
                <div class="tab-pane fade" id="v-messages" role="tabpanel" aria-labelledby="v-messages-tab" source="/login/messages">订单</div>
                <div class="tab-pane fade" id="v-customer" role="tabpanel" aria-labelledby="v-customer-tab" source="/login/customer">客户</div>
                <div class="tab-pane fade" id="v-settings" role="tabpanel" aria-labelledby="v-settings-tab" source="/login/settings">设置</div>
            </div>
        </div>
    </div>

    <#-- content : right -->
    <#--<div class="container" id="content">-->
        <#--<form action="/login/confirm" method="post">-->
            <#--<div class="form-group">-->
                <#--<label for="name">姓名</label>-->
                <#--<input type="text" class="form-control" id="name" name="name" placeholder="Enter name">-->
                <#--<small id="nameHelp" class="form-text text-muted">We'll never share your info with anyone else.</small>-->
            <#--</div>-->
            <#--<div class="form-group">-->
                <#--<label for="age">年龄</label>-->
                <#--<input type="text" class="form-control" id="age" name="age" placeholder="age">-->
            <#--</div>-->
            <#--<div class="form-group">-->
                <#--<label for="telPhone">电话</label>-->
                <#--<input type="tel" class="form-control" id="telPhone" name="telPhone" placeholder="telPhone">-->
            <#--</div>-->
            <#--<div class="form-group">-->
                <#--<label for="pwd">密码</label>-->
                <#--<input type="password" class="form-control" id="pwd" name="pwd" placeholder="Password">-->
            <#--</div>-->
            <#--<div class="form-group form-check">-->
                <#--<input type="checkbox" class="form-check-input" id="exampleCheck1">-->
                <#--<label class="form-check-label" for="exampleCheck1">Check me out</label>-->
            <#--</div>-->
            <#--<button type="submit" class="btn btn-primary" onsubmit="commitRegister()">提交</button>-->
        <#--</form>-->
    <#--</div>-->

</div>

<#-- common head : down -->
<footer class="footer">
    <div class="container" align="right"><p class="text-muted">©2018 xgw</p></div>
</footer>

<script src="//cdn.jsdelivr.net/ie10-viewport/1.0.0/ie10-viewport.min.js"></script>
<script src="//cdn.jsdelivr.net/jquery/1.12.1/jquery.min.js"></script>
<script src="//cdn.jsdelivr.net/bootstrap/3.3.6/js/bootstrap.min.js"></script>
</body>
</html>
