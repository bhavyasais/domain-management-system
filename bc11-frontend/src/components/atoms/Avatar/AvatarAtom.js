import React from 'react';
import Avatar from '@material-ui/core/Avatar';

export default function AvatarAtom(props) {
    return (<Avatar src={props.src} className={props.className}/>);
}