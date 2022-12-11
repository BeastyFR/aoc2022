export abstract class Monkey
{
	items: bigint[]
	abstract operation(old);
	abstract test(itemWL): boolean
	destinationIfTrue: number;
	destinationIfFalse: number;
	nbItemsPassed: number


	constructor(items: bigint[], dt, df)
	{
		this.items = items;
		this.destinationIfTrue = dt;
		this.destinationIfFalse = df;
		this.nbItemsPassed = 0;
	}

}


class Monkey0 extends Monkey
{
	constructor()
	{
		super([50n, 70n, 54n, 83n, 52n, 78n], 2, 7);
	}

	operation(itemWL)
	{
		return itemWL * 3n;
	}

	test(itemWL)
	{
		return itemWL % 11n == 0n
	}
}

class Monkey1 extends Monkey
{
	constructor()
	{
		super([71n, 52n, 58n, 60n, 71n], 0, 2);
	}

	operation(itemWL)
	{
		return itemWL * itemWL;
	}

	test(itemWL)
	{
		return itemWL % 7n == 0n;
	}
}
class Monkey2 extends Monkey
{
	constructor()
	{
		super([66n, 56n, 56n, 94n, 60n, 86n, 73n], 7, 5);
	}

	operation(itemWL)
	{
		return itemWL + 1n;
	}

	test(itemWL)
	{
		return itemWL % 3n == 0n;
	}
}
class Monkey3 extends Monkey
{
	constructor()
	{
		super([83n, 99n], 6, 4);
	}

	operation(itemWL)
	{
		return itemWL + 8n;
	}

	test(itemWL)
	{
		return itemWL % 5n == 0n;
	}
}
class Monkey4 extends Monkey
{
	constructor()
	{
		super([98n, 98n, 79n], 1, 0);
	}

	operation(itemWL)
	{
		return itemWL + 3n;
	}

	test(itemWL)
	{
		return itemWL % 17n == 0n;
	}
}
class Monkey5 extends Monkey
{
	constructor()
	{
		super([76n], 6, 3);
	}

	operation(itemWL)
	{
		return itemWL + 4n;
	}

	test(itemWL)
	{
		return itemWL % 13n == 0n;
	}
}
class Monkey6 extends Monkey
{
	constructor()
	{
		super([52n, 51n, 84n, 54n], 4, 1);
	}

	operation(itemWL)
	{
		return itemWL * 17n;
	}

	test(itemWL)
	{
		return itemWL % 19n == 0n;
	}
}
class Monkey7 extends Monkey
{
	constructor()
	{
		super([82n, 86n, 91n, 79n, 94n, 92n, 59n, 94n], 5, 3);
	}

	operation(itemWL)
	{
		return itemWL + 7n;
	}

	test(itemWL)
	{
		return itemWL % 2n == 0n;
	}
}

class Monkeyt0 extends Monkey
{
	constructor()
	{
		super([79n, 98n], 2, 3);
	}

	operation(itemWL)
	{
		return itemWL * 19n;
	}

	test(itemWL)
	{
		return itemWL % 23n == 0n;
	}
}

class Monkeyt1 extends Monkey
{
	constructor()
	{
		super([54n, 65n, 75n, 74n], 2, 0);
	}

	operation(itemWL)
	{
		return itemWL + 6n;
	}

	test(itemWL)
	{
		return itemWL % 19n == 0n;
	}
}

class Monkeyt2 extends Monkey
{
	constructor()
	{
		super([79n, 60n, 97n], 1, 3);
	}

	operation(itemWL)
	{
		return itemWL * itemWL;
	}

	test(itemWL)
	{
		return itemWL % 13n == 0n;
	}
}

class Monkeyt3 extends Monkey
{
	constructor()
	{
		super([74n], 0, 1);
	}

	operation(itemWL)
	{
		return itemWL + 3n;
	}

	test(itemWL)
	{
		return itemWL % 17n == 0n;
	}
}

export class MonkeyManager
{
	monkeys: Monkey[];
	constructor(test: boolean)
	{
		if (!test)
			this.monkeys = [new Monkey0(), new Monkey1(), new Monkey2(), new Monkey3(), new Monkey4(), new Monkey5(), new Monkey6(), new Monkey7()];
		else
			this.monkeys = [new Monkeyt0(), new Monkeyt1(), new Monkeyt2(), new Monkeyt3()];
	}

	playRound()
	{
		this.monkeys.forEach(currentMonkey =>
		{
			let debug = false;
			while (currentMonkey.items.length > 0)
			{
				let currentItem = currentMonkey.items.shift();
				if (debug)
					console.log(`new Item ${currentItem}`)

				currentMonkey.nbItemsPassed++;
				currentItem = currentMonkey.operation(currentItem);
				if (debug)
					console.log(`after operation ${currentItem}`)
				//currentItem = Math.floor(currentItem / 3);
				currentItem = currentItem % 9699690n; 

				if (debug)
					console.log(`relief :  ${currentItem}`)
				let destinationMonkey;

				if (currentMonkey.test(currentItem))
					destinationMonkey = currentMonkey.destinationIfTrue;
				else
					destinationMonkey = currentMonkey.destinationIfFalse;

				if (debug)
					console.log(`result ${destinationMonkey}`)
				this.monkeys[destinationMonkey].items.push(currentItem);
			}
		});
	}

	playRounds(nbRounds)
	{
		for (let i = 0; i < nbRounds; i++)
		{
			if ((i + 1) % 100 == 0)
				console.log(`Round ${i}`);
			this.playRound();
			
			if((i+1)%1000 == 0)
				this.displayResult();
		}
	}

	displayResult()
	{
		this.monkeys.forEach(m =>
		{
			console.log(m.nbItemsPassed);
		})
	}
}