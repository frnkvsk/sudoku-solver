function sudokuSolver(puzzle) {
	
	const checkGrid = (x, y, val, arr) => {
		let xx,yy, visited = {};
		visited[val] = 1;
		if(x < 3) xx = 0;			
		else if (x < 6) xx = 3;
		else xx = 6;
		if(y < 3) yy = 0;			
		else if (y < 6) yy = 3;
		else yy = 6;
		for(let i = xx; i < xx+3; i++) {
			for(let j = yy; j < yy+3; j++) {
				if(arr[i][j] && !visited[arr[i][j]]) visited[arr[i][j]] = 1;
				else if(arr[i][j] > 0) return false;
			}
		}
		return true;
	}
	const checkRows = (x, y, val, arr) => {
		let visited = {};
		visited[val] = 1;
		for(let i = 0; i < 9; i++) {
			if(arr[x][i] && !visited[arr[x][i]]) visited[arr[x][i]] = 1;
			else if(arr[x][i] > 0) return false;
		}
		return true;
	}
	const checkCols = (x, y, val, arr) => {
		let visited = {};
		visited[val] = 1;
		for(let i = 0; i < 9; i++) {
			if(arr[i][y] && !visited[arr[i][y]]) visited[arr[i][y]] = 1;
			else if(arr[i][y] > 0) return false;
		}
		return true;
	}
	const possibleMoves = () => {
		let res = [];
		for(let i = 0; i < 9; i++) {
			for(let j = 0; j < 9; j++) {
				let moves = [i, j, []];
				for(let k = 1; k < 10; k++) {
					if(puzzle[i][j] == 0 && checkGrid(i, j, k, puzzle) && 
						checkRows(i, j, k, puzzle) && checkCols(i, j, k, puzzle)) {
							moves[2].push(k);
					}
				}
				if(moves[2].length) res.push(moves);
			}
		}
		res = res.sort((a,b) => b[2].length - a[2].length);
		return res;
	}
	let pm = possibleMoves();
	if(pm.length) {
		let [i,j,arr] = pm.pop()
		for(let move of arr) {
			let newPuzzle = Array(puzzle.length).fill(0).map((_,ix) => [...puzzle[ix]]);
			newPuzzle[i][j] = move;
			if(pm.length) return sudoku(newPuzzle);
			else return newPuzzle
		}		
	}	
}