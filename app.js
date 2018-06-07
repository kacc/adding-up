'use strict';
const fs = require('fs');
const readline = require('readline');
const rs = fs.ReadStream('./popu-pref.csv');
const rl = readline.createInterface({ 'input': rs, 'output': {} });
/* ver0001
rl.on('line', (lineString) => {
// ver0000    console.log(lineString);
	const columns = lineString.split(',');
	const year = parseInt(columns[0]);
	const prefecture = columns[2];
	const popu = parseInt(columns[7]);
	if (year === 2010 || year === 2015) {
		console.log(year);
		console.log(prefecture);
		console.log(popu);
	}

});
rl.resume();
end of ver0001 */

/* ver0002 */
const map = new Map(); // key: 都道府県 value: 集計データのオブジェクト
rl.on('line', (lineString) => {
    const columns = lineString.split(',');
    const year = parseInt(columns[0]);
    const prefecture = columns[2];
    const popu = parseInt(columns[7]);
    if (year === 2010 || year === 2015) {
        let value = map.get(prefecture);
        if (!value) {
            value = {
                popu10: 0,
                popu15: 0,
                change: null
            };
        }
        if (year === 2010) {
            value.popu10 += popu;
        }
        if (year === 2015) {
            value.popu15 += popu;
        }
        map.set(prefecture, value);
    }
});
rl.resume();
/* end of ver0002 */
/* ver00021
rl.on('close', () => {
    console.log(map);
});
 end of ver00021 */
/* ver00022 */
rl.on('close', () => {
    for (let pair of map) {
        const value = pair[1];
        value.change = value.popu15 / value.popu10;
    }
	console.log(map);
    const rankingArray = Array.from(map).sort((pair1, pair2) => {
        return pair1[1].change - pair2[1].change;
    });
//    console.log(rankingArray);
	const rankingStrings = rankingArray.map((pair , i) => {
// ver00022base		return pair[0] + ': ' + pair[1].popu10 + '=>' + pair[1].popu15 + ' 変化率:' + pair[1].change;
		return  (i + 1) + '位 ' + pair[0] + ': ' + pair[1].popu10 + '=>' + pair[1].popu15 + ' 変化率:' + pair[1].change;  // ver00022homework
	});
	console.log(rankingStrings);
});
/* end of ver00022 */
