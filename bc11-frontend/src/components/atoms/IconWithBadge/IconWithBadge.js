import React from 'react';
import Badge from '@material-ui/core/Badge';

export default function IconWithBadge(props) {
    return (<Badge {...props} children={props.icon}/>);
}