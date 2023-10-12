interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number 
}

interface Values {
    target: number;
    exercises: number[];
}

const parseArguments = (args : string[]): Values => {
    if (args.length < 4) throw new Error('need more arguments');

    const [, , ...numbers] = args;
    const myArguments: number[] = numbers.map(a => Number(a) );
    myArguments.map(a => {if(isNaN(a)){throw new Error('only numbers');}});
    const [target, ...exercises]= myArguments;
    return { target, exercises};
};

export const exerciseCalculator = (exercises: number[], target: number): Result => {
    const days: number = exercises.length;
    const tDays: number = exercises.filter(e => e > 0).length;
    
    const average: number = exercises.reduce((a,b) => a+b, 0) / days;

    let success: boolean = false;
    let rating: number = 1;

    if (average > target*0.75){
        rating = 2;
        if(average> target || average === target){
            success = true;
            rating = 3;
        }
    }

    let description: string = 'Did not go as planned';
    if(rating === 2){ description = 'not too bad but could be better';}
    else if(rating === 3){ description = 'congrats! you succeeded your goal';}

    return {
        periodLength: days,
        trainingDays: tDays,
        success,
        rating,
        ratingDescription: description,
        target, 
        average
    };
};

try{
    const {target, exercises} = parseArguments(process.argv);
    console.log(exerciseCalculator(exercises, target));
} catch(error: unknown){
    if(error instanceof Error){
        console.log(error.message);
    }
    console.log('something went wrong');
}
console.log(exerciseCalculator([3, 0, 2, 4.5, 0, 3, 1],2));
