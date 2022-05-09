const express = require('express');
const router = express.Router();
const {signup, activateAccount, signin, signinGoogle, signinFacebook, resetPassword, newPassword} = require('../controller/auth-controller');
const requireLogin = require('../requireLogin/requireLogin');

router.post("/signup",signup);
router.post("/activate-account/",activateAccount);
router.post("/signin",signin);
router.post("/google-signin",signinGoogle);
router.post("/facebook-signin",signinFacebook);
router.post("/reset-password",resetPassword);
router.post("/new-password",newPassword);

// router.get("/protected",requireLogin,(req,res)=>{
//     res.send("PROTECTED PAGE.")
// });

module.exports = router;