package cn.com.detail.wx.exception;

import cn.com.detail.wx.utils.Checker;
import com.sun.org.apache.xalan.internal.xsltc.compiler.util.ErrorMsg;

import java.util.List;
import java.util.stream.Collectors;

public class ValidationException extends RuntimeException {

    private List<ErrorMsg> errors;

    public ValidationException(List<ErrorMsg> errors) {
        this.errors = errors;
    }

    public List<ErrorMsg> getErrors() {
        return errors;
    }

    @Override
    public String getMessage() {
        if (!Checker.isEmpty(errors)) {
            return errors.stream().map(ErrorMsg::toString).collect(Collectors.joining("\n"));
        } else return super.getMessage();
    }
}

