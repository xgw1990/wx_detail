package cn.com.detail.wx.utils;

/**
 * 定义常量
 */
public class Constants {

    public static final String PATH_SEPARATOR_FOR_HTML = "θ";

    /** 是否已经加载了列设置 Cookie  Key **/
    public static final String IS_LOAD_COLUMN_PREFER_KEY = "IS_LOAD_COLUMN_PREFER_KEY";

    /** 是否存在未处理的系统 通知 **/
    public static final String UN_HANDLED_NOTIFICATION_KEY = "UN-NOTIFICATION";
    public static final String UN_HANDLED_NOTIFICATION_VALUE = "Y";

    // POPropertyField Constant
    /** 非必填 **/
    public static final byte FIELD_RESTRICT_NONE = 0;
    /** 必填后可补 **/
    public static final byte FIELD_RESTRICT_LATER = 1;
    /** 必填 **/
    public static final byte FIELD_RESTRICT_MUST = 2;

    // POPropertyField Constant-----------------------------------
    /** 属性字段类别 文本框 **/
    public static final byte PO_PROPERTY_FIELD_TYPE_TEXT = 0;
    /** 属性字段类别 数字 **/
    public static final byte PO_PROPERTY_FIELD_TYPE_NUMBER = 1;
    /** 属性字段类别 日期 **/
    public static final byte PO_PROPERTY_FIELD_TYPE_DATE = 2;
    /** 属性字段类别 对照表 **/
    public static final byte PO_PROPERTY_FIELD_TYPE_NG_LEAGUE = 3;
    /** 属性字段类别 网版信息 **/
    public static final byte PO_PROPERTY_FIELD_TYPE_PRINT_STENCIL = 4;
    /** 属性字段类别 附件信息 **/
    public static final byte PO_PROPERTY_FIELD_TYPE_ATTACHMENT = 5;
    /** 属性字段类别 品号 **/
    public static final byte PO_PROPERTY_FIELD_TYPE_NG_PRODUCT = 6;
    /** 属性字段类别 模具 **/
    public static final byte PO_PROPERTY_FIELD_TYPE_MOLD = 7;
    /** 属性字段类别 基础选项 (NGGeneralDictionary) **/
    public static final byte PO_PROPERTY_FIELD_TYPE_GENERAL_DICTIONARY = 10;
    /** 属性字段类别 多行文本框 **/
    public static final byte PO_PROPERTY_FIELD_TYPE_TEXT_AREA = 11;
    /** 属性字段类别 选项文本框 **/
    public static final byte PO_PROPERTY_FIELD_TYPE_DICT_TEXT = 12;


    /** 注塑 */ public static final byte CRAFT_TYPE_ZHUSU = 0;
    /** 油压 */ public static final byte CRAFT_TYPE_YOUYA = 1;
    /** 组装 */ public static final byte CRAFT_TYPE_ASSEMBLE = 2;
    /** 印刷 */ public static final byte CRAFT_TYPE_PRINT = 3;
    /** 电压 */ public static final byte CRAFT_TYPE_VOLTAGE = 4;
    /** 针车 */ public static final byte CRAFT_TYPE_STITCHING = 5;
    /** 可塑 */ public static final byte CRAFT_TYPE_BLISTER = 6;

    /** 可结单工单Tab页对应标识 **/
    /** 1 申请结单审批 **/
    public static final String WORK_ORDER_CAN_END_TAB_TYPE_1 = "1";
    /** 2:同意结单工单 **/
    public static final String WORK_ORDER_CAN_END_TAB_TYPE_2 = "2";
    /** 3:机台完工工单 **/
    public static final String WORK_ORDER_CAN_END_TAB_TYPE_3 = "3";
    /** 4:机台已填报工单 **/
    public static final String WORK_ORDER_CAN_END_TAB_TYPE_4 = "4";

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

    public static final String EMPLOYEE_HAS_DEPT = "0";//员工已分配部门
    public static final String EMPLOYEE_HAS_NO_DEPT = "1";//员工未分配部分

    public static final String COMMON_STATUS_VALID = "0";//状态通用标识 0 有效
    public static final String COMMON_STATUS_INVALID = "1";//状态通用标识 1 无效

    public static final String COMMON_YES = "1";//通用标识 1 是
    public static final String COMMON_NO = "0";//通用标识 0 否

    public static final String RPC_RESP_STATUS_VAR = "s";
    public static final String RPC_RESP_REASON_VAR = "r";

    public static final byte EMPLOYEE_STATUS_ON_DUTY = 0;//在职
    public static final byte EMPLOYEE_STATUS_ON_UNDUTY = 1;//离职

    public static final int TASK_TYPE_ROOT = 0;//根任务，机台
    public static final int TASK_TYPE_NORMAL = 1;//制程节点
    public static final int TASK_TYPE_END = 2;//结束任务

    public static final int PROC_MOVEMENT_STATUS_DRAFT = 0;//冲账记录状态-草稿
    public static final int PROC_MOVEMENT_STATUS_PENDING = 1;//冲账记录状态-待审批
    public static final int PROC_MOVEMENT_STATUS_REJECT = -1;//冲账记录状态-拒绝
    public static final int PROC_MOVEMENT_STATUS_EFFECT = 2;//冲账记录状态-生效

