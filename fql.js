// Place your code here:

// Adds properties of obj2 into obj1
function merge(obj1, obj2) {
	for (var key in obj2) {
		obj1[key] = obj2[key];
	}
	return obj1;
}


var FQL = function(data) {
	this.data = data;
	this.indices = {};
};

FQL.prototype.exec = function(){
	return this.data;
}

FQL.prototype.count = function(){
	return this.data.length;
}

FQL.prototype.limit = function(number){
	this.data = this.data.slice(0,number);
	return this;
}

FQL.prototype.where = function(whatever){
	var results = [];
	var count = this.count();
	for (var i = 0; i < count; i++) {
		if (whatever(this.data[i]) === true) {
			results.push(this.data[i]);
		}
	}
	this.data = results;
	return this;
}

FQL.prototype.select = function(values_array){
	var results = [];
	var count = this.count();
	for (var i = 0; i < count; i++) {
		var obj = {};
		for (var j = 0; j < values_array.length; j++){
			var new_key = values_array[j];
			obj[new_key] = this.data[i][new_key];
		}
		results.push(obj);
	}
	this.data = results;
	return this;
}

FQL.prototype.order = function(datum){
	this.data = this.data.sort(function(a,b){
		return a[datum] - b[datum];
	});
	return this;
};

FQL.prototype.left_join = function(table2, compare_function) {
	var results = [];
	for (var i = 0; i < this.data.length; i++) {
		for (var j = 0; j < table2.data.length; j++) {
			if (compare_function(this.data[i], table2.data[j]) === true){
				var obj = {};
				for (var key in table2.data[j]) {
					obj[key] = table2.data[j][key];
				}
				for (var key in this.data[i]) {
					if (obj[key] === undefined) {
						obj[key] = this.data[i][key];
					}
				}
				results.push(obj);
			}
		}
	}
	this.data = results;
	return this;
}

FQL.prototype.addIndex = function(new_index) {
	var results_array = {};
	for (var i = 0; i < this.data.length; i++) {
		if (results_array[this.data[i][new_index]]) {
			results_array[this.data[i][new_index]].push(i);
		} else {
			results_array[this.data[i][new_index]] = [];
			results_array[this.data[i][new_index]].push(i);
		}
	}
	this.indices[new_index] = results_array;
}











