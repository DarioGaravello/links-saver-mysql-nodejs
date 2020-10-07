import app from './app';

app.set('port', process.env.PORT || 3000);

function main(){
    app.listen(app.get('port'), () => {
        console.log(`server on port ${app.get('port')}`);
    });
};

main();