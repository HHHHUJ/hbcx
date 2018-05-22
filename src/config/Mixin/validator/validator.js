import { Toast } from 'mint-ui';
const regularJson = {
    phone: {
        reg: /^(13[0-9]|15[0-9]|17[0-9]|18[0-9]|14[57])[0-9]{8}$/,
        errormsg: '手机号填写错误',
        errormsgNull: '手机号不能为空'
    },
    code: {
        reg: /^\S{6,12}$/,
        errormsg: '密码输入错误',
        errormsgNull: '密码不能为空'
    },
    required: {
        errormsg: '输入项不不能为空'
    }
};

export default {
    methods: {
        handleOnBlur(type, value, errorMsg = null) {
            if (!value) {
                if (type !== 'required') {
                    Toast({message:errorMsg || regularJson[type].errormsgNull,position: 'top'}); 
                } else {
                    Toast({message:errorMsg || regularJson[type].errormsg,position: 'top'});  
                }
                return false;
            } else if (type !== 'required') {
                if (!regularJson[type].reg.test(value)) {
                    Toast({message:errorMsg || regularJson[type].errormsg,position: 'top'});  
                    return false;
                }
            }
            return true;
        }
    }
};
