const convertHeight = (height, height_units) => {
    if (height_units === "cm") {
        return height / 100.0;
    } else {
        return height / 39.37;
    }
};

const convertWeight = (weight, weight_units) => {
    if (weight_units === "kg") {
        return weight;
    } else {
        return weight / 2.205;
    }
};

const BMI = (weight, height) => {
    return weight / (height * height);
};

const units = { convertHeight, convertWeight, BMI };

export default units;
