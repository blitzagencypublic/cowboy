var dataStore = [];

exports.write = function(object)
{
	dataStore.push(object);
}

exports.getLength = function()
{
	return dataStore.length;
}