import React from 'react';


interface IProfileProps {
    threeBoxProfile: any;
}
export default function Profile(props: IProfileProps) {
    return (
        <>
            {JSON.stringify(props.threeBoxProfile)}
        </>
    );
}
