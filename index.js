import React from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Scene,
    Box,
    Cylinder,
    Sphere,
    AmbientLight,
    PointLight,
    VrButton,
} from 'react-360';

import _ from "underscore";

var initialSpheresFirst  = [{
                            key: uuidv4(),
                            radius: .2,
                            color: randomHex(),
                            translate: [0, 0, -3],
                            rotation: 10,
                            spheres: [
                                {
                                    key: uuidv4(),
                                    radius: .1,
                                    color: randomHex(),
                                    translate: [0,0,-1],
                                    rotation: 2,
                                    spheres: [
                                        {
                                            key: uuidv4(),
                                            radius: .05,
                                            color: randomHex(),
                                            translate: [0,0,-.5],
                                            rotation: 2,
                                            spheres: []
                                        }
                                    ]

                                }
                            ]
                        }
            ];

function seededRandom(seed) {
    var x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
}

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function randomHex(toHash) {
    toHash = toHash ? toHash : Math.random()
    return '#'+seededRandom(toHash).toString(16).substr(-6);
}

function generateInitialSpheres1({radius, color, translate, rotation, depth}) {
    console.log("generateInitialSpheres1", depth)
    return depth > 0 ? [{
                            key: uuidv4(),
                            radius,
                            color,
                            translate,
                            rotation,
                            spheres: generateInitialSpheres1({radius: radius-radius/3, 
                                                              color: randomHex(),
                                                              translate: [translate[0],translate[1],translate[2]-translate[2]/2],
                                                              rotation,
                                                              depth: depth -1})
                        }] : []
}

const PlanetarySphere = ({key, radius, translate, rotation, color, spheres}) => (
    <Sphere
        key={key}
        radius={radius}
        lit={true}
        widthSegments={40}
        heightSegments={40}
        style={{
            color: color,
            transform: [{translate: translate}, 
                        {rotateX: rotation[0]},
                        {rotateY: rotation[1]},
                        {rotateZ: rotation[2]}],
        }}
        mouse
    >
    {spheres.map((val) =>{
        return val ? <PlanetarySphere key={val.key}
                                      radius={val.radius}
                                      translate={val.translate}
                                      color={val.color}
                                      rotation={val.rotation}
                                      spheres={val.spheres}/> : <div/>
     })
    }
    </Sphere> 
);



export default class planetaryR360 extends React.Component {
    constructor(props){
        super(props);

        baseSphereUuid = uuidv4()

        this.state = {
            xRotDelta: 1,
            yRotDelta: 1,
            zRotDelta: 1,
            segments: 4,
            increasingSegments: true,
            numSpheres: 1,
            baseSeed: 10,
            increasingSpheres: true,
            spheres: generateInitialSpheres1(
                        {radius: .2,
                        color: randomHex(),
                        translate: [0, 0, -5],
                        rotation: [0,10,0],
                        depth: 10})
        }


        console.log(this.state.spheres)
        window.setInterval(()=>{this.changeRotations()}, 10);
    }

  changeRotations = () =>{
    const spheres = [this.calculateChangeTree(this.state.spheres[0])];
    this.setState({
        spheres
	})
  }

  calculateChangeTree = (sphere)=>{
    return { 
                ...sphere,
                rotation: [sphere.rotation[0] + this.state.xRotDelta, 
                           sphere.rotation[1] + this.state.yRotDelta, 
                           sphere.rotation[2] + this.state.zRotDelta],
                spheres: sphere.spheres.map((v) => this.calculateChangeTree(v))
           }
  }

  changeMoons = () =>{
	var increasingSpheres = this.state.increasingSpheres;
	if (this.state.numSpheres > 10){
		increasingSpheres = false;
	}
	var baseSeed = this.state.baseSeed;
	if (this.state.numSpheres <= 2){
		increasingSpheres = true;
		baseSeed = this.state.baseSeed + 1;
	}

	this.setState({
		numSpheres: this.state.increasingSpheres ? this.state.numSpheres + 1 : this.state.numSpheres - 1,
		increasingSpheres,
		baseSeed
	})
  }

  rotationDeltaOnChange = (ind, amt) =>{
    var newState = {};
    if (ind == 0){
        newState.xRotDelta = this.state.xRotDelta + amt;
    }
    if (ind == 1){
        newState.yRotDelta = this.state.yRotDelta + amt;
    }
    if (ind == 2){
        newState.zRotDelta = this.state.zRotDelta + amt;
    }
    this.setState(newState);
  }

  
	
  render() {
    const baseSphere = this.state.spheres[0];
	return (
	  <Scene>
      <View>
		<AmbientLight intensity={1.0} color={'#ffffff'} />
		<PointLight
	  	 intensity={0.4}
	 	 style={{transform: [{translate: [0, 4, -1]}]}}
		/>
		
        <PlanetarySphere radius={baseSphere.radius}
                         color={baseSphere.color}
                         translate={baseSphere.translate}
                         rotation={baseSphere.rotation}
                         spheres={baseSphere.spheres}/>
        <Text
          style={{
                          backgroundColor: '#777899',
                              fontSize: 0.2,
                              layoutOrigin: [0.5, 0.5],
                              paddingLeft: 0.2,
                              paddingRight: 0.2,
                              textAlign: 'center',
                              textAlignVertical: 'center',
                              transform: [{translate: [-2, 0, -3]},
                                          {rotateY: 50}],
                            }}
          onInput={()=>{this.rotationDeltaOnChange(0,1)}}
         >
            X Up
         </Text>
         <Text
            style={{
                          backgroundColor: '#7778BB',
                              fontSize: 0.2,
                              layoutOrigin: [0.5, 0.5],
                              paddingLeft: 0.2,
                              paddingRight: 0.2,
                              textAlign: 'center',
                              textAlignVertical: 'center',
                              transform: [{translate: [-3, 0, -3]},
                                          {rotateY: 50}],
                            }}
  
            onInput={()=>{this.rotationDeltaOnChange(1,1)}}
          >
            Y Up
          </Text>
        <Text
          style={{
                          backgroundColor: '#7778FF',
                              fontSize: 0.2,
                              layoutOrigin: [0.5, 0.5],
                              paddingLeft: 0.2,
                              paddingRight: 0.2,
                              textAlign: 'center',
                              textAlignVertical: 'center',
                              transform: [{translate: [-4, 0, -3]},
                                          {rotateY: 50}],
                            }}
          onInput={()=>{this.rotationDeltaOnChange(2,1)}}
         >
            Z Up
         </Text>

      </View>
	  </Scene>
    );
  }
};

const styles = StyleSheet.create({
  panel: {
    // Fill the entire surface
    width: 1000,
    height: 600,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  greetingBox: {
    padding: 20,
    backgroundColor: '#000000',
    borderColor: '#639dda',
    borderWidth: 2,
  },
  greeting: {
    fontSize: 30,
  },
});

AppRegistry.registerComponent('planetaryR360', () => planetaryR360);
