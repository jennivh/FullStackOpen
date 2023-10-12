interface heightWeight  {
    value1: number;
    value2: number;
}

const takeArguments = (args: string[]) : heightWeight => {
    if (args.length>4) throw new Error('Too many arguments');
    if (args.length<4) throw new Error('not enough arguments');

    if(isNaN(Number(args[2])) || isNaN(Number(args[3]))){
        throw new Error('Give numbers');
    }
    else{
        return{
            value1: Number(args[2]),
            value2: Number(args[3])
        };
    }
};

export const calculateBmi = (height: number, weight: number): string => {
    const calculatedHeight : number = height*0.01;
    const bmi: number = weight / Math.pow(calculatedHeight,2);
    
   if(bmi<18.5){
    return 'Underweight';
   }
   else if(bmi>18.5 && bmi<24.9){
    return "Normal (healthy weight)";
   }
   else if(bmi>24.9 && bmi<29.9){
    return 'Overweight';
   }
   else if(bmi>29.9){
    return 'Obese';
   }

   return "";
};



try{
    const {value1, value2} = takeArguments(process.argv);
    console.log(calculateBmi(value1, value2));
} catch (error: unknown){
    if( error instanceof Error){
    console.log(error.message);
    }
    console.log('something went wrong');
}

console.log(calculateBmi(180, 74));