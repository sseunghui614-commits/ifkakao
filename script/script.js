//전역변수선언
//요소 가져오기
//메뉴 버튼 클릭처리
const menuBtn = document.querySelector('.menubtn');
const popupMenu = document.querySelector('.popup');
const closeBtn = document.querySelector('.menu-close');
menuBtn.addEventListener('click',()=>{
    popupMenu.style.display = 'block';
});
closeBtn.addEventListener('click',()=>{
    popupMenu.style.display = 'none';
});

//slide 처리
//각각의 section마다 있는 slide-wrap
const slideViews = document.querySelectorAll('.slide-wrap');
//각각의 view마다 추가된 slide처리
const slideInit = (view)=>{
    /*slide-list의 width 설정
        indicator 개수 설정
        -->slide-list > li 개수로 결정
    */
    const slideList = view.querySelector('.slide-list');
    const slideImg = view.querySelectorAll('.slide-list>li');
    console.log(slideImg);
    const indicator = view.querySelector('.indicator');
    const imgSize = slideImg.length;
    slideList.style.width = `${100*imgSize}%`;
    for ( let i=0; i<imgSize; i++){
        const elem = document.createElement('li');
        elem.dataset.index = i;
        if( i === 0 ){
            elem.className = 'active';
        }
        indicator.append(elem);
    }
    
//1.앞/뒤에 복제 슬라이드 추가
const totalSize = imgSize+2;
const firstClone = slideImg[0].cloneNode(true);
const lastClone = slideImg[imgSize-1].cloneNode(true);
slideList.append(firstClone);
slideList.prepend(lastClone);
//2.전체 width 설정
slideList.style.width = `${100*totalSize}%`;

//3.시작 위치 결정
let current = 1;
let widthGap = 100 / totalSize;
slideList.style.transform = `translateX(-${current*widthGap}%)`;


//
const updateIndicator = ()=>{
    const active = indicator.querySelector('li.active');
    active.classList.remove('active');
    indicator.children[current-1].classList.add('active');
}
//해당 위치로 이동하는 공통 함수
const currentGoto = (time)=>{
    slideList.style.transition = time;
    slideList.style.transform = `translateX(-${current*widthGap}%)`;
};

//prev 버튼을 클릭했을 때
const prevBtn = view.querySelector('.prev');
prevBtn && prevBtn.addEventListener('click',()=>{
    disableButtons();
    current--;
    currentGoto('0.5s');
});
//next 버튼을 클릭했을 떄
const nextbtn=view.querySelector('.next');
nextbtn && nextbtn.addEventListener('click',()=>{
    disableButtons();
    current++;
    currentGoto('0.5s');
});

//버튼 비활성화 함수
const disableButtons = ()=>{
    if( prevBtn ){prevBtn.style.pointerEvents='none';}
    if( nextbtn ){nextbtn.style.pointerEvents='none';}
};
//버튼 활성화 함수
const enableButtons = ()=>{
    if( prevBtn ){prevBtn.style.pointerEvents='auto';}
    if( nextbtn ){nextbtn.style.pointerEvents='auto';}
};
//4.transition이 끝난 후 '점프'처리(무한반복처리)
slideList.addEventListener('transitionend',()=>{
    //맨끝(첫번째 슬라이드복제)에 도착하면 원래 첫 슬라이드로 점프
    if( current === totalSize-1){
        current=1;
        currentGoto('none');
    }
    // 맨앞 (마지막 슬라이드복제)에 도착하면 원래 마지막 슬라이드로 점프
    if( current === 0){
        current=totalSize-2;
        currentGoto('none');
    }
    //인디케이터 수정
    updateIndicator();
    enableButtons();
});

//각각의 인디케이터 dot가 클릭이 되면
    indicator.addEventListener('click',(e)=>{
        //클릭한 dot가 몇번째를 클릭
        const liElem = e.target;
        if( liElem.tagName === 'LI' ){
            const idx = Number(liElem.dataset.index);
            current = idx+1;
            currentGoto('0.5s');
            //원래 있던 active는 삭제, 현재 클릭한 dot한테 active를 추가
            updateIndicator();
        }
    });
}


// slideInit();
slideViews.forEach((view)=>{slideInit(view)});

//자주 묻는 질문 탭처리
//ul.top에서 클릭되면 li-menu 값을 읽어서 active
//menu에 설정된 index번호에 맞는 ul에 active
const tabMenus = document.querySelectorAll('#section-5 .top li');
const tabItems = document.querySelectorAll('#section-5 .item');
tabMenus.forEach((menu,idx)=>{
    menu.addEventListener('click',()=>{
        //1. 모든 메뉴에서 active 제거
        tabMenus.forEach((list)=>{list.classList.remove('active')});
        //2.클릭한 메뉴에게 active 추가
        menu.classList.add('active');
        //3.tabitems에서도 기존의 active 제거
        tabItems.forEach((item)=>{item.classList.remove('active')});
        //4.tabitems 이중에서 클릭한 인덱스 위치에 active
        tabItems[idx].classList.add('active');
    });
});

//tabitems에 있는 각각의 li가 클릭이 되면, 해당 q아래에 있는 a가 보여져야함.
tabItems.forEach((ulElem)=>{
    const liElems = ulElem.querySelectorAll('li');
    liElems.forEach((list)=>{
        list.addEventListener('click',()=>{
            list.classList.toggle('show');
        });
    });
});