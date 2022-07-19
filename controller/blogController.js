const axios = require('axios').default;
const {body,validationResult} = require('express-validator');
const formatdistance = require('date-fns/formatDistanceToNow');

exports.blogs = async function(req,res){
     
    try{
        const response = await axios.get('http://localhost:3001/blogs');
        if(response.status === 200){
            res.render('home',{blogs:response.data.blogs,format:formatdistance});
        }else{
            res.render('home',{error:response.data["error"]});
        }
    }catch (e) {
            console.log(e)
    }
}

exports.blogs_view = async function(req,res){
     
    try{
        const response = await axios.get('http://localhost:3001/blogs/'+req.params.id);
        if(response.status === 200){
            console.log(response.data)
            res.render('view',{blog:response.data.blog,comments:response.data.comment,format:formatdistance});
        }else{
            res.render('view',{error:response.data["error"]});
        }
    }catch (e) {
            console.log(e)
    }
}

exports.post_comment =[ 
    body('message').trim().isLength({min:1}).withMessage("please enter message"),
    body('username').trim().isLength({min:1}).withMessage("please enter message username"),

    async (req,res,next)=>{

        const error = validationResult(req)

        if(!error.isEmpty()){
            
            return res.render({errors:error.array(),data:req.body})
             
        }


        const comment = {
            username:req.body.username,
            message:req.body.message,
            blog:req.params.id
        }

        try{
            const response = await axios.post('http://localhost:3001/blogs/'+req.params.id+"/createcomment",{comment});
            if(response.status === 200){
                console.log(response.data)
                res.redirect('/'+ req.params.id)//,{blog:response.data.blog,Comment:response.data.comment});
            }else{
                res.render('view',{error:response.data["error"]});
            }
        }catch (e) {
                console.log(e)
        }

    }
]