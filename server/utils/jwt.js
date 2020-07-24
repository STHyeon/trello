// let jweObj = {};
// module.exports = jweObj;

import jwt from "jsonwebtoken";

const jweObj = "apple";

// token 발행
function jwtUser(context) {
    const token = jwt.sign({ username: context }, jweObj, { expiresIn: "5m" });
    return token;
}

// token 디코드
function unJwtUser(context) {
    console.log(context);
    jwt.verify(context, jweObj, (err, result) => {
        if (err) {
            console.log("함수 에러");
            console.log(result);
            return err;
        }
        return result;
    });
}

module.exports = { jwtUser, unJwtUser };
