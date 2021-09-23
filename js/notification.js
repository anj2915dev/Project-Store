const notification = document.querySelector(".notification")



let x;
export function showAndCloseNotfiction(x){
    clearTimeout(x);
    notification.style.opacity=1;
    notification.style.transform="translatey(0px)";
    x=setTimeout(() => {
    notification.style.transform="translatey(-400px)";
    notification.style.opacity=1;

        
    }, 4000);
}