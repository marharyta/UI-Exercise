function* trajectory(accStart, maxV, dist,){
		//dist 30 000
		//maxV - max speed (100 m/s)
		//yCoord - coordinates in svg
		//vStart - speed at the start
		//accStart - accelaration at the strat
		
		let state = {
			yCoord: 0,
			timestamp: 0,
			accelaration: accStart,
			velocity: 0
		};

		yield state;

		while(state.yCoord < dist){
			const newState = recalculateState(state, deltaTime);
			state = newState;
			yield newState;

		}

		function recalculateState({ yCoord, velocity, accelaration, timestamp }, deltaTime) {
			//vNext = vta*dt



			return {
				yCoord: ...
				...
			};
		}

}