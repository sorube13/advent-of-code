const day = Number(process.env.npm_config_day ?? new Date().getDate());
const year:number = Number(process.env.npm_config_year ?? new Date().getFullYear());

const outputSolution = () => {
    console.log(
        `Year ${year} | Day ${day} - Solution: `
    );
    require(`./${year}/day${day}.ts`).default;
};

const validate = (type: 'day' | 'year', num: number, min:number, max: number) => {
    if (num < min || num > max + 1)
        throw new Error(
            `The ${type} must be number between ${min} and ${max}, you entered ${num}`
        );
};

validate('day', day, 1,25);
validate('year', year, 2022, 2023)

outputSolution();
