var player=[];
var loser=[];
var winner= [];
function getNewPlayer() {
	this.live = 3;
}
function random(first,end){
	first = first||0;
	end = end||10;
	return first + Math.floor(Math.random()*(end - first));
}
function findPlayer(num,index){
	var len = player[num].length;
	if(len<2){
		return -1;
	} else {
		var num =0;
		do {
			num = random(0,len);
		}while(num === index)
		return num;
	}
}

function settlement( num,winnerIndex, loserIndex){

	player[num+1].push(player[num][winnerIndex]);
	player[num][loserIndex].live--;
	if(winnerIndex<loserIndex){
		if(player[num][loserIndex].live <= 0){
			player[num].splice(loserIndex,1);
			loser[num]++;
		}
		player[num].splice(winnerIndex,1);
	} else {
		player[num].splice(winnerIndex,1);
		if(player[num][loserIndex].live <= 0){

			player[num].splice(loserIndex,1);
			loser[num]++;
		}
	}
}
function init(num) {
	for(var i=0; i<13;i++){
		player[i]=[];
		loser[i]=0;
	}
	for(var i=0; i<num; i++){
		player[0].push(new getNewPlayer());
	}	
}
function loop(){
	
	var count = 0,
		flag = 0;
	do {
		flag =0;
		count = count +1;
		//console.log(count);
		for(i=0; i<12;i++){
			var one = findPlayer(i,-1);
			if(one !== -1) {
				flag = 1;
				var two = findPlayer(i,one);
				var num =random();
				if(num<5){
					settlement(i,one,two)
				}else {
					settlement(i,two,one)
				}
			}
		}
	}while(flag && count <10000);
}

function main(){
	init(10000);
	loop();
	var num =0;
	for(var i=0; i<12; i++){
		console.log('	' + i +'胜的有 ' + loser[i] + ' 人，概率为' + loser[i]/10000*100 +'%.' );
		num+=loser[i];
	}
	console.log('	12胜的有 ' + player[12].length + ' 人，概率为' + player[12].length/10000*100 +'%.' );
	console.log('	还有 ' + (10000- num - player[12].length) + ' 人仍在竞技场.');
}


main()