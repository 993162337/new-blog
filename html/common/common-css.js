import React, {StyleSheet, Dimensions, PixelRatio} from "react-native";
const {width, height, scale} = Dimensions.get("window"),
    vw = width / 100,
    vh = height / 100,
    vmin = Math.min(vw, vh),
    vmax = Math.max(vw, vh);

export default StyleSheet.create({
    "preview-contents": {
        "width": "60%",
        "marginTop": 5 * vh,
        "marginRight": "auto",
        "marginBottom": 5 * vh,
        "marginLeft": "auto",
        "borderRadius": 5,
        "boxShadow": "0 0 10px rgba(0, 0, 0, .25)",
        "border": "1px solid #CCC",
        "paddingTop": 20,
        "paddingRight": 40,
        "paddingBottom": 20,
        "paddingLeft": 40,
        "position": "relative",
        "boxSizing": "border-box",
        "zIndex": 1,
        "background": "#FFF"
    },
    "common-bg": {
        "width": 100 * vw,
        "height": 70 * vh,
        "background": "url(\"./../../assets/images/bg.jpg\") left top",
        "position": "fixed",
        "top": 15 * vh,
        "zIndex": 0,
        "backgroundSize": "70%"
    },
    "common-back": {
        "position": "fixed",
        "width": 60,
        "height": 60,
        "background": "#A6DE2B",
        "display": "flex",
        "MsAlignItems": "center",
        "alignItems": "center",
        "justifyContent": "center",
        "color": "white",
        "borderRadius": "100%",
        "left": 18 * vw,
        "top": 2 * vh,
        "cursor": "pointer"
    },
    "static": {
        "animation": "static 1s"
    },
    "float": {
        "animation": "float 1s",
        "animationFillMode": "forwards"
    }
});