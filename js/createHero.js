var hero = new SetUpMain({
	character: 'character',
	background: 'background',
	data:{
		keyCodes: {
			up: false,
			down: false,
			left: false,
			right: false,
			normalAttack: false,
			heavyAttack: false
		}
	},
	onload: function (){
		this.setStatus({
			name: '',
			_maxhp: 15,
			_hp: 15,
			_mp: 10,
			_def: 8,
			_str: 12,
			_int: 5,
			_luk: 9,
			_mdf: 7,
			_agi: 12,
			_vit: 8,
			_dex: 10,
			_maxexp: 100,
			_exp: 0,
			_walkSpeed: 3,
			_runSpeed: 12,
			_attackSpeed: 10
		});
		this.setPosition({
			x: 0,
			y: 0
		});
		this.setOtherStatus({
			iswalk: false,
			isrun: false
		});
		this.setKeyCode('');
	},
	walkTimer: null
});

console.dir(hero);

document.onkeydown = function (e){
	var keyCode = e.which + '';
	if(keyCode === '90') hero.normalAttack();
	if(keyCode === '88') hero.heavyAttack();
	hero.setKeyCode(keyCode);
	if(hero.data.status.iswalk) return;
	hero.setOtherStatus({
		iswalk: true
	});
	var interval = 20;
	hero.walkTimer = setInterval(function (data){
		var keyCode = data.keyCodes;
		if(keyCode.left && keyCode.down){
			hero.data.position.x -= hero.data.character._walkSpeed * Math.pow(2, 0.5) / 2;
			hero.data.position.y += hero.data.character._walkSpeed * Math.pow(2, 0.5) / 2;
		}
		else if(keyCode.right && keyCode.down){
			hero.data.position.x += hero.data.character._walkSpeed * Math.pow(2, 0.5) / 2;
			hero.data.position.y += hero.data.character._walkSpeed * Math.pow(2, 0.5) / 2;
		}
		else if(keyCode.left && keyCode.up){
			hero.data.position.x -= hero.data.character._walkSpeed * Math.pow(2, 0.5) / 2;
			hero.data.position.y -= hero.data.character._walkSpeed * Math.pow(2, 0.5) / 2;
		}
		else if(keyCode.right && keyCode.up){
			hero.data.position.y -= hero.data.character._walkSpeed * Math.pow(2, 0.5) / 2;
			hero.data.position.x += hero.data.character._walkSpeed * Math.pow(2, 0.5) / 2;
		}
		else if(keyCode.left)
		hero.data.position.x -= hero.data.character._walkSpeed;
		else if(keyCode.up)
		hero.data.position.y -= hero.data.character._walkSpeed;
		else if(keyCode.right)
		hero.data.position.x += hero.data.character._walkSpeed;
		else if(keyCode.down)
		hero.data.position.y += hero.data.character._walkSpeed;
	}, interval, hero.data);
};

document.onkeyup = function (e){
	var keyCode = e.which + '';
	var keyCodes = hero.data.keyCodes;
	hero.clearKeyCode(keyCode);
	if(!keyCodes.up && !keyCodes.down && !keyCodes.left && !keyCodes.right){
		hero.setOtherStatus({
			iswalk: false
		});
		hero.stopWalk();
	}
}