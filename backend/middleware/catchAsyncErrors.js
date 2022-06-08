module.exports = (theFuction) =>(req, res, next)=>{
    Promise.resolve(theFuction(req, res, next)).catch(next)
}