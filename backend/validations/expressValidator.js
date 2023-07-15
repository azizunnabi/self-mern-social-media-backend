const {body} = require("express-validator");
module.exports.registerValidations =[
body("name").not().isEmpty().trim().withMessage("name is required"),
body("userName").not().isEmpty().trim().withMessage("User name is required"),
body("password").not().isEmpty().isLength({min: 6, max:50}).withMessage("correct Password is required")
];

module.exports.loginValidations =[
    body("userName").not().isEmpty().trim().withMessage("User name is required"),
    body("password").not().isEmpty().isLength({min: 6, max:50}).withMessage("Password is required")
    ];

    module.exports.postValidations = [
        body("body").not().isEmpty().trim().withMessage("psot bidy is required"),
        body("postImage").not().isEmpty().withMessage("post image is required"),
        body("user").not().isEmpty().withMessage("user is required"),
      ];
    module.exports.updatePostValidations = [
        body("body").not().isEmpty().trim().withMessage("body is required"),
        body("postImage").not().isEmpty().withMessage("post image is required"),
        body("User").not().isEmpty().withMessage("user  is required"),
]; 
module.exports.passwordValidations =[
  body("oldPassword").not().isEmpty().isLength({min: 6, max:50}).withMessage("correct old Password is required"),
  body("newPassword").not().isEmpty().isLength({min: 6, max:50}).withMessage("correct new Password is required"),
];