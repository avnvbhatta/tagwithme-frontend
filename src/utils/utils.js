import * as Vibrant from 'node-vibrant'

//function to get geo location of user
export function getCurrentPosition() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
}

export function getVibrantColors(imgPath){
        return Vibrant.from(imgPath).getPalette() 
        .then((palette) => {
            let result = {
                vibrant: palette.Vibrant.hex,
                darkVibrant: palette.DarkVibrant.hex,
                lightVibrant: palette.LightVibrant.hex,
                muted: palette.Muted.hex,
                darkMuted: palette.DarkMuted.hex,
                lightMuted: palette.LightMuted.hex,
            }
            return result;
        })
        .catch(err => console.error('An error occured: ', err))
}