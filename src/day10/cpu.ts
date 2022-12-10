export enum CommandType
{
	addX,
	noop
}

export abstract class Command
{
	delay: number;
	name: string;
	abstract effect(currentValue: Number)
	constructor(name, delay)
	{
		this.name = name;
		this.delay = delay;
	}
}

export class AddX extends Command
{
	param: number;
	effect(currentValue)
	{
		return currentValue + this.param;
	}
	constructor(delay, param)
	{
		super("addx", delay);
		this.param = param;
	}
}

export class Noop extends Command
{
	effect(currentValue)
	{
		return currentValue;
	}
	constructor(delay)
	{
		super("noop", delay);
	}
}

export class CPU
{
	commandPending: Command[];
	commandRunning: Command;
	cycle: number;
	signalStrength: number;

	constructor()
	{
		this.commandPending = [];
		this.cycle = 0;
		this.signalStrength = 1;
	}

	addCommandString(commandString: string)
	{
		let command = commandString.split(" ");
		//console.log(command[0]);
		if (command[0].indexOf("noop") != -1)
		{
			this.addCommand(CommandType.noop);
		}
		else if (command[0].indexOf("addx") != -1)
		{
			this.addCommand(CommandType.addX, Number(command[1]));
		}
	}

	addCommand(type: CommandType, value?: number)
	{
		switch (type)
		{
			case CommandType.addX:
				this.commandPending.push(new AddX(2, value));
				break;
			case CommandType.noop:
				this.commandPending.push(new Noop(1));
				break;

		}
	}

	stillWorking()
	{
		if (this.commandPending.length > 0 || this.commandRunning)
			return true;
		return false;
	}

	tick()
	{
		if (!this.commandRunning)
		{
			this.commandRunning = this.commandPending.shift();
			//console.log(`pulling new command ${this.commandRunning.name}`)
			this.commandRunning.delay--;
		}

		if (this.commandRunning.delay == 0)
		{
			this.signalStrength = this.commandRunning.effect(this.signalStrength);
			//console.log(`RUNNING command ${this.commandRunning.name} -> ${this.signalStrength}`)
			this.commandRunning = null;
		}
		else
		{
			//console.log(`Reducing delay`);
			this.commandRunning.delay--;
		}

		this.cycle++;
	}
}