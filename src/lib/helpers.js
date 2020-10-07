import bcrypt from 'bcryptjs';

const helpers = {};

helpers.encryptPassword = async (password) => {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        return hash;
};

helpers.encryptCompare = async (password, comparePassword) => {
    try {
        return await bcrypt.compare(password, comparePassword);
    } catch (err) {
        console.error(err)   
    }
}

export default helpers;