import { off } from "process";

class Element {
	x: number;
	y: number;

	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	distanceTo(x, y) {
		return Math.abs(this.x - x) + Math.abs(this.y - y);
	}
}

class Sensor extends Element {
	closestB: Beacon;
	distanceToBeacon: number;

	setBeacon(b) {
		this.closestB = b;
		this.distanceToBeacon = this.distanceTo(b.x, b.y);
	}

	constructor(x, y) {
		super(x, y);
	}
}

class Beacon extends Element {
	constructor(x, y) {
		super(x, y);
	}
}

export class Grid {
	sensors: Sensor[];
	beacons: Beacon[];

	constructor() {
		this.sensors = [];
		this.beacons = [];
	}

	findBeacon(bx, by) {
		return this.beacons.find((b) => b.x == bx && b.y == by);
	}

	addBeacon(x, y) {
		let b = new Beacon(x, y);
		this.beacons.push(b);
		return b;
	}

	addSensor(x, y, bx, by) {
		let s = new Sensor(x, y);
		let b = this.findBeacon(bx, by);
		if (!b) {
			b = this.addBeacon(bx, by);
		}
		s.setBeacon(b);
		this.sensors.push(s);
	}

	getImpossiblePosition(requestedY) {
		let pos = [];
		let nbResult = 0;
		this.sensors.forEach((s) => {
			let distanceToLine = s.distanceTo(s.x, requestedY);
			let intervalSize = s.distanceToBeacon - distanceToLine;
			for (let i = s.x - intervalSize; i < s.x + intervalSize; i++) {
				if (!pos[i]) {
					nbResult++;
				}
				pos[i] = true;
			}
		});
		return nbResult;
	}

	isCaseCoveredBySensor(x,y)
	{
		for(let s of this.sensors)
		{
			if(s.distanceTo(x,y) <= s.distanceToBeacon)
				return s;
		}
		return null;
	}

	getNextPossibleCase(x,y, sensor)
	{
		let distanceToLine = sensor.distanceTo(sensor.x, y);
		let intervalSize = sensor.distanceToBeacon - distanceToLine;
		return sensor.x + intervalSize;
	}


	getDistressSignalBetween(min, max)
	{
		let candidate = [];
		for(let y = min ; y < max ; y++)
		{
			if(y%1000 == 0)
			{
				console.log(y);
			}
			
			for(let x = min ; x < max ; x++)
			{
				let sensor = this.isCaseCoveredBySensor(x,y);
				if(!sensor)
				{
					//console.log(`Found : ${x} ${y}`);
					candidate.push({x:x, y:y});
					x = x+1;
				}
				else
				{
					let newX =this.getNextPossibleCase(x,y,sensor);
					//console.log(`${x} -> ${newX}`); 
					x = newX;
				}
			}
		}

		console.log(candidate);
	}

	getImpossiblePositionp2(requestedY, min, max) {
		let pos = [];
		let nbResult = 0;

		this.sensors.forEach((s) => {
			let distanceToLine = s.distanceTo(s.x, requestedY);
			let intervalSize = s.distanceToBeacon - distanceToLine;
			let intervalMin =
				s.x - intervalSize < min ? min : s.x - intervalSize;
			let intervalMax =
				s.x + intervalSize > max ? max : s.x + intervalSize;

			for (let i = intervalMin - 1; i < intervalMax; i++) {
				if (!pos[i]) {
					nbResult++;
				}
				pos[i] = ".";
			}
		});

		//console.log(nbResult);
		if (nbResult != max + 1) {
			for (let l = max - 1; l >= min; l--) {
				if (!pos[l]) return (l + 1) * 4000000 + requestedY;
			}
		}

		return null;
	}

	getPossibleLines(min, max) {
		let lines = [];
		this.sensors.forEach((s) => {
			let previousIdx = s.y - s.distanceToBeacon;
			if (
				previousIdx >= min &&
				previousIdx <= max &&
				lines.indexOf(previousIdx) == -1
			)
				lines.push(previousIdx);
			let afterIdx = s.y + s.distanceToBeacon;
			if (
				afterIdx >= min &&
				afterIdx <= max &&
				lines.indexOf(afterIdx) == -1
			)
				lines.push(afterIdx);
			if (lines.indexOf(s.y) == -1) {
				lines.push(s.y);
			}
		});
		return lines;
	}

	getImpossiblePositionBetween(min, max) {
		let lines = this.getPossibleLines(min, max);

		for (let i of lines) {
			let line = this.getImpossiblePositionp2(i, min, max);
			console.log(`i ${i} : ${line}`);
		}
	}
}
