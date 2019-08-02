import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Link, NavLink } from 'react-router-dom';
import { _ } from 'lodash';
import axios from 'axios';
import $ from 'jquery';
import { Switch } from 'react-router';
import localforage from 'localforage';
import { SketchPicker } from 'react-color';
class Main extends Component {
	constructor(options) {
		super();
		Main.instance = this;
		this.skinTones = [
			'#FFF7EE', '#FFE7CF', '#FBCFA6', '#ffcdb4', '#f2b694', '#f3c385', '#ecba7d', '#e1a57f',
			'#f4a886', '#e5a389', '#eaa471', '#e2a77d', '#e7a680', '#e5a780', '#e59f7b', '#e49f7e',
			'#e09551', '#de9d7f', '#d28051', '#d38350', '#d39157', '#d38c51', '#d28654', '#d48c50',
			'#a5643e', '#c17831', '#b57533', '#cb7c5b', '#cb7c53', '#ad602f', '#ab4c1c', '#b25129',
			'#c06b25', '#874417', '#9f4523', '#814218', '#7b321a', '#6f2f12', '#795742', '#5c2708'
		];
		this.hairTones = [
			'#312823', '#493f3d', '#412b23', '#55301c', '#784e34', '#653f23', '#673b18', '#734925',
			'#8d5128', '#a77246', '#9f7c61', '#c6a376', '#c3a787', '#c18f64', '#d8b289', '#d2a37a',
			'#a6734c', '#6a3e2f', '#914b35', '#701e14', '#c0ae96', '#c49168', '#782030', '#1e3e72',
			'#a0162d', '#6b9813', '#16786b', '#e93559', '#730eab', '#b7060b', '#811250',
		]
		this.headMax = 6;
		this.bodyMax = 2;
		this.hairMax = 17;
		this.mouthMax = 6;
		this.eyesMax = 10;
		this.shirtMax = 3;
		this.sleevesMax = 2;
		this.pantsMax = 1;
		this.beltMax = 3;
		this.glassesMax = 8;
		this.facialHairMax = 10;
		this.stubbleMax = 1;
		this.decalMax = 6;
		this.decorationMax = 5;
		let head = Math.ceil(Math.random() * this.headMax);
		let body = Math.ceil(Math.random() * this.bodyMax);
		if (body == 1) {
			this.shirtMax = 4;
			this.pantsMax = 3;
		}
		if (body == 2) {
			this.shirtMax = 3;
			this.pantsMax = 1;
		}
		let hair = Math.ceil(Math.random() * this.hairMax);
		let mouth = Math.ceil(Math.random() * this.mouthMax);
		let eyes = Math.ceil(Math.random() * this.eyesMax);
		let shirt = Math.ceil(Math.random() * this.shirtMax);
		let sleeves = Math.floor(Math.random() * (this.sleevesMax + 1));
		let pants = Math.ceil(Math.random() * this.pantsMax);
		let belt = Math.floor(Math.random() * (this.beltMax + 1));
		let glasses = Math.floor(Math.random() * (this.glassesMax + 1));
		let facialHair = Math.floor(Math.random() * (this.facialHairMax + 1));
		let stubble = Math.floor(Math.random() * (this.stubbleMax + 1));
		let decal = Math.floor(Math.random() * (this.decalMax + 1));
		let decoration = Math.floor(Math.random() * (this.decorationMax + 1));
		this.state = {
			skinhex: this.skinTones[Math.floor(Math.random() * 40)].replace('#', ''),
			hairhex: this.hairTones[Math.floor(Math.random() * 31)].replace('#', ''),
			shirthex: '7ED321',
			pantshex: '4A90E2',
			decorationhex: 'D0021B',
			head: head,
			body: body,
			hair: hair,
			mouth: mouth,
			eyes: eyes,
			shirt: shirt,
			sleeves: sleeves,
			pants: pants,
			belt: belt,
			glasses: glasses,
			facialHair: facialHair,
			stubble: stubble,
			decal: decal,
			decoration: decoration,
			displayState: 'head'
		};
	}
	randomise() {
		let head = Math.ceil(Math.random() * this.headMax);
		let body = Math.ceil(Math.random() * this.bodyMax);
		if (body == 1) {
			this.shirtMax = 4;
			this.pantsMax = 3;
		}
		if (body == 2) {
			this.shirtMax = 3;
			this.pantsMax = 1;
		}
		let hair = Math.ceil(Math.random() * this.hairMax);
		let mouth = Math.ceil(Math.random() * this.mouthMax);
		let eyes = Math.ceil(Math.random() * this.eyesMax);
		let shirt = Math.ceil(Math.random() * this.shirtMax);
		let sleeves = Math.floor(Math.random() * (this.sleevesMax + 1));
		let pants = Math.ceil(Math.random() * this.pantsMax);
		let belt = Math.floor(Math.random() * (this.beltMax + 1));
		let glasses = Math.floor(Math.random() * (this.glassesMax + 1));
		let facialHair = Math.floor(Math.random() * (this.facialHairMax + 1));
		let stubble = Math.floor(Math.random() * (this.stubbleMax + 1));
		let decal = Math.floor(Math.random() * (this.decalMax + 1));
		let decoration = Math.floor(Math.random() * (this.decorationMax + 1));
		this.setState({
			skinhex: this.skinTones[Math.floor(Math.random() * 40)].replace('#', ''),
			hairhex: this.hairTones[Math.floor(Math.random() * 31)].replace('#', ''),
			head: head,
			body: body,
			hair: hair,
			mouth: mouth,
			eyes: eyes,
			shirt: shirt,
			sleeves: sleeves,
			pants: pants,
			belt: belt,
			glasses: glasses,
			facialHair: facialHair,
			stubble: stubble,
			decal: decal,
			decoration: decoration
		});
	}
	onSkinColorChange(color) {
		this.setState({ skinhex: color.hex.replace('#', '') })
	}
	onHairColorChange(color) {
		this.setState({ hairhex: color.hex.replace('#', '') })
	}
	onShirtColorChange(color) {
		this.setState({ shirthex: color.hex.replace('#', '') })
	}
	onPantsColorChange(color) {
		this.setState({ pantshex: color.hex.replace('#', '') })
	}
	onDecorationColorChange(color) {
		this.setState({ decorationhex: color.hex.replace('#', '') })
	}
	decrease(paramName) {
		let value = this.state[paramName];
		value--;
		if (value < 0) {
			value = this[paramName + 'Max'];
		}
		let stateObj = {};
		stateObj[paramName] = value;
		if (paramName == 'body') {
			if (value == 1) {
				this.shirtMax = 4;
				this.pantsMax = 3;
				stateObj.shirt = 1;
				stateObj.pants = 1;
			}
			if (value == 2) {
				this.shirtMax = 3;
				this.pantsMax = 1;
				stateObj.shirt = 1;
				stateObj.pants = 1;
			}
		}
		this.setState(stateObj);
	}
	increase(paramName) {
		let value = this.state[paramName];
		value++;
		if (value > this[paramName + 'Max']) {
			value = 0;
		}
		let stateObj = {};
		stateObj[paramName] = value;
		if (paramName == 'body') {
			if (value == 1) {
				this.shirtMax = 4;
				this.pantsMax = 3;
				stateObj.shirt = 1;
				stateObj.pants = 1;
			}
			if (value == 2) {
				this.shirtMax = 3;
				this.pantsMax = 1;
				stateObj.shirt = 1;
				stateObj.pants = 1;
			}
		}
		this.setState(stateObj);
	}
	decreaseNotZero(paramName) {
		let value = this.state[paramName];
		value--;
		if (value <= 0) {
			value = this[paramName + 'Max'];
		}
		let stateObj = {};
		stateObj[paramName] = value;
		if (paramName == 'body') {
			if (value == 1) {
				this.shirtMax = 4;
				this.pantsMax = 3;
				stateObj.shirt = 1;
				stateObj.pants = 1;
			}
			if (value == 2) {
				this.shirtMax = 3;
				this.pantsMax = 1;
				stateObj.shirt = 1;
				stateObj.pants = 1;
			}
		}
		this.setState(stateObj);
	}
	increaseNotZero(paramName) {
		let value = this.state[paramName];
		value++;
		if (value > this[paramName + 'Max']) {
			value = 1;
		}
		let stateObj = {};
		stateObj[paramName] = value;
		if (paramName == 'body') {
			if (value == 1) {
				this.shirtMax = 4;
				this.pantsMax = 3;
				stateObj.shirt = 1;
				stateObj.pants = 1;
			}
			if (value == 2) {
				this.shirtMax = 3;
				this.pantsMax = 1;
				stateObj.shirt = 1;
				stateObj.pants = 1;
			}
		}
		this.setState(stateObj);
	}
	hideSpinner() {
		window.console.log('loaded');
	}
	render() {
		let imageUrl = 'generateImage.php?';
		imageUrl += 'skinhex=' + this.state.skinhex;
		imageUrl += '&hairhex=' + this.state.hairhex;
		imageUrl += '&shirthex=' + this.state.shirthex;
		imageUrl += '&pantshex=' + this.state.pantshex;
		imageUrl += '&decorationhex=' + this.state.decorationhex;
		imageUrl += '&head=' + this.state.head;
		imageUrl += '&body=' + this.state.body;
		imageUrl += '&hair=' + this.state.hair;
		imageUrl += '&mouth=' + this.state.mouth;
		imageUrl += '&eyes=' + this.state.eyes;
		imageUrl += '&shirt=' + this.state.shirt;
		imageUrl += '&sleeves=' + this.state.sleeves;
		imageUrl += '&pants=' + this.state.pants;
		imageUrl += '&belt=' + this.state.belt;
		imageUrl += '&glasses=' + this.state.glasses;
		imageUrl += '&facialHair=' + this.state.facialHair;
		imageUrl += '&stubble=' + this.state.stubble;
		imageUrl += '&decal=' + this.state.decal;
		imageUrl += '&decoration=' + this.state.decoration;
		let downloadUrl = imageUrl + '&export=true';
		window.console.log('loading');
		return (<div className={'state_'+this.state.displayState}>
			<div id="preview">
				<div className="content">
					<img src={imageUrl} onLoad={this.hideSpinner} />
					<button id="randomise" onClick={event => this.randomise()}><img src="assets/randomise.png" /></button>
					<button id="download"><a href={downloadUrl} download="yourImage"><img src="assets/download.png" /></a></button>
				</div>
			</div>
			<div id="colorPickers">
				<div className="content">
					<div id="skinTonesPicker">
						<SketchPicker disableAlpha presetColors={this.skinTones} color={ this.state.skinhex } onChangeComplete={this.onSkinColorChange.bind(this)} />
						<button onClick={event => this.setState({displayState: 'head'})} id="hideColors">Done</button>
					</div>
					<div id="hairhexPicker">
						<SketchPicker disableAlpha presetColors={this.hairTones} color={ this.state.hairhex } onChangeComplete={this.onHairColorChange.bind(this)} />
						<button onClick={event => this.setState({displayState: 'head'})} id="hideColors">Done</button>
					</div>
					<div id="shirthexPicker">
						<SketchPicker disableAlpha color={ this.state.shirthex } onChangeComplete={this.onShirtColorChange.bind(this)} />
						<button onClick={event => this.setState({displayState: 'top'})} id="hideColors">Done</button>
					</div>
					<div id="pantshexPicker">
						<SketchPicker disableAlpha color={ this.state.pantshex } onChangeComplete={this.onPantsColorChange.bind(this)} />
						<button onClick={event => this.setState({displayState: 'bottom'})} id="hideColors">Done</button>
					</div>
					<div id="decorationhexPicker">
						<SketchPicker disableAlpha color={ this.state.decorationhex } onChangeComplete={this.onDecorationColorChange.bind(this)} />
						<button onClick={event => this.setState({displayState: 'top'})} id="hideColors">Done</button>
					</div>
				</div>
			</div>
			<div id="tabs">
				<div className="content">
					<div className="tab">
						<button onClick={event => this.setState({displayState: 'head'})}>{this.state.displayState == 'head' ? <img src="assets/head_dark.png" /> : <img src="assets/head_light.png" /> }</button>
					</div>
					<div className="tab">
						<button onClick={event => this.setState({displayState: 'face'})}>{this.state.displayState == 'face' ? <img src="assets/face_dark.png" /> : <img src="assets/face_light.png" /> }</button>
					</div>
					<div className="tab">
						<button onClick={event => this.setState({displayState: 'top'})}>{this.state.displayState == 'top' ? <img src="assets/top_dark.png" /> : <img src="assets/top_light.png" /> }</button>
					</div>
					<div className="tab">
						<button onClick={event => this.setState({displayState: 'bottom'})}>{this.state.displayState == 'bottom' ? <img src="assets/bottom_dark.png" /> : <img src="assets/bottom_light.png" /> }</button>
					</div>
				</div>
			</div>
			<div id="tabContent">
				<div id="head" className="content">
					<div className="row">
						<button onClick={event => this.decreaseNotZero('body')}><img src="assets/prev.png" /></button>
						<p><button style={{background: '#'+this.state.skinhex}} onClick={event => this.setState({displayState: 'skinTonesPicker'})}><img src="assets/dropper.png" /></button>Body</p>
						<button onClick={event => this.increaseNotZero('body')}><img src="assets/next.png" /></button>
					</div>

					<div className="row">
						<button onClick={event => this.decreaseNotZero('head')}><img src="assets/prev.png" /></button>
						<p>Head</p>
						<button onClick={event => this.increaseNotZero('head')}><img src="assets/next.png" /></button>
					</div>

					<div className="row">
						<button onClick={event => this.decrease('hair')}><img src="assets/prev.png" /></button>
						<p><button style={{background: '#'+this.state.hairhex}} onClick={event => this.setState({displayState: 'hairhexPicker'})}><img src="assets/dropper.png" /></button>Hair</p>
						<button onClick={event => this.increase('hair')}><img src="assets/next.png" /></button>
					</div>

					<div className="row">
						<button onClick={event => this.decrease('stubble')}><img src="assets/prev.png" /></button>
						<p>Stubble</p>
						<button onClick={event => this.increase('stubble')}><img src="assets/next.png" /></button>
					</div>

					<div className="row">
						<button onClick={event => this.decrease('facialHair')}><img src="assets/prev.png" /></button>
						<p>Facial Hair</p>
						<button onClick={event => this.increase('facialHair')}><img src="assets/next.png" /></button>
					</div>
				</div>
				<div id="face" className="content">
					<div className="row">
						<button onClick={event => this.decreaseNotZero('eyes')}><img src="assets/prev.png" /></button>
						<p>Eyes</p>
						<button onClick={event => this.increaseNotZero('eyes')}><img src="assets/next.png" /></button>
					</div>

					<div className="row">
						<button onClick={event => this.decrease('glasses')}><img src="assets/prev.png" /></button>
						<p>Glasses</p>
						<button onClick={event => this.increase('glasses')}><img src="assets/next.png" /></button>
					</div>

					<div className="row">
						<button onClick={event => this.decreaseNotZero('mouth')}><img src="assets/prev.png" /></button>
						<p>Mouth</p>
						<button onClick={event => this.increaseNotZero('mouth')}><img src="assets/next.png" /></button>
					</div>
				</div>
				<div id="top" className="content">
					<div className="row">
						<button onClick={event => this.decrease('decoration')}><img src="assets/prev.png" /></button>
						<p><button style={{background: '#'+this.state.decorationhex}} onClick={event => this.setState({displayState: 'decorationhexPicker'})}><img src="assets/dropper.png" /></button>Decoration</p>
						<button onClick={event => this.increase('decoration')}><img src="assets/next.png" /></button>
					</div>

					<div className="row">
						<button onClick={event => this.decrease('shirt')}><img src="assets/prev.png" /></button>
						<p><button style={{background: '#'+this.state.shirthex}} onClick={event => this.setState({displayState: 'shirthexPicker'})}><img src="assets/dropper.png" /></button>Shirt</p>
						<button onClick={event => this.increase('shirt')}><img src="assets/next.png" /></button>
					</div>

					<div className="row">
						<button onClick={event => this.decrease('decal')}><img src="assets/prev.png" /></button>
						<p>Shirt Symbol</p>
						<button onClick={event => this.increase('decal')}><img src="assets/next.png" /></button>
					</div>

					<div className="row">
						<button onClick={event => this.decrease('sleeves')}><img src="assets/prev.png" /></button>
						<p>Sleeves</p>
						<button onClick={event => this.increase('sleeves')}><img src="assets/next.png" /></button>
					</div>
				</div>
				<div id="bottom" className="content">
					<div className="row">
						<button onClick={event => this.decrease('pants')}><img src="assets/prev.png" /></button>
						<p><button style={{background: '#'+this.state.pantshex}} onClick={event => this.setState({displayState: 'pantshexPicker'})}><img src="assets/dropper.png" /></button>Pants</p>
						<button onClick={event => this.increase('pants')}><img src="assets/next.png" /></button>
					</div>

					<div className="row">
						<button onClick={event => this.decrease('belt')}><img src="assets/prev.png" /></button>
						<p>Belt</p>
						<button onClick={event => this.increase('belt')}><img src="assets/next.png" /></button>
					</div>
				</div>
			</div>
		</div>);
	}
}
const app = <Main />;
const container = document.getElementById('app');
ReactDOM.render(app, container);
export default Main;