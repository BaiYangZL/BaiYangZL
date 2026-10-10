const bgMusic = document.getElementById("bgMusic");
const musicToggle = document.getElementById("musicToggle");


if(bgMusic){

    bgMusic.volume = 0.1;


    let musicEnabled = 
        localStorage.getItem("music-global") !== "off";


    function updateMusicButton(){

        if(!musicToggle) return;

        musicToggle.textContent =
            musicEnabled
            ? "🎵 音乐：开"
            : "🔇 音乐：关";

    }



    function playMusic(){

        if(!musicEnabled) return;


        bgMusic.play()
        .catch(()=>{});

    }



    // 页面打开尝试播放
    updateMusicButton();
    playMusic();



    // 音乐按钮
    if(musicToggle){

        musicToggle.addEventListener(
            "click",
            function(e){

                e.stopPropagation();


                if(musicEnabled){

                    musicEnabled=false;
                    bgMusic.pause();

                }else{

                    musicEnabled=true;
                    playMusic();

                }


                localStorage.setItem(
                    "music-global",
                    musicEnabled ? "on":"off"
                );


                updateMusicButton();

            }
        );

    }



    // 手机解锁播放
    function unlockMusic(){

        if(musicEnabled && bgMusic.paused){

            bgMusic.play()
            .catch(()=>{});

        }

    }


    document.addEventListener(
        "click",
        unlockMusic
    );


    document.addEventListener(
        "touchstart",
        unlockMusic
    );


    document.addEventListener(
        "touchmove",
        unlockMusic
    );


    document.addEventListener(
        "scroll",
        unlockMusic
    );

}
