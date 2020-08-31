process.on('uncaughtException', function(err){
  console.log(err)
  console.log('dayo')
})
throw new Error("un error occured")
