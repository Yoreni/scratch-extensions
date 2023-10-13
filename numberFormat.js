const suffixes = " KMBTqQsSONdUD"

class HelloWorld 
{
  getInfo() {
    return {
      id: 'numberformat',
      name: 'Number Format',
      blocks: [
        {
          opcode: 'format',
          blockType: Scratch.BlockType.REPORTER,
          text: 'format [NUMBER]',
		  arguments: {
            NUMBER: {
              type: Scratch.ArgumentType.NUMBER
            }
		  }
        },
		{
          opcode: 'abb',
          blockType: Scratch.BlockType.REPORTER,
          text: 'abberivate [NUMBER]',
		  arguments: {
            NUMBER: {
              type: Scratch.ArgumentType.NUMBER
            }
		  }
        },
		{
          opcode: 'scinot',
          blockType: Scratch.BlockType.REPORTER,
          text: 'to scientific notation [NUMBER]',
		  arguments: {
            NUMBER: {
              type: Scratch.ArgumentType.NUMBER
            }
		  }
        },
      ]
    };
  }

  hello() {
    return 'World!';
  }
  
  format(args)
  {
	return Number(args.NUMBER).toLocaleString();
  }
  
  scinot(args)
  {
	let number = args.NUMBER;
	
	if (number == 0)
		return "0";
	
	const sign = number < 0 ? "-" : "";
	number = Math.abs(number);
	
	const exponent = Math.floor(Math.log10(number));
	const mantissa = number / Math.pow(10, exponent);
	
	return `${sign}${mantissa.toFixed(2)}e${exponent}`;
  }
  
  abb(args) 
  {
	let num = args.NUMBER; 
	let sign = num < 0 ? "-" : ""
	let mag = Math.abs(num)
	
	if (mag < 10000)
		return Math.floor(mag)
	
	let powerOf1000 = Math.floor(Math.log(mag) / Math.log(1000))
	if (powerOf1000 > suffixes.length - 1)
		return this.scinot(args)
	
	num = mag / Math.pow(1000, powerOf1000)
	if (num >= 1000)
		num = 999;
	let dp = num < 10 ? 2 :
			num < 100 ? 1 : 0
	return sign + num.toFixed(dp) + suffixes[powerOf1000]
  }
}

Scratch.extensions.register(new HelloWorld());