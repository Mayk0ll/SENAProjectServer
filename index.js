import app from './src/app.js';
import envsVars from './src/helpers/envs.js';

const port = envsVars.port || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`); 
});