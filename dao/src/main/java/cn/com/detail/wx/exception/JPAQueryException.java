package cn.com.detail.wx.exception;

import cn.com.detail.wx.utils.ErrorCode;

import java.sql.SQLException;

public class JPAQueryException extends BaseException {

    public short getErrorCode() {
        return ErrorCode.JPA_DATA_ACCESS_ERROR;
    }

    public JPAQueryException(String message) {
        super(message);
    }

    public JPAQueryException(String message, Throwable e) {
        super(message + ": " + e.getMessage(), e);
    }

    @Override
    public String getMessage() {
        Throwable bestCause = findBestCause(this);
        if(bestCause != null && bestCause != this)
            return String.format("Database Access Error: %s : %s",
                    bestCause.getClass().getSimpleName(), bestCause.getMessage());
        else return String.format("Database Access Error : %s", super.getMessage());
    }

    public static Throwable findBestCause(Throwable e) {
        Throwable best = e;
        Throwable cause = e;
        int it = 0;
        while ((cause = cause.getCause()) != null && it++ < 10) {
            if (cause instanceof ClassCastException) {
                best = cause;
                break;
            }
            if (cause instanceof SQLException) {
                best = cause;
                break;
            }
        }
        return best;
    }
}

