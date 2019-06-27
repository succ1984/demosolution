if( typeof(bit)=='undefined')    bit ={version:  "1.0.0",created: "2007.07.30"}; 
/***************************************************************
* 验证对象                                                     *
***************************************************************/ 
bit.Regular={ 
    /**
    * 判断输入是否是整数
    * @param {String} strInput 要判断的字符串
    * @return {Boolean} 判断结果
    */
    isInt:function(strInput ){
        return /^\d+$/.test( strInput );
    },
    /**
    * 判断输入是否是浮点数
    * @param {String} strInput 要判断的字符串
    * @return {Boolean} 判断结果
    */
    isFloat:function(strInput ){ 
        return /^\d+\.\d+$/.test(strInput);        
    },
    /**
    * 判断输入是否是email格式
    * @param {String} strInput 要判断的字符串
    * @return {Boolean} 判断结果
    */
    isEmail:function(strInput){
        var re = /^[a-zA-Z\-_.]+@(\S+\.)+[a-zA-Z]{2,4}$/; 
        return re.test(strInput); 
        //^\S*([A-Za-z0-9_\-] (\.\w )*@(\w \.)\w{2,3})\s*$
    },
    /*
    *           
    */
    isMobile:function(strInput){
        return /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test( strInput );
    }  
    //身份证号 座机 网址 
};