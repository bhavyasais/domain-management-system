import React from "react";
import { Grid } from "@material-ui/core";
 
export default function LandingPageTemplate(props) {
  return (
      
    <Grid container direction="row">
      <Grid item>
       {props && props.childComponents && props.childComponents.sidebar}
      </Grid>
      <Grid item style={{ width: "95.5%" }}>
        <Grid container direction="column">
          <Grid item > 
          {props && props.childComponents && props.childComponents.topbar}
          </Grid>
          <Grid item>
          {props && props.childComponents && props.childComponents.banner}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
    
  );
}
