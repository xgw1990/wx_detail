package cn.com.detail.wx.utils;

/**
 * 定义常量
 */
public class Constants {

    public static final String COMMON_YES = "1";//通用标识 1 是
    public static final String COMMON_NO = "0";//通用标识 0 否

    public static final String COMMON_STATUS_VALID = "0";//状态通用标识 0 有效
    public static final String COMMON_STATUS_INVALID = "1";//状态通用标识 1 无效


    public static final String RPC_RESP_STATUS_VAR = "s";
    public static final String RPC_RESP_REASON_VAR = "r";

    public static final byte EMPLOYEE_STATUS_ON_DUTY = 0;//在职
    public static final byte EMPLOYEE_STATUS_ON_UNDUTY = 1;//离职

    /** 可结单工单Tab页对应标识 **/
    public static final String PATH_SEPARATOR_FOR_HTML = "θ";

    /** 是否已经加载了列设置 Cookie  Key **/
    public static final String IS_LOAD_COLUMN_PREFER_KEY = "IS_LOAD_COLUMN_PREFER_KEY";

    /** 是否存在未处理的系统 通知 **/
    public static final String UN_HANDLED_NOTIFICATION_KEY = "UN-NOTIFICATION";
    public static final String UN_HANDLED_NOTIFICATION_VALUE = "Y";

    /** 非必填 **/
    public static final byte FIELD_RESTRICT_NONE = 0;
    /** 必填后可补 **/
    public static final byte FIELD_RESTRICT_LATER = 1;
    /** 必填 **/
    public static final byte FIELD_RESTRICT_MUST = 2;

    /** 注塑 */ public static final byte CRAFT_TYPE_ZHUSU = 0;
    /** 油压 */ public static final byte CRAFT_TYPE_YOUYA = 1;
    /** 组装 */ public static final byte CRAFT_TYPE_ASSEMBLE = 2;
    /** 印刷 */ public static final byte CRAFT_TYPE_PRINT = 3;
    /** 电压 */ public static final byte CRAFT_TYPE_VOLTAGE = 4;
    /** 针车 */ public static final byte CRAFT_TYPE_STITCHING = 5;
    /** 可塑 */ public static final byte CRAFT_TYPE_BLISTER = 6;

    /** 正式记录 */
    public static final String APPROVAL_FORMAL = "0";
    /** 审批记录 */
    public static final String APPROVAL_RECORD = "1";

    /** 草稿 */
    public static final byte APPROVAL_STATE_DRAFT = 0;
    /** 新增待审批 */
    public static final byte APPROVAL_STATE_NEW_PENDING = 1;
    /** 新增审批不通过 */
    public static final byte APPROVAL_STATE_NEW_REJECT = 2;
    /** 变更待审批 */
    public static final byte APPROVAL_STATE_EDIT_PENDING = 3;
    /** 变更审批不通过*/
    public static final byte APPROVAL_STATE_EDIT_REJECT = 4;
    /** 审批通过归档 */
    public static final byte APPROVAL_STATE_ARCHIVED = 5;
    /** 启用待审批 */
    public static final byte APPROVAL_STATE_ENABLE_PENDING = 6;
    /** 禁用待审批 */
    public static final byte APPROVAL_STATE_DISABLE_PENDING = 7;

    /** 审批通过 */
    public static final byte APPROVAL_ACTION_APPROVE = 1;
    /** 审批不通过 */
    public static final byte APPROVAL_ACTION_REJECT = 0;

    public static String getCraftShortName(int craft) {
        switch (craft) {
            case CRAFT_TYPE_ZHUSU: return "ZS";
            case CRAFT_TYPE_YOUYA: return "YY";
            case CRAFT_TYPE_ASSEMBLE: return "ZZ";
            case CRAFT_TYPE_PRINT: return "YS";
            case CRAFT_TYPE_VOLTAGE: return "DY";
            case CRAFT_TYPE_STITCHING: return "ZC";
            case CRAFT_TYPE_BLISTER: return "XS";
            default: return "UNKNOWN";
        }
    }
}
