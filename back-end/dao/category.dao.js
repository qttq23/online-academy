const genericDao = require('./generic.dao.js')

async function getAll(){
    return await genericDao.getAll('category')
}

async function getById(id){
	return await genericDao.getById('category', id)
}

// return number of created rows
async function create(item) {
    return await genericDao.create('category', item)
}

async function edit(id, item) {
    return await genericDao.edit('category', id, item)
}

// return number of deleted rows
async function remove(id) {
    return await genericDao.remove('category', id)
}


module.exports = {getAll, getById, create, edit, remove}

