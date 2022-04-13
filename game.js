window.document.body.onload = function () {

    var ww = 0;
    var wh = 0;
    var score = 0;
    var gamingTimeSeconds = 60;
    var gameTime = 0;
    var gameElements = [];

    function generate() {
        let randomNumber = 5;

        for (let index = 0; index < randomNumber; index++) {
            gameElements.push(
                {
                    id: (Math.random() * (10000 - 1) + 1).toFixed(),
                    score: (Math.random() * (30 - 1) + 1).toFixed(),
                    color: '#' + Math.floor(Math.random() * 16777215).toString(16),
                }
            )
        }
    };

    generate();

    function createElements() {
        gameElements.forEach(element => {
            setTimeout(() => {
                new Element(element);
            }, element.score * 100);
        });
    }

    createElements();

    (function a() {
        let a = 0;
        let val = gamingTimeSeconds;
        const int = setInterval(() => {
            a = ++a;
            gameTime = a;
            document.getElementById('timer').innerHTML = --val + '' + 'seconds'

            if (a === gamingTimeSeconds) {
                document.querySelectorAll(".element").forEach(el => el.remove());
                clearInterval(int);
                return;
            }
            if (!gameElements.length && !a !== gamingTimeSeconds) {
                generate();
                createElements();
            }

        }, 1000);

    })();

    // var interval = () =>  setInterval(() => {
    //     let a = 0
    //     console.log(a)
    //     if (!gameElements.length) {
    //         a += a;
    //         createElement();
    //     }
    // }, gamingTimeSeconds * 1000);



    (function createInitialContainer() {
        var main = document.createElement('div');
        document.getElementById('score').innerHTML = score;
        document.getElementById('timer').innerHTML = gamingTimeSeconds + '' + 'seconds';

        main.style.cssText = 'position:absolute;width:100%;height: calc(100% - 60px);z-index:100;background:#000;display:flex; justify-content:center; align-items:center; background-repeat: no-repeat;background-size: cover;';
        let body = document.getElementsByTagName("BODY")[0];
        body.appendChild(main);
        main.style.backgroundImage = "url('./ruletka-kazino-fishki-igra.jpg')";

        var videoWrapper = document.createElement('div');
        videoWrapper.id = 'videoWrapper';
        main.appendChild(videoWrapper);

        videoWrapper.style.cssText = 'position:relative;width:50%;z-index:200;background:white;';
        var videoElement = document.createElement('video');
        videoWrapper.appendChild(videoElement);
        videoElement.id = 'videoElement'
        videoElement.style.cssText = 'width:100%;z-index:200;background:white;';
        videoElement.src = 'video.mp4'
        videoElement.autoplay = true;
        videoElement.muted = true;
        videoElement.loop = true;
        ww = videoElement.clientWidth;
        wh = videoElement.clientHeight;
        // document.body.appendChild(videoElement);
    }());

    class Element {
        interval;
        constructor({ id, score, color }) {
            let position = getRandomPosition();

            this.id = id;
            this.score = score;
            this.color = color;
            this.div = null;
            this.div = document.createElement('div');
            this.div.classList.add('element');
            this.div.id = this.id;
            this.div.style.background = color;
            this.div.style.color = 'white';
            this.div.style.margin = 'auto'
            this.div.innerHTML += score;
            this.div.style.zIndex = 300;
            this.div.style.position = 'absolute';
            this.div.style.borderRadius = '50%';
            this.div.style.width = 45 + 'px';
            this.div.style.height = 45 + 'px';
            // apply styles
            this.div.style.top = position.y + 'px';
            this.div.style.left = position.x + 'px';

            document.getElementById('videoWrapper').appendChild(this.div);

            this.div.addEventListener("click", event => {
                // score += this.score;
                document.getElementById('score').innerHTML = Number(document.getElementById('score').innerHTML) + Number(this.score);
                const processedEl = document.getElementById(this.id);
                if (processedEl) {
                    document.getElementById(this.id).remove();
                }
            });
            this.calculateRandomPosition(this);
            // this.calculateRandomPosition.call(this);
            this.selfDestroyByTimer(this);

        }

        calculateRandomPosition(element) {
            element.interval = setInterval(function () {
                if (gameTime === gamingTimeSeconds) {
                    clearInterval(element.interval);
                }
                console.log(element.id)
                let position = getRandomPosition();
                // console.log(position,self.id)
                element.div.style.top = position.y + 'px';
                element.div.style.left = position.x + 'px';
            }, 800)
        }

        selfDestroyByTimer(element) {
            let timeout = setTimeout(() => {
                element.div.remove();
                console.log('TIMEOUT')
                if (gameTime === gamingTimeSeconds) {
                    clearTimeout(timeout);
                    return;
                }
                new Element(
                    gameElements[Math.floor(Math.random() * (gameElements.length - 1))]);
            }, 2000);
            // clearInterval(element.interval);
            // clearInterval(i);

            // let i = setInterval(function () {
            //     if (seconds >= 2) {
            //         element.div.remove();
            //         clearInterval(element.interval);
            //         clearInterval(i);
            //                 new Element(
            //                     gameElements[Math.floor(Math.random() * (gameElements.length - 1))]);
            //         // const index = gameElements.findIndex(function (value) { return value.id === element.id });
            //         // if (document.getElementById(element.id)) {
            //         //     document.getElementById(element.id).remove();
            //         // }
            //         // gameElements.splice(index, 1);
            //     }
            //     seconds++;
            // }, 2000);
        }

    }



    function getRandomPosition() {
        let w = rand(getConstraint());
        let h = rand(getConstraint());
        let x = rand((ww - w));
        let y = rand((wh - h));
        // console.log(x,y)
        return { x, y }
    }



    function getConstraint() {
        let constraint = Math.min(ww, wh);
        // console.log(constraint)
        return constraint;
    }

    const rand = (multi) => {
        return parseInt(multi * Math.random(), 10);
    }

    function recalculate() {
        list = document.getElementsByClassName('element');

        for (let item of list) {

            let position = getRandomPosition();

            item.style.top = position.y + 'px';
            item.style.left = position.x + 'px';

        }


        // elements.forEach(element => {

        // });
    }

    // window.setInterval(recalculate, 500);


    // setTimeout(() => {
    //     window.clearInterval(interval);

    // }, 2000);



}