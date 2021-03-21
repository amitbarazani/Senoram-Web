import React from 'react';
import './General.css';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';


const NoResults = (props) => {




    return (
        <div>
     
            <Grid container justify="center">
                <h2>
                   Somthing Went Wrong
                </h2>

                

            </Grid>
            <Button variant="contained" color="primary" onClick={async () => {
                         props.history.push({
                            pathname: '/Input',
                        });
                    }} > Try Again! </Button>


        </div>
    );
}


export default NoResults;