    public static final String ASYNC_TASK_SYNC_ERP_DATA = "async_task_sync_erp_data";
    public static final String ASYNC_TASK_ARRANGE_SCHEDULING_ORDERS = "async_task_arrange_scheduling_orders";
    public static final String ASYNC_TASK_ARRANGE_ALL_SCHEDULING_ORDERS = "async_task_arrange_all_scheduling_orders";
    public static final String ASYNC_TASK_SYNC_ERP_PRODUCT = "async_task_sync_erp_product";
    public static final String ASYNC_TASK_GENERATE_IMPORTED_BOM = "async_task_generate_imported_bom";
    public static final String ASYNC_TASK_VALIDATE_ENGINEERING_DATA = "async_task_validate_engineering_data";
    public static final String ASYNC_TASK_SYNC_PRODUCT_BOM_DIFF_DATA = "async_task_sync_product_bom_diff_data";
    public static final String ASYNC_TASK_SHELL = "async_task_proofhead";
    public static final String ASYNC_TASK_EVENT_PUBLISHMENT = "async_task_event_publishment";
    public static final String ASYNC_TASK_UPDATE_PROCESSING_TASK_COMPLETED = "async_task_update_processing_task_completed";
    public static final String ASYNC_TASK_CHECK_END_PRODUCT_ENTERING = "async_task_check_end_product_entering";
    public static final String ASYNC_TASK_GENERATE_REGRIND_MATERIAL_CODE = "async_task_generate_regrind_material_code";
    public static final String ASYNC_TASK_SYNC_INV_ERP_MOVEMENT = "async_task_sync_inv_erp_movement";
    public static final String ASYNC_TASK_ESTIMATE_REGRIND_MATERIAL = "async_task_estimate_regrind_material";
    public static final String ASYNC_TASK_SENT_PIWIK_REQUEST = "async_task_sent_piwik_request";

    public static final int FEEDBACK_STATUS_TODO = 0;//反馈处理状态-待处理
    public static final int FEEDBACK_STATUS_ONGOING = 1;//反馈处理状态-待审批
    public static final int FEEDBACK_STATUS_DONE = 2;//反馈处理状态-拒绝
    public static final int FEEDBACK_STATUS_IGNORED = 3;//反馈处理状态-无效

    public static final String ROOT_LEAGUE_CATALOG_GROUP = "G0001"; //产品大类对照表的group

    /** 工程资料统一状态-启用 */
    public static final byte NG_ENABLED = 0;
    /** 工程资料统一状态-禁用 */
    public static final byte NG_DISABLED = 1;

    /** 工程资料校验发布状态-待发布 */
    public static final byte NG_DIAG_FOR_PUBLISH = 0;
    /** 工程资料校验发布状态-已发布 */
    public static final byte NG_DIAG_PUBLISHED = 1;
    /** 工程资料校验发布状态-待完善 */
    public static final byte NG_DIAG_DEFECT = 2;
    /** 工程资料校验发布状态-待修复 */
    public static final byte NG_DIAG_BROKEN = 3;

    /** BOM特征索引冗余DUMP1 */ public static final byte IMPORTED_PRODUCT_BOM_DUMP1 = 0;
    /** BOM特征索引冗余DUMP2 */ public static final byte IMPORTED_PRODUCT_BOM_DUMP2 = 1;
    /** BOM特征索引冗余DUMP3 */ public static final byte IMPORTED_PRODUCT_BOM_DUMP3 = 2;
    /** BOM特征索引冗余DUMP4 */ public static final byte IMPORTED_PRODUCT_BOM_DUMP4 = 3;

    /** 网版状态-在库   */ public static final byte STENCIL_AVAILABLE = 0;
    /** 网版状态-待修复 */ public static final byte STENCIL_NEED_REPAIRING = 1;
    /** 网版状态-已领用 */ public static final byte STENCIL_OCCUPIED = 2;

    /** 网版开发任务状态-待开发     */ public static final byte STENCIL_TASK_NOTFINISH = 0;
    /** 网版开发任务状态-开发完成   */ public static final byte STENCIL_TASK_FINISHED = 1;

    /** 缩略图宽 */ public static final int ATTACHMENT_THUMBNAIL_WIDTH = 128;
    /** 缩略图高 */ public static final int ATTACHMENT_THUMBNAIL_HEIGHT = 128;
    /** 预览图宽 */ public static final int ATTACHMENT_PREVIEW_WIDTH = 512;
    /** 预览图宽 */ public static final int ATTACHMENT_PREVIEW_HEIGHT = 512;

    /** 装配工艺 */ public static final byte PROCESS_LINE_ASSEMBLE_CRAFT = 127;
    /** 包装工艺 */ public static final byte PROCESS_LINE_PACKAGE_CRAFT = 126;
    /** 其它工艺 */ public static final byte PROCESS_LINE_OTHER_CRAFT = 125;
    /** 印刷工艺 */ public static final byte PROCESS_LINE_PRINT_CRAFT = 124;

    /** 订单成本类型 业务 **/
    public static final byte PO_COST_TYPE_BIZ = 0;
    /** 订单成本类型 工程 **/
    public static final byte PO_COST_TYPE_ENG = 1;
    /** 订单成本类型 生产 **/
    public static final byte PO_COST_TYPE_PRODUCTION = -1;
    /** 订单成本类型 样品采购 **/
    public static final byte PO_COST_TYPE_PURCHASE = 2;

    /** 生产成本品号费用编码 **/
    public static final String PO_COST_ITEM_PRODUCT_COST_CODE = "product_cost";
    /** 生产成本型号费用编码 **/
    public static final String PO_COST_ITEM_PRODUCT_TYPE_COST_CODE = "product_type_cost";

    /** DIFF工具比对  比对通过 */
    public static final String DIFF_RESULT_SAME = "0";
    /** DIFF工具比对  只有ERP记录 */
    public static final String DIFF_RESULT_ONLY_ERP = "1";
    /** DIFF工具比对  只有ATS记录 */
    public static final String DIFF_RESULT_ONLY_ATS = "2";
    /** DIFF工具比对  比对不一致 */
    public static final String DIFF_RESULT_DIFF = "3";

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
