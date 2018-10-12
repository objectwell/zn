const GLOBAL_DEBUG  = false;//是否本地调试，true本地调试,false生产环境
const GLOBAL_PATH_URL = '';//根目录文件路径 /Xiangya-Hospital
let GLOBAL_API_URL  = '';//
if(GLOBAL_DEBUG){
    GLOBAL_API_URL  = 'http://192.168.1.165:8600/sr';  // 测试
}else {
    GLOBAL_API_URL  = 'http://122.207.81.240:8677/sr';  // 生产
}
//后台ajax请求地址
const GLOBAL_AJAX_URL = {
    findStudent:GLOBAL_API_URL+"/student/findStudentInfo", // login 验证学生信息
    token:GLOBAL_API_URL+"/oauth/token?grant_type=password&username=dy&password=123456",  // 登录接口
    saveData:GLOBAL_API_URL+"/student/addResearchAndJson",   // 保存数据
    getAnswer:GLOBAL_API_URL+"/student/queryAnswer"   // 查看结果
}


function make_base_auth(user, password) {
    var tok = user + ':' + password;
    var hash = Base64.encode(tok);
    return "Basic " + hash;
}



