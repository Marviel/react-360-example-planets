import React from 'react';

import {
    Text,
    Plane
} from 'react-360';

function upInputEvent(ev){
    return ev.nativeEvent.inputEvent.action == "up"
}

export const RotationHolder = ({rotationOnChange,
                         rotation,
                         rotationName,
                         rotationUpSuffix,
                         rotationDownSuffix,
                         transform}) =>(
         <Plane>
         <Text
          style={{
                          backgroundColor: '#777899',
                              fontSize: 0.1,
                              layoutOrigin: [0.5, 0.5],
                              paddingLeft: 0.2,
                              paddingRight: 0.2,
                              textAlign: 'center',
                              textAlignVertical: 'center',
                              transform,
                            }}
          onInput={(ev)=>{upInputEvent(ev) ? rotationOnChange(1) : null}}
         >
            {rotationName} {rotationUpSuffix}
         </Text>
        <Text
          style={{
                          backgroundColor: '#777899',
                              fontSize: 0.1,
                              layoutOrigin: [0.5, 0.5],
                              paddingLeft: 0.2,
                              paddingRight: 0.2,
                              textAlign: 'center',
                              textAlignVertical: 'center',
                              transform,
                            }}
          onInput={(ev)=>{upInputEvent(ev) ? rotationOnChange(-1) : null}}
         >
            {rotationName} {rotationDownSuffix}
         </Text>
         <Text
            style={{
                          backgroundColor: '#777899',
                              fontSize: 0.1,
                              layoutOrigin: [0.5, 0.5],
                              paddingLeft: 0.2,
                              paddingRight: 0.2,
                              textAlign: 'center',
                              textAlignVertical: 'center',
                              transform,
                            }}

         >{rotation}</Text>
         </Plane>
                         
);
