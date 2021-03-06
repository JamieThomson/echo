Struct.Tree = function (parameters) {
	THREE.Object3D.call(this);
	this.collideWithPlayer = true;
	this.collideWithDynamic = true;
}
Struct.Tree.prototype = new THREE.Object3D();
Struct.Tree.prototype.constructor = Struct.Tree;
Struct.Tree.prototype.removeChild = function(child){
	if(child && this.children.length > 0){	
		if(_.contains(this.children, child)){	
			var index = this.children.indexOf(child);
			var line = this.children[index-1];
			this.remove(child);
			this.remove(line);
			child.material.deallocate()
			child.deallocate();
			if(line){
				line.material.deallocate();
				line.geometry.deallocate();
				line.deallocate();
			}
			if(this.containsSegment() === 0){ 
				this.removeSelf();
			}
		}
	}
};
Struct.Tree.prototype.removeSelf = function(){
	if(this.parent) {
		this.sound.removeSelf();
		this.sound = undefined;
		this.turtle.removeSelf();
		this.turtle = undefined;
		this.parent.remove(this);
		this.deallocate();
		// console.log("dead tree");	
	} else {
		//console.log(this, "has no parent... :<");
	}
	
};

Struct.Tree.prototype.containsSegment = function(){
	var count = 0;
	for (var i = 0; i < this.children.length; ++i){
		if (this.children[i].constructor === Struct.Segment) ++count;
	}
	return count;
};
define(['app/struct/struct', 'libs/three/three', 'libs/tween/Tween'], function (){return Struct.Tree});


