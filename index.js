import app from "./src/app.js";

app.listen(app.get('port'), () => console.log(`Server listen in the port :  ${app.get('port')}
http://localhost:${app.get('port')}/
`))