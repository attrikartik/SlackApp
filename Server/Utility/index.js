const { v4: uuidv4 } = require('uuid');
/**
 * create user
 */
const createUser = ({ name = ''} = {})=> (
    {
        id: uuidv4(),
        name
    }
)
/** create chat */

const createMessage = ({ message= '', sender= ''} = {})=> (
    {
        id: uuidv4(),
        time: getTime(new Date( Date.now)),
        message,
        sender
    }
)

const getTime = date => (
    `${date.getHours()}: ${'0'+ date.getMinutes().slice(-2)}`
)
module.exports = {
    createUser,
    createMessage
}