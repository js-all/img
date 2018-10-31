const imgpath = document.getElementById('imgpath');
const canvas = document.getElementsByTagName('canvas')[0];
const ctx = canvas.getContext('2d');
const sub = document.getElementById('sub');

sub.addEventListener('click',() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let img = new Image();
    img.src = imgpath.value;
    img.crossOrigin = "Anonymous";
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height / 2);
    ctx.drawImage(img, 0, canvas.height /2, canvas.width, canvas.height /2);
    ctx.fillStyle = 'red';
    //ctx.fillRect(0, 0, canvas.width, canvas.height);
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height / 2);
    let p = 1;
    let data = [];
    let temp = [];
    for (let i of imgData.data) {
        if (p <= 3) {
            temp.push(i);
            p++;
        } else {
            data.push(new rgb(temp[0], temp[1], temp[2]));
            temp = [];
            p = 1;
        }
    }
    let data2 = data.slice();
    let before;
    let after;
    for (let i = 1;i < data.length;i++) {
        before = data[i-1];
        after = data[i+1] == undefined ? data[i] : data[i+1];
        const e = data[i];
        e.sum = e.red + e.blue + e.green;
        before.sum = before.red + before.blue + before.red;
        after.sum = after.red + after.green + after.blue;
        let diff = 42;
        if (e.sum - before.sum > diff || before.sum - e.sum > diff ||
            e.sum - after.sum >  diff || after.sum  - e.sum > diff) {
            data2[i] = new rgb.black();
        } else {
            data2[i] = new rgb.white();
        }
        /*let sum = (e.sum) / 3;
        data[i] = new rgb(sum, sum, sum);*/
    }
    let j = 0;
    let col = 0;
    for (let i = 0;i < data2.length;i++) {
        const e = data2[i];
        j++;
        if (j >= canvas.width) {
            j = 0;
            col++;
        }
        ctx.fillStyle = e.get(false);
        ctx.fillRect(j, col, 1, 1);
    }
});