# Kakaotalk Viewer

## Installation
````bash
git clone https://github.com/olivyou2/KakaotalkViewer.git
````

## Start
````bash
npm start
````

## Info
Kakaotalk Viewer 는, 카카오톡 대화내용 내보내기로 만들어진 txt 를 파싱해서 카카오톡 UI 와 유사하게 브라우저 상에서 대화를 구현할 수 있습니다. 

## How to use
#### 1)
````bash
npm start
````
를 이용해 React 를 실행시켜줍니다
#### 2)
localhost 에 접속합니다
#### 3)
키패드 '8' 을 눌러 txt 내용을 날짜에서부터 복사합니다
#### 3-1)
여기서 txt 내용은 다음과 같은 포맷이여야 합니다
````
--------------- YYYY년 MM월 DD일 n요일 ---------------
[이름][오전/후 HH:MM] Chat
````
#### 3-2)
이런 포맷이 아니라, 예전에 추출한 텍스트인 경우 '9' 를 눌러 txt 내용을 복사합니다. 여기서 txt 내용은 다음과 같은 포맷이여야 합니다.
````
YYYY년 MM월 DD일 오전/후 H:MM, 이름 : Chat
````
날짜 변경은, 채팅 텍스트의 날짜가 변함에 따라서 구분됩니다

##### Ex)
````
2021년 5월 19일 오후 10:07, 하재란 : 화이팅!!!
<!-- 여기에서 날짜 변경이 기록됩니다 -->
2021년 5월 20일 오전 1:26, 박원호 : ㅎㅎ
````
