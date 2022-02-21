let height = document.querySelector('.height');
let weight = document.querySelector('.weight');
let result = document.querySelector('.result');
let BMI_list = document.querySelector('.BMI_list');
let lastResult = document.querySelector('.lastResult');
let resultCircle = document.querySelector('.resultCircle');
let result_text = document.querySelector('.result_text');
let reset = document.querySelector('.reset');
let data = JSON.parse(localStorage.getItem('bmiList')) || [];

result.addEventListener('click',checkNum,false);
BMI_list.addEventListener('click',toggleDone,false);
lastResult.addEventListener('click',refresh,false);
updateList(data);

//判斷有無輸入身高體重
function checkNum(){
    if(height.value == '' && weight.value == ''){
        alert('請輸入身高和體重!');
    }else if(height.value != '' && weight.value == ''){
        alert('請輸入體重!');
    }else if(height.value == '' && weight.value != ''){
        alert('請輸入身高!');
    }else if(height.value != '' && weight.value != ''){
        calculate();
    }
}

//按下按鈕計算BMI
function calculate(){
    let BMI = (weight.value/Math.pow(height.value/100, 2)).toFixed(2);
    let date = new Date().toLocaleDateString();
    let [state, color] = checkBMI(BMI);
    let list = {
        height : height.value,
        weight: weight.value,
        BMI: BMI,
        state: state,
        color: color,
        date: date
    }
    data.push(list);
    localStorage.setItem('bmiList',JSON.stringify(data));
    circle(data);
    updateList(data);
}
function updateList(items){
    let str = '';
    let len = items.length;
    for(let i=0; i<len; i++){
        str += '<li style="border-color: ' + items[i].color + ';"><h3>' + items[i].state + '</h3><div><small>BMI</small><span>' + items[i].BMI + '</span></div><div><small>weight</small><span>' + items[i].weight + '</span></div><div><small>height</small><span>' + items[i].height + '</span></div><div><small>' + items[i].date + '</small></div><i class="fa fa-ban" aria-hidden="true" data-index=' + i + '></i></li>';
    }
    BMI_list.innerHTML = str;
}

//BMI狀態
function checkBMI(BMI){
    let state = '';
    let color = '';
    if(BMI < 18.5){
        state = '過輕';
        color = '#31BAF9';
    }else if(BMI >= 18.5 && BMI < 24){
        state = '理想';
        color = '#86D73F';
    }else if(BMI >= 24 && BMI < 27){
        state = '過重';
        color = '#FF982D';
    }else if(BMI >= 27 && BMI < 30){
        state = '輕度肥胖';
        color = '#FF6C02';
    }else if(BMI >= 30 && BMI < 35){
        state = '中度肥胖';
        color = '#FF6C02';
    }else{
        state = '重度肥胖';
        color = '#FF1200';
    }
    return [state, color];
}

//刪除列表
function toggleDone(e){
    // console.log(e.target.nodeName);
    e.preventDefault();
    if(e.target.nodeName !== 'I' ){return;}
    let index = e.target.dataset.index;
    data.splice(index, 1);
    localStorage.setItem('bmiList',JSON.stringify(data));
    updateList(data);
}

//按下結果顯示圓圈
function circle(){
    let str = '';
    height.readOnly = true;
    weight.readOnly = true;
    result.style.display = "none";
    lastResult.style.display = "flex";
    for(let i=0; i<data.length; i++){
        str = '<div class="resultCircle" style="color: ' + data[i].color + ';"><p>' + data[i].BMI + '<br><small>BMI</small></p><img src="/img/icons_loop.png" class="reset" style="background-color: ' + data[i].color + ';" alt=""></div><div class="result_text"><p style="color:  ' + data[i].color + ';">' + data[i].state + '</p></div>';
    }
    lastResult.innerHTML = str;
}

//重置結果
function refresh(e){
    e.preventDefault();
    if(e.target.nodeName !== 'IMG'){return;}
    height.readOnly = false;
    weight.readOnly = false;
    height.value='';
    weight.value='';
    result.style.display = 'block';
    lastResult.style.display = "none";
}