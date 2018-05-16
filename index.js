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

function seededRandom(seed) {
    var x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
}


export default class planetaryR360 extends React.Component {
  constructor(props){
  	super(props);
	this.state = {
		rotation: 0,
		rotation_medium: 0,
		rotation_small: 0,
		segments: 4,
		increasingSegments: true,
		numSpheres: 1,
		baseSeed: 10,
		increasingSpheres: true
	}
	
	window.setInterval(()=>{this.changeRotations()}, 10);
  }

  changeRotations = () =>{
	var increasingSegments = this.state.increasingSegments;
	if (this.state.segments > 500){
		increasingSegments = false;
	}
	if (this.state.segments <= 5){
		increasingSegments = true;
	}

	this.setState({
		rotation: this.state.rotation + .25,
		rotation_medium: this.state.rotation_medium + .5,
		rotation_small: this.state.rotation_small + 3,
		segments: this.state.increasingSegments ? this.state.segments + 1 : this.state.segments - 1,
		increasingSegments,
	})
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

  
	
  render() {
	// Create Sphere objects
    var spheres = Array.from(new Array(this.state.numSpheres), 
					(x, i)=>{
									var color = '#'+seededRandom(i+this.state.baseSeed).toString(16).substr(-6);
									var rads = (Math.PI*2)/this.state.numSpheres * i;
									var translate = [.3*Math.sin(rads),0,.3*Math.cos(rads)]
									return <Sphere
									radius={.05}
									lit={true}
									style={{
									  color,
									  transform: [{translate}, {rotateY: this.state.rotation_small}],
									}}
									onInput={(ev)=>{ev.stopPropagation()}}
								/>});
	return (
	  <Scene style={{transform:[{rotateY: this.state.rotation}]}}>
      <View>
		<AmbientLight intensity={1.0} color={'#ffffff'} />
		<PointLight
	  	 intensity={0.4}
	 	 style={{transform: [{translate: [0, 4, -1]}]}}
		/>
		<Sphere
			radius={.2}
			lit={true}
			style={{
			  color: '#96deFF',
			  transform: [{translate: [-0,-0,-3]}, {rotateY: this.state.rotation}],
			}}
			mouse
			onInput={(ev)=>{console.log("input!", ev.nativeEvent.inputEvent)}}
      	>
			<Sphere
				radius={.1}
				lit={true}
				style={{
				  color: '#96AA00',
				  transform: [{translate: [-0,-0,-1]}, {rotateX: this.state.rotation_medium}],
				}}
				onInput={(ev)=>{ev.nativeEvent.inputEvent.action == "down" ? this.changeMoons(): null;
								ev.stopPropagation()}}
			>
				{spheres}
			</Sphere>
		</Sphere>
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
