'use strict';
module.exports = (action) => (req, res, next) => {
    try {
        if (req.user.actions.includes(action)) {
            console.log(req.user.actions);
            next();
        } else {
            next('access denied');
        }
    } catch (err) {
        next({ err });
    }
}

// module.exports=(action)=>{
//     return(req,res,next)=>{
//         try{
//             console.log(req.actions);
//             if(req.user.actions.includes(action)){
//                 next();
//             }else{
//                 next("access denied");
//             }
//         }catch(err){
//             throw err;
//         }
//     }
// }