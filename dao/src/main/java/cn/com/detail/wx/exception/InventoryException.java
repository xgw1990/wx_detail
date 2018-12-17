package cn.com.detail.wx.exception;

public class InventoryException extends BaseException {

    private short errorCode;

    public InventoryException(short errorCode, String message) {
        super(message);
        this.errorCode = errorCode;
    }

    public InventoryException(short errorCode, String message, Throwable e) {
        super(message + ": " + e.getMessage(), e);
        this.errorCode = errorCode;
    }

    public InventoryException(String message, Throwable e) {
        super(message + ": " + e.getMessage(), e);
    }

    @Override
    public short getErrorCode() {
        return errorCode;
    }
}

