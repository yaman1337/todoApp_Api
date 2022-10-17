#For login:
   - method:'post'
   - path: '/login'
   - data:`{
        email: your email,
        password: your password
    }`

#For SignUp:
   - method:'post'
   - path:'/signup'
   - data:`{
        name: your name,
        email: your email,
        password: your password
    }`
#For adding a task:
   - method:'post'
   -path:'/add'
   -data: `{
        task: your task,
        completed:true or false,
    }`
   -P.S: Completed is false by default.

#For getting all task:
   - method:'get'
   - path:'/'
   - headers: `{
        Authorization: Bearer + Your token
    }`

#For deleting a task:
   - method:'detele'
   - path: '/delete/:your-task-id'


`P.S: You can add your mongodb url in keys.js file as db_url .`
