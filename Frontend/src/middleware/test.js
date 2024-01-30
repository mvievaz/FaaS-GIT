let test = JSON.parse('{"keys":[{"e":"AQAB","use":"sig","kty":"RSA","alg":"RS256","kid":"48a63bc4767f8550a532dc630cf7eb49ff397e7c","n":"qwrzl06fwB6OIm62IxNG7NXNIDmgdBrvf09ob2Gsp6ZmAXgU4trHPUYrdBaAlU5aHpchXCf_mVL-U5dzRqeVFQsVqsj4PEIE6E5OPw8EwumP2fzLQSswpkKmJJKFcdncfQ730QBonRUEhKkIbiYdicJl5yTkORd0_BmfdLV98r-sEwEHN4lzTJ15-yw90ob_R6vAH4wPyCSN3Xe5_zV6R4ENL2NlKn2HT9lbV7HhtQongea8wfnthUhdZH38kI4SS5nAaCVNxEAzlvJtUIdCpSgjUgcbah-DwY39l4D800kLxkcF2CGXPSmpF8GPs1aWSsYupY8sTSy9qCFJFPFx8Q"},{"e":"AQAB","n":"4tVDrq5RbeDtlJ2Xh2dikE840LWflr89Cm3cGI9mQGlskTigV0anoViOH92Z1sqWAp5e1aRkLlCm-KAWc69uvOW_X70jEhzDJVREeB3h-RAnzxYrbUgDEgltiUaM8Zxtt8hiVh_GDAudRmSP9kDxXL5xnJETF1gnwAHa0j7cM4STLKbtwKi73CEmTjTLqGAES8XVnXp8VWGb6IuQzdmBIJkfcFog4Inq93F4Cj_SXsSjECG3j56VxgwnloPCHTXVn_xS1s3OjoBCOvOVSJfg2nSTWNi93JGR9pWZevh7Sq8Clw8H2lvIAPV_HYdxvsucWg8sJuTa6ZZSxT1WmBkW6Q","kid":"85e55107466b7e29836199c58c7581f5b923be44","use":"sig","kty":"RSA","alg":"RS256"}]}')
var values = Object.keys(test).map(function(key){
    for (index in test[key]){
        if(test[key][index]["kid"] === "85e55107466b7e29836199c58c7581f5b923be44"){console.log("ok")}
    } 
});

